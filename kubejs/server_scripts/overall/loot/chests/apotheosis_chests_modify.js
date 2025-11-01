let lt_apo = [
	'chest_valuable',
	'spawner_brutal',
	'spawner_brutal_rotate',
	'spawner_swarm',
	'tome_tower'
];

ServerEvents.chestLootTables(event => {
	for (let i of lt_apo) {
		event.modify('apotheosis:' + i, table => {
			table.addPool(pool => {
				pool.rolls = 2;
				pool.addEntry({
					"type": "minecraft:loot_table",
					"name": "rogue:chests/loot/rarities",
					"weight": 1
				})
			})
		})
	}
})