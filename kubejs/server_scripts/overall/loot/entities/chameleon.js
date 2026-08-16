if (Platform.isLoaded('primitivemobs')) {
	ServerEvents.entityLootTables(event => {
		event.modifyEntity('cold_sweat:chameleon', table => {
			table.addPool(pool => {
				pool.rolls = 1;
				pool.addItem('primitivemobs:camouflage_dye', 1, [0, 1]).addFunction(func_loot_ench(0.0, 1.0));
			})
		})
	})
}