ServerEvents.entityLootTables(event => {
	event.addEntity('player_mobs:player_mob', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('numismatics:sun', 1, [1, 1]).addFunction(func_loot_ench(0.0, 1.0))
			pool.addItem('numismatics:cog', 20, [1, 2]).addFunction(func_loot_ench(0.0, 2.0))
			pool.addItem('numismatics:sprocket', 30, [1, 2]).addFunction(func_loot_ench(0.0, 3.0))
			pool.addItem('numismatics:bevel', 40, [1, 3]).addFunction(func_loot_ench(0.0, 3.0))
			pool.addItem('numismatics:spur', 50, [1, 4]).addFunction(func_loot_ench(0.0, 4.0))
			pool.addItem('caupona:soot', 110).addFunction(func_loot_ench(0.0, 4.0))
			pool.addItem('embers:ash', 120).addFunction(func_loot_ench(0.0, 4.0))
			pool.addItem('minecraft:bone', 145, [1, 2]).addFunction(func_loot_ench(0.0, 4.0))
			pool.addItem('dustrial_decor:rusty_iron_nugget', 130, [9, 12]).addFunction(func_loot_ench(0.0, 6.0))
		})
	})
})