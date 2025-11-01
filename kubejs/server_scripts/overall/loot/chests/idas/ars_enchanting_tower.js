ServerEvents.chestLootTables(event => {
	event.addChest('idas:enchantingtower/enchantingtower_top_ars', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('minecraft:potion', 1).addFunction(func_set_potion('minecraft:strong_poison'))
			pool.addItem('minecraft:potion', 1).addFunction(func_set_potion('minecraft:long_strength'))
			pool.addItem('minecraft:potion', 1).addFunction(func_set_potion('minecraft:strong_regeneration'))
			pool.addItem('minecraft:potion', 1).addFunction(func_set_potion('minecraft:slow_falling'))
		})
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('ars_nouveau:scryer_scroll', 4)
			pool.addItem('minecraft:name_tag', 5)
			pool.addItem('minecraft:diamond', 2, [1, 2])
			pool.addItem('ars_nouveau:air_essence', 1)
			pool.addItem('ars_nouveau:earth_essence', 1)
			pool.addItem('ars_nouveau:fire_essence', 1)
			pool.addItem('ars_nouveau:water_essence', 1)
		})
		table.addPool(pool => {
			pool.rolls = 2;
			pool.addItem('ars_nouveau:source_gem', 1).addFunction(func_limit_count(1, 3))
			pool.addItem('minecraft:emerald', 2).addFunction(func_limit_count(2, 10))
			pool.addItem('minecraft:amethyst_shard', 2).addFunction(func_limit_count(1, 5))
			pool.addItem('minecraft:golden_apple', 2).addFunction(func_limit_count(1, 2))
			pool.addItem('create:rose_quartz', 2).addFunction(func_limit_count(2, 5))
			pool.addItem('create:powdered_obsidian', 1).addFunction(func_limit_count(2, 3))
		})
		table.addPool(pool => {
			pool.rolls = 4;
			pool.addItem('minecraft:bone', 1).addFunction(func_limit_count(3, 8))
			pool.addItem('minecraft:rotten_flesh', 2).addFunction(func_limit_count(3, 10))
			pool.addItem('minecraft:string', 1).addFunction(func_limit_count(3, 8))
			pool.addItem('minecraft:nether_wart', 1).addFunction(func_limit_count(3, 8))
			pool.addItem('create:experience_nugget', 1).addFunction(func_limit_count(3, 8))
			pool.addItem('create:raw_zinc', 1).addFunction(func_limit_count(3, 8))
		})
	})
})