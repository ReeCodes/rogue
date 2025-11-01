const pulverize = (event, input, results, xp, id) => {
		event.recipes.thermal.pulverizer({
			ingredient: Ingredient.of(input).toJson(),
			result: results.map(i => {
				if (i.chance) {
					return {
						chance: i.chance,
						item: Item.of(i.item).id
					};
				} else if (i.count) {
					return {
						count: i.count,
						item: Item.of(i.item).id
					};
				} else {
					return Item.of(i).toJson();
				}
			}),
			experience: xp
		}).id('thermal:machines/pulverizer/pulverizer_' + id)
	}

ServerEvents.recipes(event => {
	
	// SPECIAL
	pulverize(event, 'thermaloot:variable_capacitor', [
		{chance: 6.15, item: '#forge:dusts/copper'},
		{chance: 6.15, item: '#forge:dusts/aluminum'},
		{chance: 12.15, item: '#forge:dusts/redstone'}
	], 2.5, 'crushed_capacitor')

	pulverize(event, '#forge:ender_pearls', [
		'#forge:dusts/ender_pearl'
	], 0.2, 'ender_pearl')
	
	pulverize(event, 'galosphere:pink_salt_shard', [
		{count: 8, item: '#forge:dusts/salt'},
		{chance: 1.5, item: '#forge:dusts/salt'}
	], 0.5, 'pink_salt')
	
	pulverize(event, 'thermal:basalz_rod', [
		{chance: 3.0, item: 'thermal:basalz_powder'},
		{chance: 0.25, item: '#forge:slag'}
	], 0.5, 'basalz_rod')
	
	pulverize(event, 'deeperdarker:heart_of_the_deep', [
		{count: 2, item: 'minecraft:echo_shard'},
		'deeperdarker:warden_carapace',
		{chance: 0.75, item: 'deeperdarker:soul_dust'},
		{chance: 0.2, item: 'minecraft:phantom_membrane'}
	], 0.7, 'heart_of_the_deep')
	
	pulverize(event, 'alexscaves:enigmatic_engine', [
		'#forge:gears/copper',
		{chance: 1.15, item: '#forge:gears/signalum'},
		{chance: 4.15, item: '#forge:dusts/copper'},
		{chance: 6.15, item: '#forge:dusts/redstone'}
	], 4.5, 'enigmatic_engine')
	
	pulverize(event, 'quark:diamond_heart', [
		{count: 4, item: '#forge:gems/diamond'},
		'#forge:dusts/diamond',
		{chance: 1.15, item: '#forge:gems/diamond'},
		{chance: 1.15, item: '#forge:dusts/diamond'}
	], 4.5, 'diamond_heart')
})