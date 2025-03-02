ServerEvents.recipes(event => {

	let rolling = (input, result, id) => {
		event.recipes.createaddition.rolling({
			input: Ingredient.of(input).toJson(),
			result: Item.of(result).toJson()
		}).id('createaddition:rolling/' + id)
	}

	rolling('#forge:ingots/iron', '2x #forge:rods/iron', 'iron_ingot')
	rolling('#forge:ingots/steel', '2x #forge:rods/steel', 'steel_ingot')

	rolling('#forge:plates/copper', '2x #forge:wires/copper', 'copper_plate')
	rolling('#forge:plates/electrum', '2x #forge:wires/electrum', 'electrum_plate')
})