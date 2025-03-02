ServerEvents.recipes(event => {

	let ie_pressing = (energy, input, count, moldShape, result, id) => {
		event.recipes.immersiveengineering.metal_press({
			energy: energy,
			input: {
				base_ingredient: Ingredient.of(input).toJson(),
				count: count
			},
			mold: moldShape,
			result: Ingredient.of(result).toJson()
		}).id('immersiveengineering:metal_press/'+id)
	}
	
	let missingGears = ['compressed_iron', 'prismalium', 'melodium', 'stellarium', 'netherite', 'signalum', 'lumium', 'enderium'];
	missingGears.forEach(g => {
		ie_pressing(2400, '#forge:ingots/'+g, 4, 'immersiveengineering:mold_gear', '#forge:gears/'+g, 'gear_'+g)
	})
})