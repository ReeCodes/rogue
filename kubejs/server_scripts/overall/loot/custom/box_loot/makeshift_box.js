ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/makeshift', table => {
		table.addPool(pool => {
			pool.rolls = [1, 3];
			pool.addItem('embers:ash', 8)
			pool.addItem('caupona:soot', 7)
			pool.addItem('minecraft:name_tag', 5)
			pool.addItem('minecraft:rotten_flesh', 15, [1, 4])
			pool.addItem('farmersdelight:rope', 8, [4, 12])
			pool.addItem('dustrial_decor:rusty_iron_nugget', 13, [8, 32])
			pool.addItem('dustrial_decor:rusty_iron_ingot', 9, [3, 8])
			pool.addItem('forbidden_arcanus:rotten_leather', 7, [1, 4])
			pool.addItem('minecraft:string', 7, [1, 4])
			pool.addItem(Item.of('thirst:terracotta_water_bowl', '{Purity:3}'), 14, [1, 4])
			pool.addItem(Item.of('minecraft:potion', '{Potion:"minecraft:water",Purity:3}'), 14, [1, 4])
			pool.addEntry({
				"type": "minecraft:loot_table",
				"name": "rogue:chests/loot/stews",
				"weight": 11
			})
		})
	})
})