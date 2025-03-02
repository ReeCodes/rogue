ServerEvents.recipes(event => {

	let aa_compressing = (duration, energy, input, result, id) => {
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
	
	metalData.forEach(i => {
		if (i.plate_able) {
			aa_compressing(100, 20, '#forge:ingots/'+i.name, {id: '#forge:plates/'+i.name}, i.name+'_plate_from_compressing_'+i.name+'_ingots')
			aa_compressing(800, 20, '#forge:storage_blocks/'+i.name, {id: '#forge:plates/'+i.name, count: 9}, i.name+'_plate_from_compressing_'+i.name+'_blocks')
		}
	})
})
