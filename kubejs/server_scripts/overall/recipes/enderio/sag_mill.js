ServerEvents.recipes(event => {

	let eio_sag_mill = (energy, input, results, id) => {
		event.recipes.enderio.sag_milling({
			energy: energy,
			input: Ingredient.of(input).toJson(),
			outputs: results.map(i => {
				if (i.chance) {
					return {
						chance: i.chance,
						count: i.count || 1,
						item: Item.of(i.item).id
					};
				} else {
					return Item.of(i).toJson();
				}
			})
		}).id('enderio:sag_milling/' + id);
	}
	
	//CAPACITOR
	eio_sag_mill(2400, 'thermaloot:variable_capacitor', [
		'6x #forge:dusts/aluminum',
		'6x #forge:dusts/redstone',
		'12x #forge:dusts/copper',
		{count: 4, chance: 0.15, item: '#forge:dusts/redstone'}
	], 'thermaloot/crushed_capacitor')

	//ENDER-PEARLS
	eio_sag_mill(2400, '#forge:ender_pearls', ['9x #forge:dusts/ender_pearl'], 'ender_pearl')

	//OBSIDIAN
	eio_sag_mill(2400, '#forge:obsidian', ['4x #forge:dusts/obsidian'], 'obsidian')

	//REDSTONE-ORE
	eio_sag_mill(2400, '#forge:ores/redstone', [
		'8x #forge:dusts/redstone',
		{chance: 0.2, item: '#forge:dusts/redstone'},
		{chance: 0.8, item: '#forge:silicon'},
		{chance: 0.15, item: 'minecraft:cobblestone'}
	], 'redstone_ore')

	//CLAY
	eio_sag_mill(2400, 'minecraft:clay', [
		'8x minecraft:clay_ball',
		{chance: 0.1, item: 'minecraft:clay_ball'},
		{chance: 0.8, count: 2, item: '#forge:silicon'}
	], 'clay')
	
	//DD HEART	
	eio_sag_mill(2400, 'deeperdarker:heart_of_the_deep', [
		'2x minecraft:echo_shard',
		'deeperdarker:warden_carapace',
		{chance: 0.75, item: 'deeperdarker:soul_dust'},
		{chance: 0.2, item: 'minecraft:phantom_membrane'}
	], 'heart_of_the_deep')
	
	//ENIGMATIC ENGINE
	eio_sag_mill(4800, 'alexscaves:enigmatic_engine', [
		'#forge:gears/copper',
		{chance: 0.15, item: '#forge:gears/signalum'},
		'4x #forge:dusts/copper',
		'6x #forge:dusts/redstone'
	], 'enigmatic_engine')

	metalData.forEach(i => {
		if (i.dust_able && i.type == undefined) {
			//ORES-TO-DUST
			eio_sag_mill(2400, '#forge:ores/' + i.name, [
				'#forge:dusts/' + i.name,
				{chance: 0.33, item: '#forge:dusts/' + i.name},
				{chance: 0.15, item: 'minecraft:cobblestone'}
			], i.name + '_dust_from_ore')
			if (i.has_raw) {
				//RAW-TO-DUST
				eio_sag_mill(2400, '#forge:raw_materials/' + i.name, [
					'#forge:dusts/' + i.name,
					{chance: 0.05, item: '#forge:dusts/' + i.name}
				], i.name + '_dust_from_raw_materials')
			}
		}
		if (i.type == undefined || i.type == 'alloy') {
			eio_sag_mill(2400, '#forge:ingots/' + i.name, ['#forge:dusts/' + i.name], i.name + '_dust')
		}
	})
})