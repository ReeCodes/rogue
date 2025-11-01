let modifier_mods = [
	'@enigmaticlegacy'
];

let modifier_ids = [
	'cardiac:life_bottle',
	'enderio:common_loot',
	'pneumaticcraft:dungeon_loot'
];

let m_aether = [
	'gloves_loot_chain',
	'gloves_loot_diamond',
	'gloves_loot_gold',
	'gloves_loot_iron',
	'gloves_loot_leather',
	'gloves_loot_netherite'
];

let m_fa = [
	'abandoned_mineshaft_additions',
	'bat_additions',
	'simple_dungeon_additions',
	'abandoned_mineshaft',
	'spawner_additions'
];

let m_fd = [
	'add_loot_abandoned_mineshaft',
	'add_loot_bastion_hoglin_stable',
	'add_loot_bastion_treasure',
	'add_loot_end_city_treasure',
	'add_loot_pillager_outpost',
	'add_loot_ruined_portal',
	'add_loot_shipwreck_supply',
	'add_loot_simple_dungeon'
];

let m_sb = [
	'abandoned_mineshaft',
	'bastion_treasure',
	'desert_pyramid',
	'end_city_treasure',
	'nether_bridge',
	'shipwreck_treasure',
	'simple_dungeon',
	'woodland_mansion'
];

let m_ss = [
	'basic',
	'end',
	'nether'
];

LootJS.modifiers((event) => {
	
	//BY MOD
	for (let i of modifier_mods) {
		event.removeGlobalModifier(i);
	}
	
	//BY ID
	for (let i of modifier_ids) {
		event.removeGlobalModifier(i);
	}
	
	//SPECIFIC_IDS
	for (let i of m_aether) {
		event.removeGlobalModifier(`aether:${i}`);
	}
	for (let i of m_fa) {
		event.removeGlobalModifier(`forbidden_arcanus:${i}`)
	}
	for (let i of m_fd) {
		event.removeGlobalModifier(`farmersdelight:${i}`)
	}
	for (let i of m_sb) {
		event.removeGlobalModifier(`sophisticatedbackpacks:chests/${i}`)
	}
	for (let i of m_ss) {
		event.removeGlobalModifier(`superiorshields:${i}_loot`)
	}
});