ServerEvents.recipes(event => {
	let an_apparatus = (keepNbt, output, pedestalItems, reagentItems, source, id) => {
		event.recipes.ars_nouveau.enchanting_apparatus({
			keepNbtOfReagent: keepNbt,
			output: { 
				item: Item.of(output).id 
			},
			pedestalItems: pedestalItems.map(i => (
				i.startsWith('#') ? Ingredient.of(i) : { item: Item.of(i).id }
			)),
			reagent: reagentItems.map(i => (
				i.startsWith('#') ? Ingredient.of(i) : { item: Item.of(i).id }
			)),
			sourceCost: source
		}).id('ars_nouveau:enchanting_apparatus/' + id)
	}
	
	let an_enchanting = (enchantment, lvl, pedestalItems, source, id) => {
		event.recipes.ars_nouveau.enchantment({
			enchantment: enchantment,
			level: lvl,
			pedestalItems: pedestalItems.map(i => (
				i.startsWith('#') 
					? { item: Ingredient.of(i) } 
					: { item: Item.of(i) }
			)),
			sourceCost: source
		}).id('ars_nouveau:' + id)
	}

	an_apparatus(true, 'ars_nouveau:archmage_spell_book', [
			'aether_redux:gravitite_ingot',
			'minecraft:totem_of_undying',
			'voidscape:voidic_crystal',
			'minecraft:nether_star',
			'#forge:ingots/terrasteel',
			'ars_nouveau:wilden_tribute'
		],
		['ars_nouveau:apprentice_spell_book'], 16000, 'archmage_spell_book')
		
		an_apparatus(true, 'ars_nouveau:archmage_spell_book', [
			'aether_redux:gravitite_ingot',
			'voidscape:voidic_crystal',
			'#forge:ingots/terrasteel',
			'ars_instrumentum:fake_wilden_tribute'
		],
		['ars_nouveau:apprentice_spell_book'], 16000, 'archmage_spell_book_alternate')
		
	an_apparatus(false, 'miniutilities:angel_ring', [
			'deep_aether:stratus_ingot',
			'deep_aether:stratus_ingot',
			'#forge:ingots/gold',
			'#forge:ingots/gold',
			'#forge:ingots/gold',
			'#forge:ingots/gold',
			'miniutilities:unstable_ingot',
			'miniutilities:unstable_ingot'
		],
		['miniutilities:gold_opinium_core'], 20000, 'angel_ring')
		
	an_apparatus(false, 'tiab:time_in_a_bottle', [
			'ars_nouveau:manipulation_essence',
			'#forge:gears/gold',
			'minecraft:ender_eye',
			'occultism:spirit_attuned_gem',
			'ars_nouveau:magebloom_fiber',
			'minecraft:clock'
		],
		['quark:bottled_cloud'], 8000, 'tiab')
		
	an_enchanting('ensorcellation:soulbound', 1, [
			'minecraft:totem_of_undying',
			'#forge:storage_blocks/source_gem',
			'deeperdarker:soul_dust',
			'ars_elemental:anima_essence'
		], 10000, 'soulbound_1')
})