function removeById(event, ids) {
	for (const id of ids) {
		event.removeGlobalModifier(id);
	}
}

function removeByMod(event, mod, ids) {
	for (const id of ids) {
		event.removeGlobalModifier(`${mod}:${id}`);
	}
}

LootJS.modifiers(event => {
	const mods = {
		removeByMod: [
		'@enigmaticlegacy', 
		'@cardiac',
		'@galosphere',
		'@feywild'		
		],

		removeById: [
			'enderio:common_loot',
			'pneumaticcraft:dungeon_loot'
		],

		aether: [
			'gloves_loot_chain',
			'gloves_loot_gold',
			'gloves_loot_leather',
			'gloves_loot_netherite'
		],

		forbidden_arcanus: [
			'abandoned_mineshaft_additions',
			'bat_additions',
			'simple_dungeon_additions',
			'abandoned_mineshaft',
			'spawner_additions'
		],

		farmersdelight: [
			'add_loot_abandoned_mineshaft',
			'add_loot_bastion_hoglin_stable',
			'add_loot_bastion_treasure',
			'add_loot_end_city_treasure',
			'add_loot_pillager_outpost',
			'add_loot_ruined_portal',
			'add_loot_shipwreck_supply',
			'add_loot_simple_dungeon'
		],

		sophisticatedbackpacks: [
			'chests/abandoned_mineshaft',
			'chests/bastion_treasure',
			'chests/desert_pyramid',
			'chests/end_city_treasure',
			'chests/nether_bridge',
			'chests/shipwreck_treasure',
			'chests/simple_dungeon',
			'chests/woodland_mansion'
		],

		superiorshields: [
			'basic_loot',
			'nether_loot'
		],

		evilcraft: [
			'inject_condensed_blood_chests',
			'inject_origins_of_darkness_chests',
			'inject_box_of_eternal_closure_chests',
			'inject_broom'
		]
	};

	for (const mod of mods.removeByMod) event.removeGlobalModifier(mod);
	removeById(event, mods.removeById);

	removeByMod(event, 'aether', mods.aether);
	removeByMod(event, 'forbidden_arcanus', mods.forbidden_arcanus);
	removeByMod(event, 'farmersdelight', mods.farmersdelight);
	removeByMod(event, 'sophisticatedbackpacks', mods.sophisticatedbackpacks);
	removeByMod(event, 'superiorshields', mods.superiorshields);
	removeByMod(event, 'evilcraft', mods.evilcraft);
});