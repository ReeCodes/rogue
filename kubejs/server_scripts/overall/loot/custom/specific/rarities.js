//priority: 200
ServerEvents.chestLootTables(event => {
	event.addChest('rogue:loot/rarities', table => {
		table.addPool(pool => {
			pool.rolls = 2;
			pool.addItem('apotheosis:prismatic_web', 19)
			pool.addItem('ars_nouveau:warp_scroll', 16)
			pool.addItem('waystones:warp_scroll', 18)
			pool.addItem('grimoireofgaia:diamond_shard', 22, [1, 9])
			pool.addItem('grimoireofgaia:emerald_shard', 20, [1, 9])
			pool.addItem('botania:black_lotus', 5)
			pool.addItem('botania:mana_bottle', 4)
			pool.addItem('botania:overgrowth_seed', 5)
			pool.addItem('enigmaticlegacy:recall_potion', 8)
			pool.addItem('enigmaticlegacy:enchantment_transposer', 3)
			pool.addItem('enigmaticlegacy:extradimensional_eye', 2)
			pool.addItem('enigmaticlegacy:mending_mixture', 2)
			pool.addItem('kubejs:gluttonous_chest', 2)
			pool.addItem('kubejs:enlightened_petal', 8)
			pool.addItem('cardiac:life_bottle', 20, [1, 2])
			pool.addItem('experienceobelisk:mending_neurogel_blob', 10, [0, 2])
			pool.addEntry({
				"type": "minecraft:item",
				"weight": 3,
				"functions": [{
					"function": "minecraft:set_damage",
					"damage": {
						"min": 0.15,
						"max": 0.45
					}
				}],
				"name": 'kubejs:dust_size_down'
			})
			pool.addEntry({
				"type": "minecraft:item",
				"weight": 3,
				"functions": [{
					"function": "minecraft:set_damage",
					"damage": {
						"min": 0.15,
						"max": 0.45
					}
				}],
				"name": 'kubejs:dust_size_up'
			})
			pool.addEntry({
				"type": "minecraft:item",
				"weight": 4,
				"functions": [{
					"function": "minecraft:set_damage",
					"damage": {
						"min": 0.05,
						"max": 0.15
					}
				}],
				"name": 'botania:spell_cloth'
			})
		})
	})
})