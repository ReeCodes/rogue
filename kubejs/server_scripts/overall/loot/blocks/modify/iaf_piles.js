const pile_drops = [
	{ block: 'iceandfire:silver_pile', item: 'thermal:silver_nugget' },
	{ block: 'iceandfire:copper_pile', item: 'thermal:copper_nugget' }
];

ServerEvents.blockLootTables(event => {
	for (let p of pile_drops) {
		event.addBlock(p.block, table => {
			table.addPool(pool => {
				pool.rolls = 1;
				for (let layer = 1; layer <= 8; layer++) {
					pool.addEntry({
						"type": "minecraft:item",
						"conditions": [{
							"condition": "minecraft:block_state_property",
							"block": p.block,
							"properties": {
								"layers": layer
							}
						}],
						"functions": [{
							"function": "minecraft:set_count",
							"count": layer * 2
						}],
						"name": p.item
					});
				}
			});
		});
	}
});