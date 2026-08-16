
const $ThirstModCapabilities = Java.loadClass('cn.mlus.thirst.foundation.common.capability.ModCapabilities');
const $DarkArrow = Java.loadClass('com.github.alexmodguy.alexscaves.server.entity.item.DarkArrowEntity');

const $BlitzProjectile = Java.loadClass('cofh.thermal.core.common.entity.projectile.BlitzProjectile');
const $BiColorParticleOptions = Java.loadClass("cofh.core.client.particle.options.BiColorParticleOptions");
const $CoreParticles = Java.loadClass("cofh.core.init.CoreParticles");

const $BlockPos = Java.loadClass('net.minecraft.core.BlockPos');
const $Vec3 = Java.loadClass('net.minecraft.world.phys.Vec3');

const $ChatFormatting = Java.loadClass('net.minecraft.ChatFormatting');
const $TextColor = Java.loadClass('net.minecraft.network.chat.TextColor');
const $ColorUtil = Java.loadClass('com.Polarice3.Goety.utils.ColorUtil');
const $ShockwaveParticleOption = Java.loadClass('com.Polarice3.Goety.client.particles.ShockwaveParticleOption');
const $MagicMissile = Java.loadClass('vazkii.botania.common.entity.MagicMissileEntity');

function applyCD(player, ability, baseCD) {
	const cdReduction = getPlayerAbilityCD(player);
	const finalCD = baseCD > 1 ? Math.max(1, baseCD * (1 - cdReduction)) : 1;
	ability.on_cooldown = finalCD * 20;
}

function calculateDamage(coef, baseDamage) {
    baseDamage = baseDamage || 3;
    let multiplier = coef * Math.pow(1.215, coef);
    return baseDamage + Math.pow(multiplier, 0.275);
}

const buffableDamageSources = ['player', 'arrow', 'trident', 'cataclysm.shredder'];

const brawlerAbilityHandlers = {
	
	onHurt: {
		dark_hail: {
			cd: 40, sound: 'alexscaves:dreadbow_rain', reset_sound: true,
			fn: (ctx) => {
				const { entity, source, sourceType, ability, config } = ctx;
				let level = source.level;
				if (sourceType !== 'arrow') return;
				let dmg = calculateDamage(getPlayerCoef(source), 3)
				let maxArrows = 10 * Math.min(ability.level, 8);
				let precise = false;
				let perfectShot = false;
				if (source.getAttributes().getInstance("minecraft:generic.armor").getValue() == 0 && source.getAttributes().getInstance("minecraft:generic.armor_toughness").getValue() == 0) {
					precise = true;
				}
				if (source.health >= source.maxHealth) {
					perfectShot = true;
				}
				let hitPos = entity.position();
				let mutableSkyBlockPos = new BlockPos.MutableBlockPos(
					hitPos.x(),
					hitPos.y() + 2.5,
					hitPos.z()
				);
				
				let maxFallHeight = 15;
				let k = 0;
				while (
					mutableSkyBlockPos.getY() < level.getMaxBuildHeight() &&
					level.isEmptyBlock(mutableSkyBlockPos) &&
					k < maxFallHeight
				) {
					mutableSkyBlockPos = mutableSkyBlockPos.above();
					k++;
				}
				playSound(source.level, config.sound, source.username, source.x, source.y, source.z, 12, 1);
				for (let i = 0; i < Math.ceil(maxArrows); i++) {
					let darkArrow = new $DarkArrow(level, source)
					darkArrow.setShadowArrowDamage(dmg);
					darkArrow.setPerfectShot(perfectShot);
					let vec3 = mutableSkyBlockPos.getCenter().add(
						level.random.nextFloat() * 16 - 8,
						level.random.nextFloat() * 4 - 2,
						level.random.nextFloat() * 16 - 8
					);
					let clearTries = 0;
					while (
						clearTries < 6 && !level.isEmptyBlock($BlockPos.containing(vec3)) && level.getFluidState($BlockPos.containing(vec3)).isEmpty()
					) {
						clearTries++;
						vec3 = mutableSkyBlockPos.getCenter().add(level.random.nextFloat() * 16 - 8, level.random.nextFloat() * 4 - 2, level.random.nextFloat() * 16 - 8);
					}
					if(!level.isEmptyBlock($BlockPos.containing(vec3)) && level.getFluidState($BlockPos.containing(vec3)).isEmpty()) {
						vec3 = mutableSkyBlockPos.getCenter();
					}
					darkArrow.setPos(vec3);
					let vec31 = hitPos.subtract(vec3);
					let randomness = precise ? 0 : 5 + level.random.nextFloat() * 10;
					if(!precise && level.random.nextFloat() < 0.25) {
						randomness = level.random.nextFloat();
                    }
					darkArrow.shoot(vec31.x(), vec31.y(), vec31.z(), 0.75 + 1.5 * level.random.nextFloat(), randomness);
					level.addFreshEntity(darkArrow);
				}
				applyCD(source, ability, config.cd);
			}
		},

		brute_force: {
			cd: 5, reset_sound: false,
			fn: (ctx) => {
				const { server, source, sourceType, ability, config } = ctx;
				if (sourceType !== 'player' || !source.isPlayer()) return;
				
				if (Math.random() < (ability.level * 0.005)) {
					playSound(source.level, randomize(['species:entity.bewereager.stun', 'goety:whisperer_attack']), source.username, source.x, source.y, source.z, 0.8, 0.8);
					server.scheduleInTicks(8, () => {
						source.potionEffects.add('alexscaves:stunned', 40, 1, true, false);
					});
					applyCD(source, ability, (config.cd * ability.level));
				}
			}
		},

		magic_missile: {
			cd: 0, sound: 'farlanders:entity.titan.hurt_heart', reset_sound: false,
			fn: (ctx) => {
				const { entity, source, sourceType, ability, config } = ctx;
				if (sourceType !== 'player' || !source.isPlayer() || !entity.isMonster()) return;
				
				let triggerChance = 0.04 * Math.min(ability.level, 25);
				if (Math.random() < triggerChance) {
					let level = source.level;
					let magicMissile = new $MagicMissile(source, false);
					let angle = source.getLookAngle().subtract(0.0, 1.25, 0.0);
					magicMissile.setDeltaMovement(angle);
					magicMissile.setPos(source.x, source.y + 3.25, source.z);
					level.addFreshEntity(magicMissile);
					playSound(source.level, config.sound, source.username, source.x, source.y, source.z, 0.3);
					applyCD(source, ability, config.cd);
				}
			}
		},

		elemental_charges: {
			cd: 0, reset_sound: false,
			fn: (ctx) => {
				const { entity, source, sourceType, ability, config } = ctx;
				if (sourceType !== 'player' || !source.isPlayer()) return;

				let level = source.level;
				let eyePos = entity.getEyePosition(0.5);
				let offset = 3.9;

				let x = eyePos.x();
				let y = eyePos.y();
				let z = eyePos.z();

				level.sendParticles(new $BiColorParticleOptions($CoreParticles.STRAIGHT_ARC.get(), 0.4, 9, 0, -1, 0xFFFC52A4 | 0),
					x, y + offset, z, 0, x, y-offset, z, 1.0);
				
				level.sendParticles($CoreParticles.PLASMA.get(), x, y + offset + 0.2, z, 0, 0, 0, 0, 1.0);
				entity.potionEffects.add('cofh_core:shocked', 10 * 20, 0, true, false);
				
				applyCD(source, ability, config.cd);
			}
		},

		tracker: {
			cd: 15, sound: 'alexscaves:seeking_arrow_hit', reset_sound: true,
			fn: (ctx) => {
				const { entity, source, sourceType, ability, config } = ctx;
				if (sourceType !== 'arrow' || !source.isPlayer()) return;
				if (source.health < source.maxHealth) return;
				
				entity.potionEffects.add('irons_spellbooks:guided', config.cd * 20 * ability.level, 0, true, false);
				playSound(source.level, config.sound, source.username, entity.x, entity.y, entity.z, 12, 0.1);
				applyCD(source, ability, (config.cd * ability.level));
			}
		}
	},

	onDefensive: {
		warding_impulse: {
			cd: 30, sound: 'goety:shield_up', reset_sound: true,
			fn: (ctx) => {
				const {	server, player, source, sourceType, ability, config } = ctx;
				if (Math.random() < 0.33) {
					let shieldAmount = Math.min(ability.level, 5);
					server.scheduleInTicks(3, () => {
						server.runCommandSilent('tffeature shield ' + player.username + ' add ' + shieldAmount + ' true');
					});
					playSound(player.level, config.sound, player.username, player.x, player.y, player.z, 0.3);
					applyCD(source, ability, config.cd);
				}
			}
		},
		
		stunlocked: {
			cd: 15, sound: 'goety:hammer_swing', reset_sound: true,
			fn: (ctx) => {
				const {	server, player, source, sourceType, ability, config } = ctx;
				
				let chat = $ChatFormatting.RED;
				let rgb = $TextColor.fromLegacyFormat(chat).getValue();
				let r = ((rgb >> 16) & 0xFF) / 255.0;
				let g = ((rgb >>  8) & 0xFF) / 255.0;
				let b = ((rgb      ) & 0xFF) / 255.0;
				
				let getTeamMembers = Teams.getTeam(player);
				let stunRadius = 8 + (Math.min(ability.level, 8) * 2);
				
				if (player.health <= player.maxHealth * 0.6) {
					
					let teamMembers = Teams.getTeam(player).getMembers();

					player.level.entities
						.filter(entity =>
							entity &&
							entity !== player &&
							entity.isAlive() &&
							(entity.isPlayer() || entity.isMonster()) &&
							source.distanceToEntitySqr(entity) <= Math.pow(stunRadius / 2, 2) &&
							!teamMembers.some(member => member.equals(entity.uuid))
						)
						.forEach(entity => {
							entity.potionEffects.add('alexscaves:stunned', 10 * 20, 0, true, false);
						});
					
					server.scheduleInTicks(2, () => {
						let stunSpeed = Math.max(1, Math.round(0.75 * (stunRadius / 10)));
						let stunLife = 30;
						
						player.level.sendParticles(new $ShockwaveParticleOption(r, g, b, 2, stunRadius, stunSpeed, stunLife, true),
							player.x, player.y + 1.5, player.z,	0, 0, 0, 0, 0);
						playSound(player.level, config.sound, player.username, player.x, player.y, player.z, 1, 0.9);
					});
					applyCD(source, ability, config.cd);
				}
			}
		}
	},
	
	onCrit: {
		deep_cut: {
			cd: 20, sound: false, reset_sound: true,
			fn: (ctx) => {
				const {	source, target, ability, config } = ctx;
				if (isFakePlayer(source)) return;
				target.potionEffects.add('attributeslib:bleeding', 8 * 20, (ability.level - 1), true, false);
				applyCD(source, ability, (config.cd * ability.level));
			}
		},
		
		exposed: {
			cd: 20, sound: false, reset_sound: true,
			fn: (ctx) => {
				const {	source, target, ability, config } = ctx;
				if (isFakePlayer(source)) return;
				target.potionEffects.add('attributeslib:sundering', 8 * 20, (ability.level - 1), true, false);
				applyCD(source, ability, (config.cd * ability.level));
			}
		}
	},
	
	onRoll: {
		nimble: {
			hasLevels: true, sound: 'tconstruct:charged',
			fn: (ctx) => {
				const { player, ability, config } = ctx;
				playSound(player.level, config.sound, player.username, player.x, player.y, player.z, 0.5, 1.2);
				ability.on_cooldown = 1;
			}
		}
	},
	
	onDamageEvent: {
		
		hellborne: {
			hasLevels: true,
			fn: (ctx) => {
				const { entity, source, initialSource, ability, damage } = ctx;
				if (!buffableDamageSources.includes(initialSource.getType())) return damage;
				
				let multiplier = 1;

				if (entity.isAlive() && entity.isOnFire() && !entity.fireImmune() && entity.getRemainingFireTicks() > 0) {
					multiplier += ability.level * 0.2;
				}

				if (source && source.isOnFire() && source.getRemainingFireTicks() > 0) {
					multiplier += 0.20;
				}

				return damage * multiplier;
			}
		},
		
		afflicted: {
			hasLevels: true,
			fn: (ctx) => {
				const { entity, source, initialSource, ability, damage } = ctx;
				if (!buffableDamageSources.includes(initialSource.getType())) return damage;
				
				if (entity && entity.isAlive()) {
					let totalEffects = Math.min(entity.getActiveEffects().size(), 5);
					return damage * (1 + totalEffects * ability.level * 0.05);
				}

				return damage;
			}
		},
		
		high_ground: {
			hasLevels: true,
			fn: (ctx) => {
				const { entity, source, initialSource, ability, damage } = ctx;
				if (!buffableDamageSources.includes(initialSource.getType())) return damage;
				
				let isPassengerOfRootVehicle = source.getRootVehicle().hasPassenger(source);
				if (!source.onGround() && !isPassengerOfRootVehicle && entity.isAlive()) {
					return damage * (1 + ability.level * 0.2);
				}
				
				return damage;
			}
		},
		
		nimble: {
			hasLevels: true,
			fn: (ctx) => {
				const { entity, source, initialSource, ability, damage } = ctx;
				if (!buffableDamageSources.includes(initialSource.getType())) return damage;
				
				if (ability.on_cooldown == 1 && entity.isAlive()) {
					ability.on_cooldown = 0;
					return damage * (1 + ability.level * 0.25);
				}
				
				return damage;
			}
		},
		
		cavalry: {
			hasLevels: true,
			fn: (ctx) => {
				const { entity, source, initialSource, ability, damage } = ctx;
				if (!buffableDamageSources.includes(initialSource.getType())) return damage;
				
				let isPassengerOfRootVehicle = source.getRootVehicle().hasPassenger(source);
				if (isPassengerOfRootVehicle && entity.isAlive()) {
					return damage * (1 + ability.level * 0.3);
				}
				
				return damage;
			}
		},
		
		catabolic_link: {
			hasLevels: false,
			fn: (ctx) => {
				const { entity, source, initialSource, ability, damage } = ctx;
				if (!buffableDamageSources.includes(initialSource.getType())) return damage;
				
				let absAmount = source.getAbsorptionAmount();
				if (absAmount !== 0) {
					let extraDamage = Math.floor(absAmount / 2) * 0.5;
					return damage + extraDamage;
				}
				
				return damage;
			}
		}
	},
	
	onNearbyTamedDamageEvent: {
		overbite: {
			cd: 15, sound: 'goety:spider_bite', reset_sound: true,
			fn: (ctx) => {
				const { player, source, ability, damage, level, config } = ctx;
				if (player.getAbsorptionAmount() === 0) {
					let MAX_ABSORPTION = 80;
					let absAmount = player.getAbsorptionAmount() + Math.min(Math.ceil(damage * 0.3 * ability.level), MAX_ABSORPTION);
					source.potionEffects.add('minecraft:glowing', 5 * 20, 0, true, false);
					playSound(level, config.sound, player.username, source.x, source.y, source.z, 10, 1);
					playSound(player.level, 'minecraft:item.honey_bottle.drink', player.username, player.x, player.y, player.z, 10, 1);
					player.setAbsorptionAmount(absAmount);
					applyCD(source, ability, config.cd);
				}
				return damage;
			}
		}
	}
};

const explorerAbilityHandlers = {
	
	onKill: {
		quenched: {
			cd: 3, sound: 'minecraft:item.honey_bottle.drink', reset_sound: false,
			fn: (ctx) => {
				const {	source, sourceType, ability, config } = ctx;
				if (isFakePlayer(source)) return;
				
				let multiplier = (source.getFoodData().getFoodLevel() ?? 0) >= 20 ? 2 : 1;
				source.getCapability($ThirstModCapabilities.PLAYER_THIRST).ifPresent(cap => {
					let pThirst = cap.getThirst() ?? 0;
					if (pThirst >= 20) return;
					let thirstNow = Math.min((ability.level * multiplier) + pThirst, 100);
					cap.setThirst(thirstNow);
					playSound(source.level, config.sound, source.username, source.x, source.y, source.z, 0.3, 1.1);
					applyCD(source, ability, config.cd);
				});
			}
		},

		graceful: {
			cd: 30, sound: false, reset_sound: false,
			fn: (ctx) => {
				const {	source, sourceType, ability, config } = ctx;
				if (isFakePlayer(source)) return;
				if (sourceType !== 'player' || !source.isPlayer()) return;
				
				source.potionEffects.add('cold_sweat:grace', ability.level * 30 * 20, 0, true, false);
				applyCD(source, ability, (config.cd * ability.level));
			}
		}
	}
}

// ALL EVENTS

// HURT EVENT
EntityEvents.hurt(event => {
	const { server, entity, level } = event;

	if (level.clientSide) return;

	let damage = event.getDamage();
	let actualSource = event.source?.actual;
	let source = event.source;
	let sourceType = source.getType();

	// OFFENSIVE
	if (
		actualSource &&
		actualSource.level &&
		actualSource.isAlive() &&
		!isFakePlayer(actualSource) &&
		entity.isAlive()
	) {
		
		let playerData = getEntityData(actualSource);
		if (playerData && playerData.contains('puff_abilities')) {
			if (playerData?.puff_abilities) {
				playerData.puff_abilities.forEach(ability => {
					if (!ability || ability.on_cooldown !== 0) return;

					let cfg = brawlerAbilityHandlers.onHurt[ability.ability];
					if (cfg?.fn) {
						cfg.fn({
							server: server,
							entity: entity,
							source: actualSource,
							sourceType: sourceType,
							damage: damage,
							ability: ability,
							config: cfg
						});
					}
				});
			}
		}
	}

	// DEFENSIVE
	if (
		actualSource &&
		actualSource.level &&
		actualSource.isAlive() &&
		entity.isAlive() &&
		entity.getType() === 'minecraft:player' &&
		sourceType === 'mob'
	) {
		
		let entityData = getEntityData(entity);
		if (entityData && entityData.contains('puff_abilities')) {
			if (entityData?.puff_abilities) {
				entityData.puff_abilities.forEach(ability => {
					if (!ability || ability.on_cooldown !== 0) return;

					let cfg = brawlerAbilityHandlers.onDefensive[ability.ability];
					if (cfg?.fn) {
						cfg.fn({
							server: server,
							player: entity,
							source: actualSource,
							sourceType: sourceType,
							damage: damage,
							ability: ability,
							config: cfg
						});
					}
				});
			}
		}
	}
});

EntityEvents.death(event => {
	const { server, entity, source: damageSource } = event;

	if (entity.level.clientSide) return;

	const source = damageSource?.actual;
	if (!source) return;

	const sourceType = damageSource.getType();

	const playerData = getEntityData(source);
	if (!playerData?.puff_abilities) return;

	playerData.puff_abilities.forEach(ability => {
		if (!ability || ability.on_cooldown !== 0) return;

		let cfg = explorerAbilityHandlers.onKill[ability.ability];
		if (cfg?.fn) {
			cfg.fn({
				server: server,
				entity: entity,
				source: source,
				sourceType: sourceType,
				ability: ability,
				config: cfg
			});
		}
	});
});


// CRIT EVENT
global.CritEvent = event => {
	
	if (!event.isVanillaCritical()) return;
	let target = event.getTarget();
	let source = event.getEntity();
	
	if (target.level.clientSide || source.level.clientSide) return;
	
	let playerData = getEntityData(source);
	if (!playerData || !playerData.contains('puff_abilities')) return;
	
	playerData.puff_abilities.forEach(ability => {
		if (!ability || ability.on_cooldown !== 0) return;
		
		let cfg = brawlerAbilityHandlers.onCrit[ability.ability];
		if (cfg?.fn) {
			cfg.fn({
				server: Utils.server,
				target: target,
				source: source,
				ability: ability,
				config: cfg
			});
		}
	});
};

// ROLL EVENT
global.onPlayerStartedRolling = (player, velocity) => {
	
	if (player.level.clientSide) return;
	
	let playerData = getEntityData(player);
	if (!playerData || !playerData.contains('puff_abilities')) return;
	
	playerData.puff_abilities.forEach(ability => {

		let cfg = brawlerAbilityHandlers.onRoll[ability.ability];
		if (cfg?.fn) {
            cfg.fn({
                player: player,
                velocity: velocity,
				ability: ability,
				config: cfg
            });
		}
	});
};

// DAMAGE EVENT
if (!global.DamageHandlers) global.DamageHandlers = [];
if (!global.DamageHandlers.some(fn => fn.tag === "puff_abilities")) {
    let handler = (event, amount) => {
        const { source, entity } = event;
		
        let actualSource = source?.actual;
		let sourceLevel = actualSource?.level ?? null;
		
		if (!sourceLevel) return;
		if (sourceLevel.clientSide) return;

        // BASE DAMAGE EVENT
		if (entity.isAlive() && actualSource && !isFakePlayer(actualSource) && sourceLevel) {
			
			let playerData = getEntityData(actualSource);
			if (playerData && playerData.contains('puff_abilities')) {
				playerData.puff_abilities.forEach(ability => {
					if (!ability) return;
					let cfg = brawlerAbilityHandlers.onDamageEvent[ability.ability];
					if (cfg?.fn) {
						let result = cfg.fn({
							source: actualSource,
							initialSource: source,
							entity: entity,
							damage: amount,
							ability: ability,
							config: cfg
						});
						if (typeof result === 'number') amount = result;
					}
				});
			}
		}

        // NEARBY TAMED DAMAGE EVENT
        if (entity.isAlive() && actualSource && !actualSource.isPlayer() && isTamed(actualSource) && sourceLevel) {

            let nearbyPlayers = sourceLevel.players.filter(player => 
				isTamedBy(actualSource, player).tamed &&
                player.distanceToEntitySqr(actualSource) <= Math.pow(12, 2) &&
                player.getPersistentData().contains('puff_abilities')
			);
			
			if (nearbyPlayers.length === 0) return amount;
			
            nearbyPlayers.forEach(nearbyPlayer => {
				
				let nearbyPlayerData = getEntityData(nearbyPlayer);
				
                nearbyPlayerData.puff_abilities.forEach(ability => {
                    if (!ability || ability.on_cooldown !== 0) return;
                    let cfg = brawlerAbilityHandlers.onNearbyTamedDamageEvent[ability.ability];
                    if (cfg?.fn) {
                        let result = cfg.fn({
                            server: Utils.server,
                            player: nearbyPlayer,
                            source: actualSource,
                            damage: amount,
                            level: sourceLevel,
                            ability: ability,
                            config: cfg
                        });
                        if (typeof result === 'number') amount = result;
                    }
                });
            });
        }

        return amount;
    };

    handler.tag = "puff_abilities";
    global.DamageHandlers.push(handler);
}

// TICK DECREMENTER FOR CD
const COOLDOWN_BLACKLIST = ["nimble"];
const ABILITY_LOOKUP = {};

for (const handlers of [
	brawlerAbilityHandlers,
	explorerAbilityHandlers
]) {
	for (const category in handlers) {
		for (const name in handlers[category]) {
			ABILITY_LOOKUP[name] = handlers[category][name];
		}
	}
}

PlayerEvents.tick(event => {
	const { player, server } = event;
	if (player.level.clientSide) return;
	if (server.tickCount % 20 !== 0) return;
	
	let playerData = getEntityData(player);
	
	if (!playerData || !playerData.contains('puff_abilities')) return;
	
	playerData.puff_abilities.forEach(a => {
		if (!a || !a.on_cooldown || COOLDOWN_BLACKLIST.includes(a.ability)) return;
		
		a.on_cooldown = Math.max(0, a.on_cooldown - 20);
		
		if (a.on_cooldown <= 0) {
			let cfg = ABILITY_LOOKUP[a.ability];
			if (cfg?.reset_sound) {
				playSound(Utils.server, 'create:confirm_2', player.username, player.x, player.y, player.z, 0.3, 0.1);
			}
		}
	});
});