ServerEvents.recipes(event => {
	let glyph_crush = (input, output, id) => {
		event.recipes.ars_nouveau.crush({
			input: Item.of(input).toJson(),
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

	metalData.forEach(i => {
		if (i.dust_able && i.type == undefined) {
			//ORES-TO-DUST
			glyph_crush('#forge:ores/' + i.name, [{
				count: 2,
				item: '#forge:dusts/' + i.name,
				maxItems: 2
			}], i.name + '_dust')
			if (i.has_raw) {
				//RAW-TO-DUST
				glyph_crush('#forge:raw_materials/' + i.name, [{
					item: '#forge:dusts/' + i.name
				},
				{
					chance: 0.67,
					item: '#forge:dusts/' + i.name
				}], i.name + '_dust_from_raw')
			}
		}
		if (i.type == 'gem') {
			if (i.dust_able) {
				//GEMS-TO-DUST
				glyph_crush('#forge:gems/' + i.name, [{
					count: 1,
					item: '#forge:dusts/' + i.name,
					maxItems: 1
				}], i.name + '_to_dust')
			}
			//ORES-TO-GEMS
			glyph_crush('#forge:ores/' + i.name, [{
				count: 2,
				item: '#forge:gems/' + i.name,
				maxItems: 2
			}], i.name + '_to_gem')
		}
		if (i.type == 'abundant_gem') {
			if (i.dust_able) {
				//GEMS-TO-DUST
				glyph_crush('#forge:gems/' + i.name, [{
					count: 1,
					item: '#forge:dusts/' + i.name,
					maxItems: 1
				}], i.name + '_to_dust')

			}
			//ORES-TO-GEMS
			glyph_crush('#forge:ores/' + i.name, [{
				count: 6,
				item: '#forge:gems/' + i.name,
				maxItems: 6
			}], i.name + '_to_gem')
		}
		if (i.dust_able && i.type == 'coals') {
			glyph_crush('#forge:ores/' + i.name, [{
				count: 4,
				item: '#minecraft:coals/' + i.name,
				maxItems: 4
			}], i.name)
		}
		if (i.type == 'dusts') {
			glyph_crush('#forge:ores/' + i.name, [{
				count: 6,
				item: '#forge:dusts/' + i.name,
				maxItems: 6
			}], i.name)
		}
	})

	glyph_crush('#forge:ender_pearls', [{
		count: 1,
		item: '#forge:dusts/ender_pearl'
	}], 'ender_pearl')

	glyph_crush('#forge:obsidian', [{
			count: 1,
			item: '#forge:dusts/obsidian'
		},
		{
			chance: 0.5,
			item: '#forge:dusts/obsidian'
		}
	], 'obsidian')
})