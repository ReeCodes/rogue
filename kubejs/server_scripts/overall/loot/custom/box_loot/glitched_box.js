ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/glitched', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			//BOXES
			Ingredient.of(['/kubejs:.+_box/']).subtract(Ingredient.of([
				'kubejs:glitched_box'
			])).stacks.forEach(item => {
				pool.addItem(item, 1, [1, 2])
			})
		})
	})
})