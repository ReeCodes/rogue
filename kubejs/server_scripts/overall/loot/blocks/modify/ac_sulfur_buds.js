let sulfur_drops = [
	{id: 'alexscaves:sulfur_cluster', maxCount: 5, minCount: 2}, 
	{id: 'alexscaves:sulfur_bud_large'}, 
	{id: 'alexscaves:sulfur_bud_medium'}, 
	{id: 'alexscaves:sulfur_bud_small'},
	{id: 'alexscaves:sulfur'}
	];

ServerEvents.blockLootTables(event => {
	for (let s of sulfur_drops) {
		event.addBlock(s.id, table => {
			table.addPool(pool => {
				pool.rolls = 1;
				pool.addEntry({
					"type": "minecraft:alternatives",
					"children": [{
							"type": "minecraft:item",
							"conditions": [{
								"condition": "minecraft:match_tool",
								"predicate": {
									"enchantments": [{
										"enchantment": "minecraft:silk_touch",
										"levels": {
											"min": 1
										}
									}]
								}
							}],
							"name": s.id
						},
						{
							"type": "minecraft:tag",
							"functions": [{
									"add": false,
									"count": {
										"type": "minecraft:uniform",
										"max": s.maxCount | 1,
										"min": s.minCount | 0
									},
									"function": "minecraft:set_count"
								},
								{
									"enchantment": "minecraft:fortune",
									"formula": "minecraft:uniform_bonus_count",
									"function": "minecraft:apply_bonus",
									"parameters": {
										"bonusMultiplier": 1
									}
								},
								{
									"function": "minecraft:limit_count",
									"limit": {
										"max": 5.0,
										"min": 1.0
									}
								},
								{
									"function": "minecraft:explosion_decay"
								}
							],
							"expand": true,
							"name": 'forge:dusts/sulfur'
						}
					]
				})
			})
		})
	}
})