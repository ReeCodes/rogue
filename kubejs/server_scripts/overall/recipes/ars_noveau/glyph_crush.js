
const glyph_crush = (event, input, output, id) => {
		event.recipes.ars_nouveau.crush({
			input: Ingredient.of(input).toJson(),
			output: output.map(i => {
				if (i.maxRange) {
					return {
						chance: i.chance || 1.0,
						count: i.count || 1,
						item: Item.of(i.item).id,
						maxRange: maxItems
					};
				} else {
					return {
						chance: i.chance || 1.0,
						count: i.count || 1,
						item: Item.of(i.item).id
					};
				};
			})
		}).id('ars_nouveau:crush_' + id)
}

ServerEvents.recipes(event => {
	glyph_crush(event, '#forge:ender_pearls', [
		{
			count: 1,
			item: '#forge:dusts/ender_pearl'
		}
	], 'ender_pearl')

	glyph_crush(event, '#forge:obsidian', [
		{
			count: 1,
			item: '#forge:dusts/obsidian'
		},
		{
			chance: 0.5,
			item: '#forge:dusts/obsidian'
		}
	], 'obsidian')
})