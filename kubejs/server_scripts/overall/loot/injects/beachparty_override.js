let lt_bp = [
	'buried_treasure',
	'desert_pyramid',
	'shipwreck_supply',
	'shipwreck_treasure',
	'simple_dungeon',
	'underwater_ruin_big',
	'underwater_ruin_small',
	'woodland_mansion',
	'village/village_cartographer',
	'village/village_plains_house',
	'village/village_savanna_house'
];

ServerEvents.chestLootTables(event => {
	for (let i of lt_bp) {
		event.addChest('beachparty:' + i, table => {
			table.addPool(pool => {
				pool.rolls = 1;
				pool.addEntry(empty_json)
			})
		})
	}
})