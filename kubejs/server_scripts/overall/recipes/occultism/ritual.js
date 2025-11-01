ServerEvents.recipes(event => {
	
	//SATCHEL
	event.recipes.occultism.ritual(
		'occultism:satchel',
		[
			'minecraft:string',
			'eidolon:wicked_weave',
			'eidolon:wicked_weave',
			'irons_spellbooks:arcane_ingot',
			'#forge:chests/wooden'
		],
		'occultism:book_of_binding_bound_foliot',
		'occultism:craft_foliot'
	).duration(240).dummy('occultism:ritual_dummy/craft_satchel').id('occultism:ritual/craft_satchel')
	
	//MINERS
	event.recipes.occultism.ritual(
		'occultism:miner_foliot_unspecialized',
		[
			'occultism:magic_lamp_empty',
			'occultism:iesnium_pickaxe',
			'#forge:raw_materials',
			'immersiveengineering:drillhead_iron'
		],
		'occultism:book_of_binding_bound_foliot',
		'occultism:craft_foliot'
	).duration(60).dummy('occultism:ritual_dummy/craft_miner_foliot_unspecialized').id('occultism:ritual/craft_miner_foliot_unspecialized')
	
	event.recipes.occultism.ritual(
		'occultism:miner_djinni_ores',
		[
			'occultism:miner_foliot_unspecialized',
			'occultism:iesnium_pickaxe',
			'#forge:storage_blocks/raw_materials',
			'immersiveengineering:drillhead_steel',
			'occultism:spirit_attuned_crystal'
		],
		'occultism:book_of_binding_bound_djinni',
		'occultism:craft_djinni'
	).duration(60).dummy('occultism:ritual_dummy/craft_miner_djinni_ores').id('occultism:ritual/craft_miner_djinni_ores')
	
	event.recipes.occultism.ritual(
		'occultism:miner_afrit_deeps',
		[
			'occultism:miner_djinni_ores',
			'occultism:iesnium_pickaxe',
			'deeperdarker:reinforced_echo_shard',
			'occultism:spirit_attuned_crystal',
			'occultism:afrit_essence',
			'#forge:gems/amethyst'
		],
		'occultism:book_of_binding_bound_afrit',
		'occultism:craft_afrit'
	).duration(120).dummy('occultism:ritual_dummy/craft_miner_afrit_deeps').id('occultism:ritual/craft_miner_afrit_deeps')
	
})