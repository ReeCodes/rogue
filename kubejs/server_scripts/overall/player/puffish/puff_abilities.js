const $ThirstModCapabilities = Java.loadClass('dev.ghen.thirst.foundation.common.capability.ModCapabilities');

//RESET CD ON LOG-IN
PlayerEvents.loggedIn(event => {
	let player = event.player;
	if (player.persistentData?.puff_abilities) {
		player.persistentData.puff_abilities.forEach(ability => {
			if (ability && ability.on_cooldown != 0) ability.on_cooldown = 0;
		});
	}
});

function setAbility(abilityName, sound, cd, reset_sound) {
	reset_sound = reset_sound ?? true;
	
	//COOLDOWN RESET
	PlayerEvents.tick(event => {
		let player = event.player;
		if (player.persistentData?.puff_abilities) {
			player.persistentData.puff_abilities.forEach(a => {
				if (a.on_cooldown != 0 && a.ability == abilityName) {
					if (player.age % 20 == 0) {
						a.on_cooldown -= 1;
						if (a.on_cooldown == 0) {
							if (reset_sound) Utils.server.runCommandSilent(`playsound minecraft:entity.experience_orb.pickup master ${player.username} ${player.x} ${player.y} ${player.z} 0.3 0.1`);
						}
					}
					
				}
			})
		}
	});

    // HURT EVENT
    EntityEvents.hurt(event => {
        const { server, entity } = event;
        let source = event.source.actual;
        let sourceType = event.source.getType();
		if (entity.level.clientSide) return;

        if (source && source.persistentData?.puff_abilities) {
            let offensive_ability = source.persistentData.puff_abilities.find(a => a.ability == abilityName);
            if (offensive_ability && offensive_ability.on_cooldown == 0) {
				
                if (abilityName == 'rejuvenating_strike') {
                    let otherPlayers = server.players;
                    if (sourceType == 'player' && source.isPlayer()) {
                        otherPlayers.forEach(otherPlayer => {
                            if (source.distanceToEntitySqr(otherPlayer) <= Math.pow(15, 2)) {
                                otherPlayer.potionEffects.add('minecraft:regeneration', 200, 1, true, false);
								server.runCommandSilent(`playsound ${sound} master ${source.username} ${entity.x} ${entity.y} ${entity.z} 0.3`);
                                offensive_ability.on_cooldown = cd;
                            }
                        });
                    }
                }

                if (abilityName == 'volley_of_arrows' && sourceType == 'arrow') {
                    let pUUID = source.nbt.UUID;
                    let arrowVolley = entity.level.createEntity("irons_spellbooks:arrow_volley");
                    arrowVolley.mergeNbt(`{NoGravity: 1b}`);
					arrowVolley.mergeNbt(`{Owner:${pUUID}}`);
					arrowVolley.mergeNbt(`{LeftOwner: 1b}`);
					arrowVolley.mergeNbt(`{rows: 6}`);
					arrowVolley.mergeNbt(`{Rotation: [${source.yaw}f, 90.0f]}`);
					arrowVolley.mergeNbt(`{arrowsPerRow: 8}`);
					arrowVolley.mergeNbt(`{FireType: "minecraft:"}`);
					arrowVolley.mergeNbt(`{Fire: -1s}`);
					arrowVolley.mergeNbt(`{Damage: ${6.25 + (Math.pow(source.persistentData?.coef, (JavaMath.E / 2)))}f}`);
                    arrowVolley.x = entity.x;
                    arrowVolley.y = entity.y + 4;
                    arrowVolley.z = entity.z;
                    arrowVolley.spawn();
                    offensive_ability.on_cooldown = cd;
                }
				
				if (abilityName == 'silence_the_voice') {
                    if (sourceType == 'player' && source.isPlayer()) {
						if (Math.random() < (offensive_ability.level * 0.01)) {
							server.runCommandSilent(`playsound ${sound} master ${source.username} ${source.x} ${source.y} ${source.z} 0.3`);
							server.scheduleInTicks(8, () => {
								source.potionEffects.add('alexscaves:stunned', 40, 1, true, false);
							})
                            offensive_ability.on_cooldown = cd;
                        }
                    }
                }
				
				if (abilityName == 'magic_barrage') {
					if (sourceType == 'player' && source.isPlayer() && entity.isMonster()) {
						if (Math.random() < (offensive_ability.level * 0.04)) {
							let pUUID = source.nbt.UUID;
							let pMotion = source.getLookAngle().add(0.0, 0.2, 0.0);
							let mBarrage = source.level.createEntity("botania:magic_missile");
							mBarrage.mergeNbt(`{Owner:${pUUID}}`);
							mBarrage.setDeltaMovement(pMotion)
							mBarrage.x = source.x;
							mBarrage.y = source.y + 2.25;
							mBarrage.z = source.z;
							mBarrage.spawn();
							server.runCommandSilent(`playsound ${sound} master ${source.username} ${source.x} ${source.y} ${source.z} 0.9`);
							offensive_ability.on_cooldown = cd;
						}
					}
				}
            }
        }

        // PASSIVE DEFENSIVE ABILITY
        if (entity.type == 'minecraft:player' && entity.persistentData?.puff_abilities) {
            let defensive_ability = entity.persistentData.puff_abilities.find(a => a.ability == abilityName);
            if (defensive_ability && defensive_ability.on_cooldown == 0) {
				
                if (abilityName == 'robust_stance') {
                    if (source.isMonster() && sourceType == 'mob') {
                        if (Math.random() < 0.33) {
                            server.scheduleInTicks(3, () => {
                                server.runCommandSilent(`tffeature shield ${entity.username} add ${randomize1To3()} true`);
                            });
							server.runCommandSilent(`playsound ${sound} master ${entity.username} ${entity.x} ${entity.y} ${entity.z} 0.3`);
                            defensive_ability.on_cooldown = cd;
                        }
                    }
                }
            }
        }
    });
	
	//KILL EVENT
	EntityEvents.death(event => {
        const { server, entity } = event;
		let source = event.source.actual;
        let sourceType = event.source.getType();
		if (entity.level.clientSide) return;
		
		if (source && source.persistentData?.puff_abilities) {
			let kill_ability = source.persistentData.puff_abilities.find(a => a.ability == abilityName);
			if (kill_ability && kill_ability.on_cooldown == 0) {
			
				if (abilityName == 'spellbound_missile') {
					if (sourceType == 'player' && source.isPlayer() && entity.isMonster()) {
						let pUUID = source.nbt.UUID;
						let pMotion = source.getLookAngle().add(0.0, 0.2, 0.0);
						let mMissile = source.level.createEntity("botania:magic_missile");
						mMissile.mergeNbt(`{Owner:${pUUID}}`);
						mMissile.setDeltaMovement(pMotion)
						mMissile.x = source.x;
						mMissile.y = source.y + 3;
						mMissile.z = source.z;
						mMissile.spawn();
						server.runCommandSilent(`playsound ${sound} master ${source.username} ${source.x} ${source.y} ${source.z} 0.9`);
						kill_ability.on_cooldown = cd;
					}
				}
				
				if (abilityName == 'thirst_quencher') {
					if (sourceType == 'player' && source.isPlayer() && entity.isMonster()) {
						source.getCapability($ThirstModCapabilities.PLAYER_THIRST).ifPresent(player => {
							let pThirstCurrent = player.getThirst();
							let pThirstNow = Math.min((kill_ability.level + pThirstCurrent), 20);
							player.setThirst(pThirstNow);
						});
						kill_ability.on_cooldown = cd;
					}
				}
				
				if (abilityName == 'graceful') {
					if (sourceType == 'player' && source.isPlayer() && entity.isMonster()) {
						source.potionEffects.add('cold_sweat:grace', (kill_ability.level * 30) * 20, 0, true, false);
						kill_ability.on_cooldown = cd;
					}
				}
			}
		}
	});
}

//BRAWLER
setAbility('rejuvenating_strike', 'malum:void_trinket_equipped', 10);
setAbility('volley_of_arrows', false, 20);
setAbility('robust_stance', 'goety:shield_up', 10);
setAbility('silence_the_voice', 'goety:whisperer_attack', 5, false)
setAbility('spellbound_missile', 'farlanders:entity.titan.hurt_heart', 3, false)
setAbility('magic_barrage', 'farlanders:entity.titan.hurt_heart', 0, false)

//EXPLORER
setAbility('thirst_quencher', false, 5, false)
setAbility('graceful', false, 30, false)