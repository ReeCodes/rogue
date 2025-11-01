const rolling = (event, input, result, id) => {
	event.recipes.createaddition.rolling({
		input: Ingredient.of(input).toJson(),
		result: Item.of(result).toJson()
	}).id('createaddition:rolling/' + id)
}