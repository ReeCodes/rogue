let lt_tetra = [
	'nether_bridge_extended',
	'simple_dungeon_extended'
];

ServerEvents.chestLootTables(event => {
	for (let i of lt_tetra) {
		event.addChest('tetra:' + i, table => {
			if (['nether_bridge_extended'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"function": "tetra:scroll",
						"key": "hone/gild_1",
						"intricate": true,
						"material": 2,
						"ribbon": "c9ae69",
						"glyphs": [
							15,
							14,
							15,
							15
						],
						"schematics": [
							"tetra:hone/gild_1"
						]
					})
					pool.addEmpty(5)
				})
			}
			if (['simple_dungeon_extended'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:group",
						"conditions": [{
							"condition": "minecraft:random_chance",
							"chance": 0.06
						}],
						"children": [{
								"type": "minecraft:item",
								"name": "tetra:scroll_rolled",
								"functions": [{
									"function": "tetra:scroll",
									"key": "sword/sturdy_guard",
									"intricate": false,
									"material": 1,
									"ribbon": "bcb8b5",
									"glyphs": [
										3,
										2,
										2,
										1
									],
									"schematics": [
										"tetra:sword/sturdy_guard"
									]
								}]
							},
							{
								"type": "minecraft:item",
								"name": "tetra:scroll_rolled",
								"functions": [{
									"function": "tetra:scroll",
									"key": "sword/throwing_knife",
									"intricate": false,
									"material": 1,
									"ribbon": "b8ced9",
									"glyphs": [
										4,
										1,
										0,
										5
									],
									"schematics": [
										"tetra:sword/throwing_knife"
									]
								}]
							},
							{
								"type": "minecraft:item",
								"name": "tetra:scroll_rolled",
								"functions": [{
									"function": "tetra:scroll",
									"key": "sword/howling",
									"intricate": false,
									"material": 1,
									"ribbon": "faf396",
									"glyphs": [
										8,
										9,
										10,
										5
									],
									"schematics": [
										"tetra:sword/howling"
									]
								}]
							}
						]
					})
				})
			}
		})
	}
})

ServerEvents.genericLootTables(event => {
	event.addGeneric('artifacts:bastion_scrolls', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addEmpty(8)
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/adze",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "8559b3",
					"glyphs": [
						6,
						7,
						11,
						7
					],
					"schematics": [
						"tetra:warforge/adze"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/axe",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "b35973",
					"glyphs": [
						5,
						10,
						8,
						9
					],
					"schematics": [
						"tetra:warforge/axe"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/hammer",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "3d4299",
					"glyphs": [
						9,
						8,
						11,
						10
					],
					"schematics": [
						"tetra:warforge/hammer"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/pickaxe",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "508cb3",
					"glyphs": [
						6,
						11,
						8,
						7
					],
					"schematics": [
						"tetra:warforge/pickaxe"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/claw",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "1d262f",
					"glyphs": [
						8,
						10,
						5,
						11
					],
					"schematics": [
						"tetra:warforge/claw"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/hoe",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "93b350",
					"glyphs": [
						10,
						7,
						9,
						5
					],
					"schematics": [
						"tetra:warforge/hoe"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/sickle",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "d99e4c",
					"glyphs": [
						5,
						9,
						6,
						10
					],
					"schematics": [
						"tetra:warforge/sickle"
					]
				}]
			})
			pool.addEntry({
				"type": "minecraft:item",
				"name": "tetra:scroll_rolled",
				"functions": [{
					"function": "tetra:scroll",
					"key": "warforge/butt",
					"details": "warforge",
					"intricate": false,
					"material": 2,
					"ribbon": "b33636",
					"glyphs": [
						11,
						5,
						8,
						9
					],
					"schematics": [
						"tetra:warforge/butt"
					]
				}]
			})
		})
	})
})