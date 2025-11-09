ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/rustic', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('caupona:silphium', 16, [3, 12])
			Ingredient.of([
				'minecraft:carrot',
				'minecraft:beetroot',
				'minecraft:potato',
				'hauntedharvest:corn',
				'farmersdelight:cabbage',
				'farmersdelight:onion',
				'farmersdelight:pumpkin_slice',
				'farmersdelight:cabbage_leaf',
				'farmersdelight:tomato',
				'caupona:fig',
				'caupona:wolfberries',
				'caupona:walnut'
			]).stacks.forEach(item => {
				pool.addItem(item, 3, [4, 16])
			})
		})
		table.addPool(pool => {
			pool.rolls = 3;
			Ingredient.of([
			'/caupona:.+aspic/'
			]).stacks.forEach(item => {
				pool.addItem(item, 1, [1, 2])
			})
			
			pool.addItem('salt:salt', 18, [2, 8])
			pool.addItem('reliquary:fertile_potion', 15, [1, 2])
			pool.addItem('overweight_farming:melon_juice', 18, [2, 8])
			pool.addItem('caupona:vivid_charcoal', 18, [4, 16])
			pool.addItem('caupona:lateres', 20, [8, 20])
			pool.addItem('caupona:pumice_bloom', 18, [2, 8])
			pool.addItem('caupona:brick_tesserae', 16, [4, 12])
			pool.addItem('caupona:basalt_tesserae', 16, [4, 12])
			pool.addItem('caupona:pumice_tesserae', 16, [4, 12])
		})
	})
})