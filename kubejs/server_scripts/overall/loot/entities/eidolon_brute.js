ServerEvents.entityLootTables(event => {
	event.addEntity('eidolon:zombie_brute', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('minecraft:rotten_flesh', 1, [1, 4]).addFunction(func_loot_ench(0.0, 2.0))
		})
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('minecraft:bone', 1, [0, 1]).addFunction(func_loot_ench(0.0, 1.0))
		})
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('eidolon:zombie_heart', 1)
			pool.addCondition(cond_kbp).addCondition(cond_rChance_looting(0.1, 0.05))
		})
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('embers:lead_ingot', 1)
			pool.addCondition(cond_kbp).addCondition(cond_rChance_looting(0.025, 0.01))
		})
	})
})