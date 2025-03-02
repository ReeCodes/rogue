ServerEvents.genericLootTables(event => {
	event.addGeneric('artifacts:artifact', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			Ingredient.of(['@artifacts']).subtract(Ingredient.of([
				'artifacts:mimic_spawn_egg',
				'artifacts:everlasting_beef',
				'artifacts:eternal_steak',
				'artifacts:helium_flamingo',
				'artifacts:whoopee_cushion',
				'artifacts:umbrella'
			])).stacks.forEach(s => {
				pool.addItem(s.id, 6)
			})
			pool.addItem('artifacts:umbrella', 5)
			pool.addItem('artifacts:whoopee_cushion', 5)
			pool.addItem('artifacts:helium_flamingo', 4)
			pool.addEntry({
				"type": "minecraft:loot_table",
				"name": "artifacts:items/drinking_hat",
				"weight": 4
			})
		})
	})
	event.addGeneric('artifacts:inject/entities/cow', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addEntry({
				"type": "empty"
			})
		})
	})
	event.addGeneric('artifacts:inject/entities/mooshroom', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addEntry({
				"type": "empty"
			})
		})
	})
})