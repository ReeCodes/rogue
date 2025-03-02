ServerEvents.recipes(event => {

	let c_pressing = (inputs, results, id) => {
		event.recipes.create.pressing({
			ingredients: inputs.map(i => Ingredient.of(i).toJson()),
			results: results.map(i => Item.of(i))
		}).id('create:pressing/' + id)
	}
	
	metalData.forEach(i => {
		if (i.plate_able) {
			c_pressing(['#forge:ingots/'+i.name], ['#forge:plates/'+i.name], i.name+'_ingot')
		}
	})
	
	//COIN PRESS RECIPE REPLACEMENT
	c_pressing(['#forge:nuggets/netherite'], ['createdeco:netherite_coin'], 'coins/netherite_coin')
})