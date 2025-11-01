ServerEvents.recipes(event => {

	let decompose = (ingredient, nutrients, time, results, id) => {
		event.recipes.biomancy.decomposing({
			ingredient: Ingredient.of(ingredient).toJson(),
			nutrientsCost: nutrients,
			processingTime: time,
			results: results.map(resultItem => ({
				countRange: {
					type: 'uniform',
					max: resultItem.max,
					min: resultItem.min
				},
				item: resultItem.item
			}))
		}).id('biomancy:decomposing/' + id)
	}
	
	decompose('alexscaves:immortal_embryo',
		2, 450, [
			{ item: 'biomancy:exotic_dust', max: 24, min: 13 },
			{ item: 'biomancy:bio_lumens', max: 36, min: 17 },
			{ item: 'biomancy:hormone_secretion', max: 15, min: 11 }
		], 'immortal_embryo')
})