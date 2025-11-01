ServerEvents.chestLootTables(event => {
	event.addChest('rogue:loot/curios', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('eidolon:basic_ring', 10)
			pool.addItem('eidolon:basic_belt', 10)
			pool.addItem('eidolon:basic_amulet', 10)
			
			pool.addItem('botania:mana_ring', 8).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
			pool.addItem('botania:swap_ring', 9).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
			pool.addItem('botania:water_ring', 4).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
			pool.addItem('botania:aura_ring', 4).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
			pool.addItem('botania:dodge_ring', 4).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
			pool.addItem('botania:magnet_ring', 5).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
			pool.addItem('botania:mining_ring', 2).addCondition(cond_entity_advancement('rogue:rogue/unlock_manasteel'))
		})
	})
})