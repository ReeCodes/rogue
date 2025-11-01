ServerEvents.recipes(event => {

	const create_pressing = (inputs, results, id) => {
		event.recipes.create.pressing({
			ingredients: inputs.map(i => Ingredient.of(i).toJson()),
			results: results.map(i => Item.of(i))
		}).id('create:pressing/' + id)
	}
	
	oreData.forEach(i => {
		if (i.plate_able) {
			if (!i.type) {
				create_pressing(['#forge:ingots/'+i.name], ['#forge:plates/'+i.name], i.name+'_ingot');
			}
		}
	})
})