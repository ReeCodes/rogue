const aa_compressing = (event, duration, energy, input, result, id) => {
	event.recipes.ad_astra.compressing({
		cookingtime: duration,
		energy: energy,
		ingredient: Ingredient.of(input).toJson(),
		result: {
			id: Item.of(result.id).id,
			count: result.count || 1
		}
	}).id('ad_astra:compressing/' + id)
}