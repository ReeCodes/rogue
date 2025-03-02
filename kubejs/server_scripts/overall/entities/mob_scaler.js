let excludeADRegex = new RegExp('.*creeperoverhaul.*');

let excludeAD = ['dummmmmmy:target_dummy', 'luggage:ender_luggage', 'luggage:luggage', 'forbidden_arcanus:lost_soul', 'rats:plague_doctor', 'meetyourfight:bellringer', 'friendsandfoes:copper_golem', 'mutantmonsters:mutant_snow_golem'];
let excludeHealth = new RegExp(['dummmmmmy:target_dummy', 'luggage:ender_luggage', 'luggage:luggage', 'forbidden_arcanus:lost_soul'].join("|"));

function scaleMobs(isMonster, nonHostileDebuff) {
	nonHostileDebuff = nonHostileDebuff || 1;
	
	EntityEvents.spawned(event => {
		const {server, entity} = event;
		if (server.players.length === 0) return;
		
		server.players.forEach(player => {
			let pCoef = player.persistentData?.coef;
			
			if (entity.isAlive() && player && pCoef) {
				
				if (entity.isPlayer()) return;
				
				if (isMonster) {
					if (!entity.isMonster()) return;
				} else {
					if (!entity.isLiving() || !entity.isAnimal()) return;
				}
				
				if (entity.persistentData.changed_attributes == undefined || entity.persistentData.changed_attributes < 1) {
					entity.persistentData.changed_attributes = 1;
					
					//HEALTH
						if (entity.getAttributeValue('minecraft:generic.max_health') >= 0) {
							if (entity.nbt?.ForgeData && entity.nbt?.ForgeData["apoth.boss"] == 1) return;
							if (
								!!entity.nbt?.Attributes &&
								!!entity.nbt.Attributes.some(att => {
									return (
										att.Name === "minecraft:generic.max_health" &&
										Array.isArray(att.Modifiers) &&
										!!att.Modifiers.some(mod => mod.Name === "Backpack bearer health bonus")
									);
								})
							) {
								return;
							}
							if (!excludeHealth.test(entity.type)) {
							let entityHealth = entity.health;
							let maxEntityHealth = entity.maxHealth;
							let highHealth = 150;
							if (maxEntityHealth < highHealth) {
								let healthAddend = (6.5 * Math.pow(pCoef, 1.35)) * nonHostileDebuff;
								if (maxEntityHealth < 20) {
									entityHealth += healthAddend;
									maxEntityHealth += healthAddend;
									entity.setMaxHealth(Math.floor(maxEntityHealth));
									entity.setHealth(Math.floor(entityHealth));
								} else if (maxEntityHealth >= 20) {
									entityHealth += healthAddend - 6;
									maxEntityHealth += healthAddend - 6;
									entity.setMaxHealth(Math.floor(maxEntityHealth));
									entity.setHealth(Math.floor(entityHealth));
								}
							} else if (maxEntityHealth >= highHealth) {
								let highCalc = Math.pow(pCoef, 0.66) * (pCoef * 45);
								let bossAddend = Math.min(highCalc, 3500) * (nonHostileDebuff / 2);
								entityHealth += bossAddend;
								maxEntityHealth += bossAddend;
								entity.setMaxHealth(Math.floor(maxEntityHealth));
								entity.setHealth(Math.floor(entityHealth));
								}
							}
						};
					
					// SPEED
					if (entity.getAttributeValue('minecraft:generic.movement_speed') >= 0) {
						let baseSpeed = entity.getAttributeValue('minecraft:generic.movement_speed'); 
						let minSpeed = 0.015;
						let maxSpeed = 0.3;
						let addSpeed = minSpeed + ((pCoef - 1) / 19) * (0.3 - baseSpeed);
						entity.modifyAttribute('minecraft:generic.movement_speed', 'speed_extra', addSpeed, "addition");
					};
					
					//ARROW DMG
					if (entity.getAttributeValue('attributeslib:arrow_damage') >= 0) {
						let eArrowDamage = entity.getAttributeValue('attributeslib:arrow_damage')
						let arrowDamageCalc = Math.pow(pCoef, 0.57) + Math.pow(pCoef, 0.57);
						eArrowDamage += (Math.min(arrowDamageCalc, 120) - 1) * nonHostileDebuff;
						entity.modifyAttribute('attributeslib:arrow_damage', 'arrow_damage_extra', Math.floor(eArrowDamage), "addition");
					};
					
					//MAGIC DMG
					if (entity.getAttributeValue('puffish_attributes:magic_damage') >= 0) {
						let entityMagicDamage = entity.getAttributeValue('puffish_attributes:magic_damage')
						let magicDamageCalc = Math.pow(pCoef, 0.42) + Math.pow(pCoef, 0.42);
						entityMagicDamage += Math.min(magicDamageCalc, 100) * nonHostileDebuff;
						entity.modifyAttribute('obscure_api:magic_damage', 'magic_damage_extra', Math.floor(entityMagicDamage), "addition");
					};
					
					//STEP HEIGHT
					if (entity.getAttributeValue('forge:step_height_addition') >= 0) {
						let entityStepHeight = entity.getAttributeValue('forge:step_height_addition')
						for (let i = 4; i <= pCoef && i <= 9; i++) {
							entityStepHeight += 1;
						}
						entity.modifyAttribute('forge:step_height_addition', 'step_height_extra', entityStepHeight, "addition");
					};
					
					//ATTACK DMG
					try {
						if (excludeADRegex.test(entity.type)) return;
						if (excludeAD.includes(entity.type) || (entity.isAnimal() && !/.*golem.*/.test(entity.type))) return;
						if (entity.getAttributeValue('minecraft:generic.attack_damage') >= 0) {
							let entityDamage = entity.getAttributeValue('minecraft:generic.attack_damage')
							let damageCalc = Math.pow(pCoef, 1.11) + Math.pow(pCoef, 1.11);
							entityDamage += (Math.min(damageCalc, 120) - 1) * nonHostileDebuff;
							entity.modifyAttribute('minecraft:generic.attack_damage', 'attack_damage_extra', Math.floor(entityDamage), "addition");
						}
					} catch (e) {
						console.error(`[Coeffiency Stages]: Skipped entity: "${entity.type}" as it does not have Attack Damage.`);
					}
				};
			}
		})
	})
};

scaleMobs(true);
scaleMobs(false, 0.67);
