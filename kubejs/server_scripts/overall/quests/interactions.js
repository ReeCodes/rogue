ItemEvents.entityInteracted(event => {
	const { player, target, server, item } = event;
	
	//OTHER
	if (target.type == 'minecraft:villager' && target.nbt.VillagerData.profession == "copperworks:engineer") {
		simpleQuestComplete(player, '715F0C13AD175462');
	}
	
	if (target.type == 'minecraft:villager' && target.nbt.VillagerData.profession == "cloudstorage:balloon_salesman") {
		simpleQuestComplete(player, '40E1D9320F4B18AB');
	}
	
	if (target.type == 'immersive_aircraft:airship' || target.type == 'immersive_aircraft:gyrodyne' || target.type == 'immersive_aircraft:quadrocopter') {
		simpleQuestComplete(player, '6FC91C2B0505EBD4');
	}
	
	if (target.type == 'immersive_aircraft:biplane') {
		simpleQuestComplete(player, '219AD5F2D044C067');
	}
	
	if (target.type == 'man_of_many_planes:economy_plane' || target.type == 'man_of_many_planes:scarlet_biplane') {
		simpleQuestComplete(player, '5966779569D94092');
	}
	
	if (target.type == 'automobility:automobile') {
		simpleQuestComplete(player, '1A29673838D3EB79');
	}
	
	//TAMING
	function quest_taming(entity, qID, extraTicks) {
		extraTicks = extraTicks ? extraTicks : 3
		if (target.type == entity) {
			server.scheduleInTicks(extraTicks, () => {
				if (target.owner == player) simpleQuestComplete(player, qID);
			})
		}
	}
	
	//MOUNTING
	function quest_mounting(entity, qID) {
		if (target.type == entity) {
		server.scheduleInTicks(1, () => {
				if (player.nbt.RootVehicle?.Entity?.id  == entity) simpleQuestComplete(player, qID);
			})
		}
	}
	
	//SPECIAL-INTERACTIONS
	if (item.id == Item.of('domesticationinnovation:rotten_apple') && target.owner == player && target.type == 'minecraft:horse') {
		simpleQuestComplete(player, '30A4AC942AEFD72B');
	}
	
	if (item.id == Item.of('domesticationinnovation:sinister_carrot') && target.owner == player && target.type == 'minecraft:zombie_horse') {
		simpleQuestComplete(player, '2BBB7DE25D9AC9E6');
	}
	
	if (item.id == Item.of('domesticationinnovation:sinister_carrot') && target.owner == player && target.type == 'minecraft:rabbit') {
		simpleQuestComplete(player, '20AACC090EC1C27D');
	}
	
	//BIOMANCY
	if (item.id == Item.of('biomancy:extractor') && target.isAlive()) {
		simpleQuestComplete(player, '29BFD62D1F5C2862');
	}
	
	if (item.id == Item.of('biomancy:injector') && !!(item.nbt?.inventory?.Item?.id) && target.isAlive()) {
		simpleQuestComplete(player, '48871351101E71C0');
	}
	
	//ALSHANEX
	if (target.type.includes('alshanex_familiars:') && JSON.stringify(target.nbt.ownerUUID) === JSON.stringify(player.nbt.UUID)) {
		simpleQuestComplete(player, '7628C671DBEB0B5C');
	}
	
	if (target.type.includes('alshanex_familiars:') && JSON.stringify(target.nbt.ownerUUID) === JSON.stringify(player.nbt.UUID) && item.id == Item.of('alshanex_familiars:familiar_tome')) {
		simpleQuestComplete(player, '2AB92E03C6FBF951');
	}
	
	//ANIMAL DICTIONARY
	if (target.type.includes('alexsmobs:') && item.id == Item.of('alexsmobs:animal_dictionary')) {
		simpleQuestComplete(player, '3BA790B9D9DD30F6');
	}
	
	//OCCULTISM - IRON COUNTER
	if (target.type == 'occultism:blacksmith_familiar') {
		if (item.hasTag('forge:ingots/iron') || item.hasTag('forge:storage_blocks/iron')) {
			if (target.nbt.ironCount >= 1) simpleQuestComplete(player, '321D44AFD3D5D73A');
		}
	}
	
	//CHAMELEON-TRUSTED
	if (target.type == 'cold_sweat:chameleon') {
		server.scheduleInTicks(20, () => {
			if (target.isPlayerTrusted(player.uuid)) simpleQuestComplete(player, '7240042625E84AD9');
		})
	}
	
	//ALEXS CAVES
	if (target.type == 'alexscaves:submarine') {
		if (item.hasTag('minecraft:axes') || item.hasTag('forge:tools/axes')) {
			if (target.nbt.Oxidization >= 1) simpleQuestComplete(player, '016E87C448173B5B');
		}
		if (item.id == Item.of('minecraft:honeycomb')) {
			if (target.nbt.Waxed == 1) simpleQuestComplete(player, '205938E983127750');
		}
		if (item.hasTag('forge:ingots/copper')) {
			if (target.nbt.DamageLevel >= 1) simpleQuestComplete(player, '78AEA110712B36EC');
		}
	}
	
	if (target.type == 'alexscaves:sea_pig' && item.hasTag('alexscaves:sea_pig_digests')) {
		simpleQuestComplete(player, '40FF39CFA43FE8B4');
	}
	
	if (target.type == 'alexscaves:atlatitan' && item.id == Item.of('alexscaves:serene_salad')) {
		server.scheduleInTicks(3, () => {
			if (target.nbt.RideableTime >= 1) simpleQuestComplete(player, '23A40F31301BBF70');
		})
	}
	
	if (target.type == 'alexscaves:gummy_bear' && item.id == Item.of('minecraft:potion')) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.SleepTime >= 1) simpleQuestComplete(player, '447B979989707FDC');
		})
	}
	
	//ALEXS MOBS	
	if (target.type == 'alexsmobs:flutter' && target.owner == player && target.nbt.Potted == 1) {
		simpleQuestComplete(player, '7C5E7C14BF452286');
	}
	
	if (target.type == 'alexsmobs:mimic_octopus' && target.owner == player) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.Upgraded == 1) {
				simpleQuestComplete(player, '4C5704F62767A12D');
			}
			if (target.nbt.MimicState == 1) {
				simpleQuestComplete(player, '256016CC7D7F6590');

			}
			if (target.nbt.MimicState == 2) {
				simpleQuestComplete(player, '1C0AB80C27E29EAF');
			}
			if (target.nbt.MimicState == 3) {
				simpleQuestComplete(player, '6F5A3171390909F6');
			}
		})
	}
	
	if (target.type == 'alexsmobs:kangaroo' && target.owner == player) {
		if (target.nbt.HelmetInvIndex != -1 && target.nbt.ChestInvIndex != -1 && target.nbt.SwordInvIndex != -1) {
			simpleQuestComplete(player, '21FBCCFB52C71B38');
		}
	}
	
	if (target.type == 'alexsmobs:mantis_shrimp' && target.owner == player && target.nbt?.Command == 2) {
		if (!!target.nbt?.HandItems[0]?.id) simpleQuestComplete(player, '7D4480E4D601F185');
	}
	
	if (target.type == 'alexsmobs:elephant' && target.owner == player) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.Tusked == 0) {
				simpleQuestComplete(player, '313936FC178EBF54');
			}
			if (target.nbt.Chested == 1) {
				simpleQuestComplete(player, '4CF9D2BF1E14BCC4');
			}
			if (target.nbt.Carpet != -1) {
				simpleQuestComplete(player, '25D6772643013B4C');
			}
		})
	}

	if (target.type == 'alexsmobs:bald_eagle' && target.owner == player) {
		server.scheduleInTicks(1, () => {
			if (player.nbt.Passengers && player.nbt.Passengers.some(p => p.id == 'alexsmobs:bald_eagle')) {
				simpleQuestComplete(player, '5580F2944EFD5AC8');
			}
		})
	}
	
	if (target.type == 'alexsmobs:sugar_glider' && target.owner == player) {
		server.scheduleInTicks(1, () => {
			if (player.nbt.Passengers && player.nbt.Passengers.some(p => p.id == 'alexsmobs:sugar_glider')) {
				simpleQuestComplete(player, '7D081DFA8574775D');
			}
		})
	}
	
	if (target.type == 'alexsmobs:capuchin_monkey' && target.owner == player) {
		if (item.id == Item.of('alexsmobs:ancient_dart')) {
			server.scheduleInTicks(1, () => {
				if (target.nbt.HasDart == 1) simpleQuestComplete(player, '08AAAD7C68DBDFEE');
			})
		}
		server.scheduleInTicks(1, () => {
			if (player.nbt.Passengers && player.nbt.Passengers.some(p => p.id == 'alexsmobs:capuchin_monkey')) {
				simpleQuestComplete(player, '1637B0358CD14B59');
			}
		})
	}
	
	if (target.type == 'alexscaves:candicorn' && item.id == Item.of('minecraft:saddle')) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.Saddled == 1) simpleQuestComplete(player, '7F7D198CD0C38A85');
		})
	}
	
	//DEFAULT
	quest_taming('minecraft:cat', '1CD35C926F3BD87F');
	quest_taming('friendsandfoes:glare', '732CC3554429D768');
	quest_taming('minecraft:horse', '3BCB07F0ABE70AC6');
	quest_taming('minecraft:rabbit', '0CFCCFE827050103');
	quest_taming('minecraft:frog', '381D5374A6B8FF7F');
	quest_taming('minecraft:fox', '1360CF36EEBD2009');
	quest_taming('minecraft:axolotl', '293BD0029890EC6C');
	
	//ALEXS MOBS (TAME)
	quest_taming('alexsmobs:capuchin_monkey', '517D569FF1FFCC8F');
	quest_taming('alexsmobs:komodo_dragon', '731FDD53B78414B9');
	quest_taming('alexsmobs:warped_toad', '21105485939A9245');
	quest_taming('alexsmobs:mantis_shrimp', '3CBA0F62405A85CB');
	quest_taming('alexsmobs:kangaroo', '0C023564D56C7D60');
	quest_taming('alexsmobs:bald_eagle', '3EE87005F6A6DCDC');
	quest_taming('alexsmobs:tarantula_hawk', '2629976388226C5A');
	quest_taming('alexsmobs:mimic_octopus', '3B4324D922B98CD9');
	quest_taming('alexsmobs:cosmaw', '693950A1809A92AF', 105);
	quest_taming('alexsmobs:flutter', '2A0EE30FE9CED1E1');
	quest_taming('alexsmobs:mudskipper', '5E1685DB44BCDCC1');
	quest_taming('alexsmobs:sugar_glider', '109415D8596CEB19');
	
	//ALEXS MOBS (MOUNT)
	quest_mounting('alexsmobs:komodo_dragon', '63D1332EF0DDB4F6');
	quest_mounting('alexsmobs:elephant', '42351A136C064897');
	quest_mounting('alexscaves:atlatitan', '35C378EF9413F586');
	
	//ALEXS CAVES (TAME)
	quest_taming('alexscaves:subterranodon', '6462A506F78FA43A');
	quest_taming('alexscaves:vallumraptor', '499DDE39730D0FBB');
	quest_taming('alexscaves:raycat', '5AFE3B12D1837D37');
	quest_taming('alexscaves:tremorzilla', '42C75973743A5B18', 100);
	quest_taming('alexscaves:candicorn', '03AF6E0C1BA1EB20');
	
	//ALEXS CAVES (MOUNT)
	quest_mounting('alexscaves:subterranodon', '117D40394B0BAF34');
	quest_mounting('alexscaves:tremorzilla', '20AC35886319AD3B');
	quest_mounting('alexscaves:submarine', '3CB28E4CB01B7919');
})

LevelEvents.tick(event => {
	const {	level, server } = event;
	if (level.clientSide) return;
	
	//CHECKS EVERY 4 SECONDS
	if (level.time % 80 !== 0) return;
	if (level.players.length === 0) return;

		//SPECIAL-CHECKS
		for (let player of level.players) {
			
			//VALLUMRAPTOR QUEST
			let vRaptors = level.entities.filter(entity => (entity.type == 'alexscaves:vallumraptor' && entity.nbt.RelaxedTime >= 1 && entity.distanceToEntitySqr(player) <= Math.pow(16, 2)));
			if (vRaptors.length !== 0) {
				simpleQuestComplete(player, '72CBAD503889F198');
			}

			//BLACKSMITH FAMILIAR QUEST
			let blacksmiths = level.getEntities().filter(entity => (entity.type == 'occultism:blacksmith_familiar' && entity.owner == player && entity.distanceToEntitySqr(player) <= Math.pow(16, 2)));
			if (blacksmiths.length !== 0) {
				simpleQuestComplete(player, '672A223B98FC56A8');
			}
			
			//TOSS-TAMING
			let quest_toss_taming = (entityId, itemTag, quest_id) => {
				let entities = level.entities.filter(entity => (entity.type == entityId && entity.owner == player && $ItemStack.of(entity.nbt.HandItems[0]).hasTag(itemTag)));
				if (entities.length !== 0) {
					simpleQuestComplete(player, quest_id);
				}
			}
			//ALEXS MOBS (TOSS-TAME)
			quest_toss_taming('alexsmobs:gorilla', 'alexsmobs:gorilla_foodstuffs', '60E41D3C0C9F67F9');
			quest_toss_taming('alexsmobs:crow', 'alexsmobs:crow_breedables', '670B9CF038ECDC1F');
		}
})