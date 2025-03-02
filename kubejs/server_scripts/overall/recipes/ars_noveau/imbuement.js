ServerEvents.recipes(event => {
	let an_imbuement = (amount, input, output, pedestalItems, sourceAmount, id) => {
		event.recipes.ars_nouveau.imbuement({
			count: amount,
			input: Item.of(input).toJson(),
			output: Item.of(output).id,
			pedestalItems: pedestalItems.map(i => ({
				item: {
					item: Item.of(i).id
				}
			})),
			source: sourceAmount
		}).id('ars_noveau:imbuement/' + id)
	}

	an_imbuement(1, '#forge:ingots/gold', '#forge:ingots/silver',
		['ars_nouveau:manipulation_essence', 'occultism:datura', 'occultism:spirit_attuned_gem'],
		2000, 'imbuement_silver_transmute')

	an_imbuement(1, '#forge:ingots/silver', '#forge:ingots/gold',
		['ars_nouveau:manipulation_essence', 'ars_nouveau:magebloom', 'occultism:spirit_attuned_gem'],
		2000, 'imbuement_gold_transmute')
})


//FIX HARDCODED RECIPES
ServerEvents.highPriorityData(event => {
	event.addJson('ars_ocultas:recipes/imbuement_gold_transmute.json', replace_json)
	event.addJson('ars_ocultas:recipes/imbuement_silver_transmute.json', replace_json)
})