let lt_botania = [
	'abandoned_mineshaft',
	'desert_pyramid',
	'jungle_temple',
	'simple_dungeon',
	'spawn_bonus_chest',
	'stronghold_corridor',
	'village_chest'
];

ServerEvents.genericLootTables(event => {
	for (let i of lt_botania) {
		event.addGeneric('botania:inject/' + i, table => {
			table.addPool(pool => {
				pool.rolls = 1;
				pool.addEntry(empty_json)
			})
		})
	}
})