ServerEvents.blockLootTables(event => {
		event.addBlock('miniutilities:ender_ore', table => {
			table.addPool(pool => {
				pool.rolls = 1;
				pool.addEntry({
					"type": "minecraft:alternatives",
					"children": [{
							"type": "minecraft:tag",
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
							"expand": true,
							"name": 'forge:ores/ender'
						},
						{
							"type": "minecraft:tag",
							"functions": [{
									"add": false,
									"count": {
										"type": "minecraft:uniform",
										"max": 2,
										"min": 1
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
										"max": 3.0,
										"min": 1.0
									}
								},
								{
									"function": "minecraft:explosion_decay"
								}
							],
							"expand": true,
							"name": 'forge:dusts/ender'
						}
					]
				})
			})
		})
})