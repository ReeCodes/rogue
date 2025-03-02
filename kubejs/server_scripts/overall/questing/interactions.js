const $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack")

ItemEvents.entityInteracted(event => {
	const { player, target, server } = event
	
	//OTHER
	if (target.type == 'minecraft:villager' && target.nbt.VillagerData.profession == "copperworks:engineer") {
		player.data.ftbquests.addProgress('715F0C13AD175462', 1)
	}
	
	if (target.type == 'minecraft:villager' && target.nbt.VillagerData.profession == "cloudstorage:balloon_salesman") {
		player.data.ftbquests.addProgress('40E1D9320F4B18AB', 1)
	}
	
	if (target.type == 'immersive_aircraft:airship' || target.type == 'immersive_aircraft:gyrodyne' || target.type == 'immersive_aircraft:quadrocopter') {
		player.data.ftbquests.addProgress('6FC91C2B0505EBD4', 1)
	}
	
	if (target.type == 'immersive_aircraft:biplane') {
		player.data.ftbquests.addProgress('219AD5F2D044C067', 1)
	}
	
	if (target.type == 'man_of_many_planes:economy_plane' || target.type == 'man_of_many_planes:scarlet_biplane') {
		player.data.ftbquests.addProgress('5966779569D94092', 1)
	}
	
	if (target.type == 'automobility:automobile') {
		player.data.ftbquests.addProgress('1A29673838D3EB79', 1)
	}
	
	//TAMING
	let quest_taming = (entity, qID, extraTicks) => {
		extraTicks = extraTicks ? extraTicks : 3
		if (target.type == entity) {
			server.scheduleInTicks(extraTicks, () => {
				if (target.owner == player) player.data.ftbquests.addProgress(qID, 1)
			})
		}
	}
	
	//MOUNTING
	let quest_mounting = (entity, qID) => {
		if (target.type == entity) {
		server.scheduleInTicks(3, () => {
				if (player.nbt.RootVehicle?.Entity?.id  == entity) player.data.ftbquests.addProgress(qID, 1)
			})
		}
	}
	
	//SPECIAL-INTERACTIONS
	if (target.type.includes('alshanex_familiars:') && JSON.stringify(target.nbt.ownerUUID) === JSON.stringify(player.nbt.UUID)) {
		player.data.ftbquests.addProgress('7628C671DBEB0B5C', 1)
	}
	
	if (target.type.includes('alshanex_familiars:') && JSON.stringify(target.nbt.ownerUUID) === JSON.stringify(player.nbt.UUID) && event.item.id == Item.of('alshanex_familiars:familiar_tome')) {
		player.data.ftbquests.addProgress('2AB92E03C6FBF951', 1)
	}
	
	//ANIMAL DICTIONARY
	if (target.type.includes('alexsmobs:') && event.getItem().id == Item.of('alexsmobs:animal_dictionary')) {
		player.data.ftbquests.addProgress('3BA790B9D9DD30F6', 1)
	}
	
	//OCCULTISM - IRON COUNTER
	if (target.type == 'occultism:blacksmith_familiar') {
		if (event.getItem().hasTag('forge:ingots/iron') || event.getItem().hasTag('forge:storage_blocks/iron')) {
			if (target.nbt.ironCount >= 1) player.data.ftbquests.addProgress('321D44AFD3D5D73A', 1)
		}
	}
	
	//CHAMELEON-TRUSTED
	if (target.type == 'cold_sweat:chameleon') {
		server.scheduleInTicks(20, () => {
			if (target.isPlayerTrusted(player.uuid)) player.data.ftbquests.addProgress('7240042625E84AD9', 1)
		})
	}
	
	//ALEXS CAVES
	if (target.type == 'alexscaves:submarine') {
		if (event.getItem().hasTag('minecraft:axes') || event.getItem().hasTag('forge:tools/axes')) {
			if (target.nbt.Oxidization >= 1) player.data.ftbquests.addProgress('016E87C448173B5B', 1)
		}
		if (event.getItem().id == Item.of('minecraft:honeycomb')) {
			if (target.nbt.Waxed == 1) player.data.ftbquests.addProgress('205938E983127750', 1)
		}
		if (event.getItem().hasTag('forge:ingots/copper')) {
			if (target.nbt.DamageLevel >= 1) player.data.ftbquests.addProgress('78AEA110712B36EC', 1)
		}
	}
	
	if (target.type == 'alexscaves:sea_pig' && event.getItem().hasTag('alexscaves:sea_pig_digests')) {
		player.data.ftbquests.addProgress('40FF39CFA43FE8B4', 1)
	}
	
	if (target.type == 'alexscaves:atlatitan' && event.getItem().id == Item.of('alexscaves:serene_salad')) {
		server.scheduleInTicks(3, () => {
			if (target.nbt.RideableTime >= 1) player.data.ftbquests.addProgress('23A40F31301BBF70', 1)
		})
	}
	
	if (target.type == 'alexscaves:gummy_bear' && event.getItem().id == Item.of('minecraft:potion')) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.SleepTime >= 1) player.data.ftbquests.addProgress('447B979989707FDC', 1)
		})
	}
	
	//ALEXS MOBS	
	if (target.type == 'alexsmobs:flutter') {
		server.scheduleInTicks(3, () => {
			if (target.nbt.Potted == 1) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('7C5E7C14BF452286', 1)
				})
			}
		})
	}
	
	if (target.type == 'alexsmobs:mimic_octopus') {
		server.scheduleInTicks(3, () => {
			if (target.nbt.Upgraded == 1) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('4C5704F62767A12D', 1)
				})
			}
			if (target.nbt.MimicState == 0) return;
			if (target.nbt.MimicState == 1) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('256016CC7D7F6590', 1)
				})
			}
			if (target.nbt.MimicState == 2) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('1C0AB80C27E29EAF', 1)
				})
			}
			if (target.nbt.MimicState == 3) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('6F5A3171390909F6', 1)
				})
			}
		})
	}
	
	if (target.type == 'alexsmobs:kangaroo') {
		if (target.nbt.HelmetInvIndex != -1 && target.nbt.ChestInvIndex != -1 && target.nbt.SwordInvIndex != -1) {
			server.scheduleInTicks(3, () => {
				 if (target.owner == player) player.data.ftbquests.addProgress('21FBCCFB52C71B38', 1)
			})
		}
	}
	
	if (target.type == 'alexsmobs:mantis_shrimp') {
		if (target.nbt.Command == 2 && target.nbt.HandItems[0].id) {
			server.scheduleInTicks(3, () => {
				 if (target.owner == player) player.data.ftbquests.addProgress('7D4480E4D601F185', 1)
			})
		}
	}
	
	if (target.type == 'alexsmobs:elephant') {
		server.scheduleInTicks(3, () => {
			if (target.nbt.Tusked == 0) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('313936FC178EBF54', 1)
				})
			}
			if (target.nbt.Chested == 1) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('4CF9D2BF1E14BCC4', 1)
				})
			}
			if (target.nbt.Carpet != -1) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('25D6772643013B4C', 1)
				})
			}
		})
	}

	if (target.type == 'alexsmobs:bald_eagle') {
		server.scheduleInTicks(3, () => {
			if (player.nbt.Passengers && player.nbt.Passengers.some(p => p.id == 'alexsmobs:bald_eagle')) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('5580F2944EFD5AC8', 1)
				})
			}
		})
	}
	
	if (target.type == 'alexsmobs:sugar_glider') {
		server.scheduleInTicks(3, () => {
			if (player.nbt.Passengers && player.nbt.Passengers.some(p => p.id == 'alexsmobs:sugar_glider')) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('7D081DFA8574775D', 1)
				})
			}
		})
	}
	
	if (target.type == 'alexsmobs:capuchin_monkey') {
		if (event.getItem().id == Item.of('alexsmobs:ancient_dart')) {
			server.scheduleInTicks(3, () => {
				if (target.nbt.HasDart == 1 && target.owner == player) player.data.ftbquests.addProgress('08AAAD7C68DBDFEE', 1)
			})
		}
		server.scheduleInTicks(3, () => {
			if (player.nbt.Passengers && player.nbt.Passengers.some(p => p.id == 'alexsmobs:capuchin_monkey')) {
				server.scheduleInTicks(3, () => {
					 if (target.owner == player) player.data.ftbquests.addProgress('1637B0358CD14B59', 1)
				})
			}
		})
	}
	
	if (target.type == 'alexscaves:candicorn' && event.getItem().id == Item.of('minecraft:saddle')) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.Saddled == 1) player.data.ftbquests.addProgress('7F7D198CD0C38A85', 1)
		})
	}
	
	//DEFAULT
	quest_taming('minecraft:cat', '1CD35C926F3BD87F')
	quest_taming('friendsandfoes:glare', '732CC3554429D768')
	
	//ALEXS MOBS (TAME)
	quest_taming('alexsmobs:capuchin_monkey', '517D569FF1FFCC8F')
	quest_taming('alexsmobs:komodo_dragon', '731FDD53B78414B9')
	quest_taming('alexsmobs:warped_toad', '21105485939A9245')
	quest_taming('alexsmobs:mantis_shrimp', '3CBA0F62405A85CB')
	quest_taming('alexsmobs:kangaroo', '0C023564D56C7D60')
	quest_taming('alexsmobs:bald_eagle', '3EE87005F6A6DCDC')
	quest_taming('alexsmobs:tarantula_hawk', '2629976388226C5A')
	quest_taming('alexsmobs:mimic_octopus', '3B4324D922B98CD9')
	quest_taming('alexsmobs:cosmaw', '693950A1809A92AF', 105)
	quest_taming('alexsmobs:flutter', '2A0EE30FE9CED1E1')
	quest_taming('alexsmobs:mudskipper', '5E1685DB44BCDCC1')
	quest_taming('alexsmobs:sugar_glider', '109415D8596CEB19')
	
	//ALEXS MOBS (MOUNT)
	quest_mounting('alexsmobs:komodo_dragon', '63D1332EF0DDB4F6')
	quest_mounting('alexsmobs:elephant', '42351A136C064897')
	quest_mounting('alexscaves:atlatitan', '35C378EF9413F586')
	
	//ALEXS CAVES (TAME)
	quest_taming('alexscaves:subterranodon', '6462A506F78FA43A')
	quest_taming('alexscaves:vallumraptor', '499DDE39730D0FBB')
	quest_taming('alexscaves:raycat', '5AFE3B12D1837D37')
	quest_taming('alexscaves:tremorzilla', '42C75973743A5B18', 100)
	quest_taming('alexscaves:candicorn', '03AF6E0C1BA1EB20')
	
	//ALEXS CAVES (MOUNT)
	quest_mounting('alexscaves:subterranodon', '117D40394B0BAF34')
	quest_mounting('alexscaves:tremorzilla', '20AC35886319AD3B')
	quest_mounting('alexscaves:submarine', '3CB28E4CB01B7919')
})

//TOSS-TAMING
LevelEvents.tick(event => {
	const {	level, server } = event
	if (level.time % 60 !== 0) return;
	if (level.getEntities().length === 0 || level.players.length === 0) return;

		//SPECIAL-CHECKS
		for (let player of level.players) {
			
			//Vallumraptor
			let vRaptors = level.getEntities().filterSelector(`@e[type=alexscaves:vallumraptor]`);
			for (let vRaptor of vRaptors) {
				if (vRaptor.nbt.HandItems[0].id == 'alexscaves:dinosaur_nugget') {
					if (vRaptor.distanceToEntitySqr(player) <= Math.pow(20, 2) && vRaptor.nbt.RelaxedTime >= 1) player.data.ftbquests.addProgress('72CBAD503889F198', 1);
				}
			}
			
			//Blacksmith Familiar
			let occBlacksmiths = level.getEntities().filterSelector(`@e[type=occultism:blacksmith_familiar]`);
			for (let occBlacksmith of occBlacksmiths) {
				if (occBlacksmith.owner == player && occBlacksmith.distanceToEntitySqr(player) <= Math.pow(20, 2)) player.data.ftbquests.addProgress('672A223B98FC56A8', 1);
			}
		}

		let quest_toss_taming = (entityID, itemTag, qID) => {
			for (let player of level.players) {
				let entities = level.getEntities().filterSelector(`@e[type=${entityID}]`);
				for (let entity of entities) {
					if (![entityID].includes(entity.type)) return;
					if ($ItemStack.of(entity.nbt.HandItems[0]).hasTag(itemTag)) {
						if (entity.owner == player) player.data.ftbquests.addProgress(qID, 1);
					}
				}
			}
		}
		
		//ALEXS MOBS (TOSS-TAME)
		quest_toss_taming('alexsmobs:gorilla', 'alexsmobs:gorilla_foodstuffs', '60E41D3C0C9F67F9')
		quest_toss_taming('alexsmobs:crow', 'alexsmobs:crow_foodstuffs', '670B9CF038ECDC1F')
})