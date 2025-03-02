ServerEvents.chestLootTables(event => {
	event.addChest('rogue:loot/rarities', table => {
		table.addPool(pool => {
			pool.rolls = 2;
			pool.addItem('galosphere:glow_flare', 18, [1, 4])
			pool.addItem('galosphere:silver_bomb', 20, [2, 4])
			pool.addItem('apotheosis:prismatic_web', 9)
			pool.addItem('ars_nouveau:warp_scroll', 6)
			pool.addItem('waystones:warp_scroll', 15)
			pool.addItem('grimoireofgaia:diamond_shard', 12, [1, 9])
			pool.addItem('grimoireofgaia:emerald_shard', 10, [1, 9])
			pool.addItem('irons_rpg_tweaks:identification_scroll', 9, [1, 2])
			pool.addItem('botania:black_lotus', 6)
			pool.addItem('botania:mana_bottle', 4)
			pool.addItem('botania:overgrowth_seed', 5)
			pool.addItem('kubejs:torn_pocket', 1)
			pool.addItem('beachparty:overgrown_disc', 1)
			pool.addItem('enigmaticlegacy:recall_potion', 8)
			pool.addItem('enigmaticlegacy:enchantment_transposer', 3)
			pool.addItem('enigmaticlegacy:extradimensional_eye', 2)
			pool.addItem('enigmaticlegacy:mending_mixture', 2)
			pool.addItem('cardiac:life_bottle', 8, [1, 6])
			pool.addItem('kubejs:gluttonous_chest', 1)
			pool.addItem('kubejs:enlightened_petal', 1)
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