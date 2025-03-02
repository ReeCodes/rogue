ServerEvents.recipes(event => {
	let fusion_crafting = (type, inputs, catalyst, catalystCount, tier, energy, result, id) => {
		event.recipes.draconicevolution.fusion_crafting({
			type: type,
			catalyst: {
				type: 'draconicevolution:ingredient_stack',
				count: catalystCount,
				items: [Item.of(catalyst).toJson()]
			},
			ingredients: inputs.map(r => Item.of(r).toJson()),
			result: Item.of(result).toJson(),
			tier: tier,
			total_energy: energy
		}).id('draconicevolution:fusion_crafting/' + id)
	}

	fusion_crafting(
		'draconicevolution:fusion_crafting',
		[
			'gobber2:gobber2_block_nether',
			'#forge:storage_blocks/fireite',
			'#forge:storage_blocks/fireite',
			'draconicevolution:dragon_heart',
			'draconicevolution:draconium_core',
			'draconicevolution:draconium_core',
			'draconicevolution:draconium_core'
		],
		'#forge:storage_blocks/draconium',
		4,
		'WYVERN',
		50000000,
		'4x #forge:storage_blocks/draconium_awakened',
		'awakened_draconium_block'
	)
})