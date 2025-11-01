ServerEvents.recipes(event => {

	const create_crushing = (inputs, time, results, id) => {
		event.recipes.create.crushing({
			ingredients: inputs.map(i => Ingredient.of(i).toJson()),
			processingTime: time,
			results: results.map(i => {
            if (i.chance) {
					return {
						count: i.count || 1,
						chance: i.chance,
						item: Item.of(i.item).id
					};
				} else {
					return Item.of(i).toJson();
				}
			})
		}).id('create:crushing/' + id)
	}
	
	create_crushing(['thermaloot:variable_capacitor'], 300, [
		'6x #forge:dusts/copper',
		'6x #forge:dusts/aluminum',
		'12x #forge:dusts/redstone',
		{count: 2, chance: 0.15, item: '#forge:dusts/copper'},
		{count: 2, chance: 0.15, item: '#forge:dusts/aluminum'},
		{count: 4, chance: 0.15, item: '#forge:dusts/redstone'}
	], 'thermaloot/crushed_capacitor')
	
	create_crushing(['#forge:gems/diamond'], 300, [
		'#forge:dusts/diamond'
	], 'diamond')
	
	create_crushing(['create:veridium'], 250, [
		{chance: 0.8, item: 'create:crushed_raw_copper'}, 
		{chance: 0.8, item: '#forge:nuggets/copper'}
	], 'veridium')
	
	create_crushing(['#create:stone_types/veridium'], 250, [
		{chance: 0.8, item: 'create:crushed_raw_copper'}, 
		{chance: 0.8, item: '#forge:nuggets/copper'}
	], 'veridium_recycling')
	
	create_crushing(['create:ochrum'], 250, [
		{chance: 0.2, item: 'create:crushed_raw_gold'}, 
		{chance: 0.2, item: '#forge:nuggets/gold'}
	], 'ochrum')
	
	create_crushing(['#create:stone_types/ochrum'], 250, [
		{chance: 0.2, item: 'create:crushed_raw_gold'}, 
		{chance: 0.2, item: '#forge:nuggets/gold'}
	], 'ochrum_recycling')
	
	create_crushing(['minecraft:tuff'], 350, [
		{chance: 0.25, item: 'minecraft:flint'}, 
		{chance: 0.1, item: '#forge:nuggets/gold'}, 
		{chance: 0.1, item: '#forge:nuggets/copper'}, 
		{chance: 0.1, item: '#forge:nuggets/zinc'}, 
		{chance: 0.1, item: '#forge:nuggets/iron'}, 
		{chance: 0.1, item: '#forge:nuggets/electrum'}
	], 'tuff')
	
	create_crushing(['#create:stone_types/tuff'], 350, [
		{chance: 0.25, item: 'minecraft:flint'}, 
		{chance: 0.1, item: '#forge:nuggets/gold'}, 
		{chance: 0.1, item: '#forge:nuggets/copper'}, 
		{chance: 0.1, item: '#forge:nuggets/zinc'}, 
		{chance: 0.1, item: '#forge:nuggets/iron'}, 
		{chance: 0.1, item: '#forge:nuggets/electrum'}
	], 'tuff_recycling')
	
	create_crushing(['galosphere:pink_salt_shard'], 150, [
		'8x #forge:dusts/salt', 
		{chance: 0.5, item: '#forge:dusts/salt'},
		{chance: 0.5, item: '#forge:dusts/salt'}, 
		{chance: 0.1, item: '#forge:dusts/salt'}
	], 'pink_salt')
	
	create_crushing(['deeperdarker:heart_of_the_deep'], 200, [
		'2x minecraft:echo_shard', 
		'deeperdarker:warden_carapace',
		{chance: 0.75, item: 'deeperdarker:soul_dust'},
		{chance: 0.2, item: 'minecraft:phantom_membrane'}, 
		{chance: 0.1, item: 'minecraft:echo_shard'}
	], 'heart_of_the_deep')
	
	create_crushing(['alexscaves:enigmatic_engine'], 200, [
		'#forge:gears/copper', 
		{chance: 0.15, item: '#forge:gears/signalum'},
		'4x #forge:dusts/copper',
		{count: 4, chance: 0.15, item: '#forge:dusts/copper'},
		'4x #forge:dusts/redstone',
		{count: 4, chance: 0.15, item: '#forge:dusts/redstone'}
	], 'enigmatic_engine')
	
	create_crushing(['quark:diamond_heart'], 200, [
		'6x #forge:gems/diamond', 
		'2x #forge:dusts/diamond',
		{count: 2, chance: 0.15, item: '#forge:gems/diamond'},
		{count: 2, chance: 0.15, item: '#forge:dusts/diamond'},
	], 'diamond_heart')
})