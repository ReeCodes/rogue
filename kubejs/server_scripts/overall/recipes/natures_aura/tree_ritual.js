ServerEvents.recipes(event => {
	const na_tree_ritual = (inputs, sapling, result, time, id) => {
		event.recipes.naturesaura.tree_ritual({
			ingredients: inputs.map(i => {
				if (i.nbt) {
					return {
						type: 'forge:nbt',
						item: Item.of(i.item).id,
						count: i.count || 1,
						nbt: Item.of(i.nbt).id
					};
				} else {
					return Item.of(i).toJson();
				}
			}),
			sapling: Item.of(sapling).toJson(),
			output: Ingredient.of(result).toJson(),
			time: time
		}).id('naturesaura:tree_ritual/' + id)
	}

	na_tree_ritual([
			'botania:world_seed',
			'botania:vine_ball',
			'botania:keep_ivy',
			'reliquary:fertile_essence',
			'eidolon:warped_sprouts',
			'botania:overgrowth_seed'
		], 'minecraft:jungle_sapling',
		'enigmaticlegacy:infinimeal', 2000, 'infinimeal')

	na_tree_ritual([
			'botania:golden_seeds',
			'reliquary:fertile_essence',
			'botania:lime_petal_block',
			'naturesaura:gold_leaf',
			'#forge:ingots/steeleaf',
			'dungeonnowloading:great_experience_bottle'
		], 'quark:ancient_sapling',
		'kubejs:enlightened_petal', 4000, 'enlightened_petal')
});