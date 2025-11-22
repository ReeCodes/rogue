ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/makeshift', table => {
		table.addPool(pool => {
			pool.rolls = [1, 3];
			pool.addItem('minecraft:name_tag', 7)
			pool.addItem('minecraft:rotten_flesh', 15, [1, 4])
			pool.addItem('farmersdelight:rope', 8, [4, 12])
			pool.addItem('dustrial_decor:rusty_iron_nugget', 13, [8, 32])
			pool.addItem('dustrial_decor:rusty_iron_ingot', 9, [3, 8])
			pool.addItem('forbidden_arcanus:rotten_leather', 7, [1, 4])
			pool.addItem('minecraft:string', 7, [1, 4])
			pool.addItem(Item.of('thirst:terracotta_water_bowl', '{Purity:3}'), 14, [1, 4])
			pool.addItem(Item.of('minecraft:potion', '{Potion:"minecraft:water",Purity:3}'), 14, [2, 6])
			pool.addItem(Item.of('minecraft:potion', '{Potion:"irons_rpg_tweaks:drowsy"}'), 12, [1, 2])
			pool.addEntry({
				"type": "minecraft:loot_table",
				"name": "rogue:chests/loot/stews",
				"weight": 11
			})
			pool.addEntry({
				"type": "apotheosis:random_affix_item",
				"quality": 5,
				"min_rarity": "common",
				"max_rarity": "rare",
				"weight": 5
			})
			.addFunction(func_ench(5, 15, true)).addFunction(func_set_dmg(0.3, 0.8))
			.addFunction({
			  "function": "supplementaries:curse_loot",
			  "chance": 1.0
			})
		})
	})
})