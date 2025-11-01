ServerEvents.recipes(event => {
	
	const fusion_crafting = (inputs, catalyst, catalystCount, tier, energy, result, id) => {
		event.recipes.draconicevolution.fusion_crafting({
			catalyst: {
				type: 'draconicevolution:ingredient_stack',
				count: catalystCount,
				items: [Item.of(catalyst).toJson()]
			},
			ingredients: inputs.map(r => Item.of(r).toJson()),
			result: Item.of(result).toJson(),
			tier: tier,
			total_energy: energy
		}).id('draconicevolution:' + id)
	}

	fusion_crafting(
		[
			'gobber2:gobber2_block_nether',
			'buddycards:luminis_block',
			'#forge:storage_blocks/fireite',
			'draconicevolution:dragon_heart',
			'draconicevolution:draconium_core',
			'draconicevolution:draconium_core',
			'draconicevolution:draconium_core',
			'draconicevolution:draconium_core'
		],
		'#forge:storage_blocks/draconium',
		4,
		'WYVERN',
		50000000,
		'4x #forge:storage_blocks/draconium_awakened',
		'fusion_crafting/awakened_draconium_block'
	)
	
	fusion_crafting(
		[
			'#forge:plates/netherite',
			'#forge:plates/netherite',
			'draconicevolution:draconium_core',
			'draconicevolution:draconium_core',
			'#forge:storage_blocks/draconium',
			'#forge:storage_blocks/draconium',
			'thermal:machine_furnace',
			'thermal:machine_furnace',
			'#forge:workbenches',
			'#forge:workbenches'
		],
		'ironchests:netherite_chest',
		1,
		'WYVERN',
		2000000,
		'draconicevolution:draconium_chest',
		'machines/draconium_chest'
	)
})