ServerEvents.recipes(event => {
	const an_imbuement = (amount, input, output, pedestalItems, sourceAmount, id) => {
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
		}).id(id)
	}

	an_imbuement(1, '#forge:ingots/gold', '#forge:ingots/silver',
		['ars_nouveau:manipulation_essence', 'occultism:datura', 'occultism:spirit_attuned_gem'],
		2000, 'ars_ocultas:imbuement_silver_transmute')

	an_imbuement(1, '#forge:ingots/silver', '#forge:ingots/gold',
		['ars_nouveau:manipulation_essence', 'ars_nouveau:magebloom', 'occultism:spirit_attuned_gem'],
		2000, 'ars_ocultas:imbuement_gold_transmute')
})