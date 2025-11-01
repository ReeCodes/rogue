ServerEvents.recipes(event => {
	const crystallize = (inputs, result, id) => {
		event.recipes.thermal.crystallizer({
			ingredient: inputs.map(i => {
				if (i.fluid) {
					return {
						fluid: i.fluid,
						amount: i.amount || 1000
					};
				} else {
					return Ingredient.of(i).toJson();
				}
			}),
			result: Item.of(result).toJson()
		}).id('thermal:crystallizer/crystallizer_' + id)
	}

	crystallize([
		{
			fluid: 'minecraft:water'
		},
		'#forge:dusts/uranium'
	], 'alexscaves:uranium', 'uranium_crystal')
})