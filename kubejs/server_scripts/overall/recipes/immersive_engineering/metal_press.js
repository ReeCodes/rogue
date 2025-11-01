const ie_metal_pressing = (event, energy, input, count, moldShape, result, id) => {
	event.recipes.immersiveengineering.metal_press({
		energy: energy,
		input: {
			base_ingredient: Ingredient.of(input).toJson(),
			count: count
		},
		mold: moldShape,
		result: Item.of(result).toJson()
	}).id('immersiveengineering:metal_press/'+id)
}