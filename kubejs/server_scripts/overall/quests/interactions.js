global.EntityMount = (event) => {
	let mounter = event.entityMounting;
	let mountedEntity = event.entityBeingMounted;
	let level = event.level;
	
	// MOUNTING
	function mountQuest(entity, qID) {
		if (mountedEntity.type == entity) {
			simpleQuestComplete(mounter, qID);
		}
	}
	
	//ALEXS MOBS (MOUNT)
	mountQuest('alexsmobs:komodo_dragon', '63D1332EF0DDB4F6');
	mountQuest('alexsmobs:elephant', '42351A136C064897');
	mountQuest('alexscaves:atlatitan', '35C378EF9413F586');
	
	//ALEXS CAVES (MOUNT)
	mountQuest('alexscaves:subterranodon', '117D40394B0BAF34');
	mountQuest('alexscaves:tremorzilla', '20AC35886319AD3B');
	mountQuest('alexscaves:submarine', '3CB28E4CB01B7919');
	mountQuest('alexsmobs:cosmaw', '6ABF4A5642240DC5');
	
	//MISC
	mountQuest('immersive_machinery:tunnel_digger', '4CBC79147F3A341C');
	mountQuest('immersive_machinery:copperfin', '70717AC6E96FBAF2');
	mountQuest('immersive_aircraft', '6FC91C2B0505EBD4');
	mountQuest('immersive_aircraft:biplane', '219AD5F2D044C067');
	mountQuest('man_of_many_planes:economy_plane', '5966779569D94092');
	mountQuest('man_of_many_planes:scarlet_biplane', '5966779569D94092');
	mountQuest('automobility:automobile', '1A29673838D3EB79');
}

CommonAddedEvents.entityTame(event => {
	let tamedEntity = event.animal;
	let player = event.player;
	
	// TAMING
	function tameQuest(entity, qID) {
		if (tamedEntity.type == entity) {
			simpleQuestComplete(player, qID);
		}
	}
	
	//DEFAULT
	tameQuest('minecraft:cat', '1CD35C926F3BD87F');
	tameQuest('minecraft:horse', '3BCB07F0ABE70AC6');
})

global.BabyEntitySpawn = (event) => {
	let child = event.child;
	let player = event.causedByPlayer;
	
	// BREED
	function breedQuest(entity, qID) {
		if (child.type == entity && isTamedBy(child, player).tamed) {
			simpleQuestComplete(player, qID);
		}
	}
	
	breedQuest('minecraft:fox', '1360CF36EEBD2009');
}

ItemEvents.entityInteracted(event => {
	const { player, target, server, item, hand } = event;
	
	function specialTameQuest(entity, qID, extraTicks) {
		extraTicks = extraTicks ? extraTicks : 1;
		if (target.type == entity) {
			server.scheduleInTicks(extraTicks, () => {
				if (isTamedBy(target, player).tamed) simpleQuestComplete(player, qID);
			})
		}
	}
	
	specialTameQuest('friendsandfoes:glare', '732CC3554429D768');
	
	specialTameQuest('minecraft:rabbit', '0CFCCFE827050103');
	specialTameQuest('minecraft:frog', '381D5374A6B8FF7F');
	specialTameQuest('minecraft:axolotl', '293BD0029890EC6C');
	
	//ALEXS MOBS (TAME)
	specialTameQuest('alexsmobs:capuchin_monkey', '517D569FF1FFCC8F');
	specialTameQuest('alexsmobs:komodo_dragon', '731FDD53B78414B9');
	specialTameQuest('alexsmobs:warped_toad', '21105485939A9245');
	specialTameQuest('alexsmobs:mantis_shrimp', '3CBA0F62405A85CB');
	specialTameQuest('alexsmobs:kangaroo', '0C023564D56C7D60');
	specialTameQuest('alexsmobs:bald_eagle', '3EE87005F6A6DCDC');
	specialTameQuest('alexsmobs:tarantula_hawk', '2629976388226C5A');
	specialTameQuest('alexsmobs:mimic_octopus', '3B4324D922B98CD9');
	specialTameQuest('alexsmobs:flutter', '2A0EE30FE9CED1E1');
	specialTameQuest('alexsmobs:mudskipper', '5E1685DB44BCDCC1');
	specialTameQuest('alexsmobs:sugar_glider', '109415D8596CEB19');
	specialTameQuest('alexscaves:tremorzilla', '42C75973743A5B18', 100);
	specialTameQuest('alexsmobs:cosmaw', '693950A1809A92AF', 105);
	
	//ALEXS CAVES (TAME)
	specialTameQuest('alexscaves:subterranodon', '6462A506F78FA43A');
	specialTameQuest('alexscaves:vallumraptor', '499DDE39730D0FBB');
	specialTameQuest('alexscaves:raycat', '5AFE3B12D1837D37');
	specialTameQuest('alexscaves:candicorn', '03AF6E0C1BA1EB20');

	//SPECIAL-INTERACTIONS
	if (target.type == 'whaleborne:hullback' && hasCompletedQuest(player, '0B2397BFB9F65CD5')) {
		simpleQuestComplete(player, '0D8815896B934D9E');
	}
	
	if (target.type == 'minecraft:villager' && target.nbt.VillagerData.profession == "cloudstorage:balloon_salesman") {
		simpleQuestComplete(player, '40E1D9320F4B18AB');
	}
	
	if (item.id == Item.of('frozenhappyghast:ghast_wand') && target.type == 'minecraft:happy_ghast') {
		simpleQuestComplete(player, '1CE07A8BF1D8E8DF');
	}
	
	if (item.id == Item.of('#minecraft:harnesses') && target.type == 'minecraft:happy_ghast') {
		simpleQuestComplete(player, '44AF41FE53DB8FE1');
	}
	
	if (item.id !== Item.of('#minecraft:harnesses') && target.type == 'minecraft:happy_ghast' && target.nbt.ArmorItems[2].id == Item.of('#minecraft:harnesses')) {
		simpleQuestComplete(player, '2CBAD9F73C3773B5');
	}
	
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
	if (target.type == 'alexsmobs:flutter' && target.owner == player) {
		server.scheduleInTicks(1, () => {
			if (target.nbt.Potted == 1) simpleQuestComplete(player, '7C5E7C14BF452286');
		})
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
})