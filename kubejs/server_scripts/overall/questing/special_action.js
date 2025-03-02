//CHANGE CHECK
PlayerEvents.inventoryChanged(event => {
	const {	player } = event

		//BOTANIA
		if (player.handSlots.find(i => i.nbt?.mana >= 2147483646)) player.data.ftbquests.addProgress('119FE202C49F0884', 1);
		
		//BLOOD_MAGIC
		if (player.handSlots.find(i => (/.+anointment_holder:.+max_damage:4096.+/.test(i.nbt)))) player.data.ftbquests.addProgress('19DADD5E464746B4', 1);

		if (/.+maxPoints:300.+/.test(player.getChestArmorItem().nbt)) player.data.ftbquests.addProgress('2050F43AAB0EFA00', 1);
			
		//MISC
		if (player.handSlots.find(i => i.nbt?.BlockEntityTag?.Sandwich?.length == 32)) player.data.ftbquests.addProgress('5EC454BC5B4C683D', 1);
			
		if (player.handSlots.some(i => !!i.nbt && !!i.nbt['transmog:transmogItem'])) player.data.ftbquests.addProgress('5AC863CAF54EB649', 1);
		
		if (player.handSlots.find(i => (/.*betterarcheology.*/.test(i.nbt?.StoredEnchantments)))) player.data.ftbquests.addProgress('098B7E03BAF494F0', 1)
		
		//EMBERS
		let headA = player.headArmorItem
		let chestA = player.chestArmorItem
		let legsA = player.legsArmorItem
		let bootsA = player.feetArmorItem
		
		if (player.handSlots.some(i => 
			(/.*name:"embers(?!:core).*"/).test(headA.nbt) || 
			(/.*name:"embers(?!:core).*"/).test(chestA.nbt) || 
			(/.*name:"embers(?!:core).*"/).test(legsA.nbt) || 
			(/.*name:"embers(?!:core).*"/).test(bootsA.nbt))) {
			player.data.ftbquests.addProgress('418C7D35CE9B15AB', 1)
		}
		
		if (player.handSlots.find(i => (/.+embers:alchemical_waste.+/.test(i.nbt)))) player.data.ftbquests.addProgress('4801CB3EABE24FF7', 1);
		
		if (player.handSlots.some(i => !!i.nbt && i.nbt['embers:heat_tag']?.heat >= 0)) player.data.ftbquests.addProgress('1A3CF1C1AF618473', 1);
		
		if (player.handSlots.some(i => !!i.nbt && i.nbt['embers:heat_tag']?.heat == 500)) player.data.ftbquests.addProgress('13CBD946740C7DD3', 1);
		
		if (player.handSlots.some(i => (/.*name:"embers(?!:core).*"/).test(i.nbt))) player.data.ftbquests.addProgress('389B29412651CE3F', 1);
})

//SERVER CHECK
PlayerEvents.loggedIn(event => {
	const { player, server } = event
	if (!server.minecraftServer) {
		player.data.ftbquests.addProgress('527A5EAFAEEEAC1B', 1)
	}
})

//SPECIAL BALD-EAGLE QUEST
ItemEvents.firstLeftClicked(event => {
	const {	level, server, item, player } = event
	if (level.getEntities.length === 0) return;

	if (item.id == 'alexsmobs:falconry_glove') {
		let baldEagles = level.getEntities().filterSelector(`@e[type=alexsmobs:bald_eagle]`);
		for (let baldEagle of baldEagles) {
			if (baldEagle.nbt.HasCap == 1) {
				server.scheduleInTicks(605, () => {
					if (baldEagle.nbt.LaunchTime >= 600 && baldEagle.nbt.HasCap == 1) {
						if (baldEagle.owner == player) player.data.ftbquests.addProgress('306474F0DF86D367', 1);
					}
				})
			}
		}
	}
})

EntityEvents.hurt(event => {
	let source = event.source.getActual();
	const {	level, server, entity } = event

	if (source && source.isPlayer()) {
		
		//TREMORSAURUS STUN
		if (source.mainHandItem == Item.of('alexscaves:primitive_club') && entity.type == 'alexscaves:tremorsaurus') {
			server.scheduleInTicks(1, () => {
				if (entity.nbt?.ActiveEffects?.some(e => e["forge:id"] == 'alexscaves:stunned')) source.data.ftbquests.addProgress('71AACB5B150D754A', 1);
			})
		}

		//SPECIAL POSSESSION QUEST
		if (source.mainHandItem == Item.of('alexscaves:totem_of_possession') && entity.tags != 'resists_totem_of_possession') {
			source.data.ftbquests.addProgress('6F77AA460DC9D6B6', 1);
		}
		
		//GINGERBREAD MAN
		if (entity.type == 'alexscaves:gingerbread_man') {
			source.data.ftbquests.addProgress('625E88F19B51255D', 1);
		}
	}
})

ItemEvents.rightClicked(event => {
	const { player, item } = event
	
	//AC Floater
    if (item.id == 'alexscaves:floater') player.data.ftbquests.addProgress('3F80D0223B517E84', 1);
	
	//BM Orb
	if (/bloodmagic:.+bloodorb$/.test(item.id)) player.data.ftbquests.addProgress('33A9401D7A9A7A10', 1);
	
	//AC Codex
	if (item.id == 'alexscaves:cave_codex') player.data.ftbquests.addProgress('327E361C62833D5F', 1);
	
	//AC Codex
	if (/ars_.*:.*glyph.*/.test(item.id)) player.data.ftbquests.addProgress('4547300A9B5BA937', 1);
})


BlockEvents.rightClicked(event => {
	const { block, hand, player } = event
	
	if (hand == 'OFF_HAND') return;
	let blockData = block.entityData;
	let handItem = player.mainHandItem;
	
	//RITUAL-INIT CHECK
	let ritualCheck = (playerItem, ritualData, qID) => {
		if (block.id == 'bloodmagic:masterritualstone') {
			if (handItem.id == playerItem && blockData.currentRitual == ritualData && blockData.isRunning) player.data.ftbquests.addProgress(qID, 1);
		}
	}

	ritualCheck('bloodmagic:activationcrystalweak', 'armour_evolve', '49C2A42AFD946886')
	ritualCheck('bloodmagic:activationcrystalweak', 'crystal_split', '34DF335C747A6DC0')
	
	//MISC
	if (handItem.nbt?.hideEnchantments == 1 && block.id == 'minecraft:enchanting_table') {
		player.data.ftbquests.addProgress('17112A820A544182', 1);
	}
	
	if (handItem.id == 'embers:tinker_hammer' && block.id == 'aetherworks:forge_anvil' && block.entityData.hitTimeout >= 1) {
		Utils.server.scheduleInTicks(5, () => {
			player.data.ftbquests.addProgress('6AEA1DC98BE473A8', 1);
		})
	}
	
	if (handItem.id == 'aetherworks:lexicon' && !!(handItem.nbt?.lexicon_item?.id) && block.id == 'aetherworks:lexicon_receptacle') {
		player.data.ftbquests.addProgress('750C59424F39B2C4', 1);
	}
})

BlockEvents.broken(event => {
    const { player, block } = event
	
	if (block.id == 'minecraft:spawner' && player.mainHandItem?.nbt?.Enchantments && player.mainHandItem.nbt.Enchantments.some(e => e.id == "minecraft:silk_touch")) {
		player.data.ftbquests.addProgress('1FAE1ED7FF14FB95', 1);
	}
	
	if ((/betterarcheology:vase.*/.test(block.id))) {
		player.data.ftbquests.addProgress('742F759983CA266C', 1);
	}
})