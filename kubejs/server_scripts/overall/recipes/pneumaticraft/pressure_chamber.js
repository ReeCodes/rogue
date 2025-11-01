ServerEvents.recipes(event => {
	let pressurize = (inputs, pressureAmount, results, id) => {
		event.recipes.pneumaticcraft.pressure_chamber({
			inputs: inputs.map(i => {
				if (i.count) {
					return {
						type: 'pneumaticcraft:stacked_item',
						count: i.count,
						item: Item.of(i.item).id
					};
				} else {
					return {
						type: 'pneumaticcraft:stacked_item',
						count: 1,
						item: Item.of(i).id
					};
				}
			}),
			pressure: pressureAmount,
			results: results.map(i => {
				return Item.of(i).toJson()
			}),
		}).id('pneumaticcraft:pressure_chamber/' + id)
	}
	
	//GOBBER
	pressurize([
		'gobber2:gobber2_glob',
		'#forge:gems/diamond',
		'#forge:ingots/froststeel',
		'#forge:ingots/iesnium'
		], 3.5, [
		'3x #forge:ingots/gobber'
		], 'gobber')
		
	pressurize([
		'gobber2:gobber2_glob_nether',
		'#forge:ingots/fireite',
		'#blue_skies:ingots/horizonite',
		'#forge:ingots/utherium',
		'minecraft:netherite_scrap',
		{count: 2, item:'#forge:ingots/gobber'}
		], 4.0, [
		'3x #forge:ingots/gobber_nether'
		], 'gobber_nether')
		
	pressurize([
		'gobber2:gobber2_glob_end',
		'#forge:ingots/terrasteel',
		'#forge:ingots/forgotten_metal',
		'miniutilities:nether_star_opinium_core',
		{count: 2, item:'#forge:ingots/gobber_nether'}
		], 4.5, [
		'3x #forge:ingots/gobber_end'
		], 'gobber_end')
});