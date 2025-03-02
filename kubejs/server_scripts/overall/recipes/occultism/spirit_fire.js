ServerEvents.recipes(event => {
	
	let occ_fire = (input, result, id) => {
	  event.recipes.occultism.spirit_fire({
		ingredient: Ingredient.of(input),
		result: Item.of(result)
	  }).id('occultism:spirit_fire/' + id)
	}

	occ_fire('#forge:ender_eyes', 'minecraft:ender_eye', 'eye_conversion')
})