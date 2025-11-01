ServerEvents.entityLootTables(event => {
	event.addEntity('player_mobs:player_mob', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('minecraft:bone', 145, [1, 2]).addFunction(func_loot_ench(0.0, 4.0))
			pool.addItem('dustrial_decor:rusty_iron_nugget', 130, [9, 12]).addFunction(func_loot_ench(0.0, 6.0))
			pool.addItem('kubejs:makeshift_box', 50, [1, 2]).addFunction(func_loot_ench(0.0, 2.0))
		})
	})
})