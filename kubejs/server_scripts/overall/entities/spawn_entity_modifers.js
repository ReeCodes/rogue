let tippedArrows = [
	'minecraft:weakness',
	'eidolon:vulnerable',
	'undergarden:featherweight',
	'undergarden:brittleness'
];

let idTippedArrows = [
	'irons_spellbooks:rend',
	'irons_spellbooks:blight',
	'attributeslib:grievous',
	'attributeslib:sundering',
	'twilightdelight:temporal_sadness',
	'alexscaves:bubbled',
	'alexscaves:irradiated',
	'botania:bloodthirst',
	'relics:anti_heal',
	'relics:bleeding',
	'relics:confusion',
	'goety:wane',
	'goety:burn_hex',
	'goety:sapped',
	'goety:busted',
	'goety:pressure',
	'goety:sun_allergy',
	'goety:tripping',
	'goety:arrowmantic',
	'goety:plunge',
	'cataclysm:bone_fracture',
	'convivium:radication',
	'convivium:plummet',
	'neapolitan:slipping'
];

let specialArrows = [
	'archers_paradox:quartz_arrow',
	'archers_paradox:diamond_arrow',
	'archers_paradox:prismarine_arrow',
	'archers_paradox:slime_arrow',
	'archers_paradox:ender_arrow',
	'archers_paradox:phantasmal_arrow',
	'archers_paradox:shulker_arrow',
	'archers_paradox:blaze_arrow',
	'archers_paradox:frost_arrow',
	'archers_paradox:lightning_arrow',
	'archers_paradox:verdant_arrow',
	'archers_paradox:spore_arrow',
	'minecraft:spectral_arrow',
	'cloudstorage:balloon_arrow',
	'alexscaves:seeking_arrow',
	'apotheosis:broadhead_arrow',
	'forbidden_arcanus:draco_arcanus_arrow',
	'apotheosis:obsidian_arrow',
	'cataclysm:void_scatter_arrow'
];

const MIN_SPECIAL_ARROW_CHANCE = 0.02;
const MAX_SPECIAL_ARROW_CHANCE = 0.35;

EntityEvents.spawned(event => {
	const {entity, server} = event;
	
	if (allBowEntities.test(entity.type)) {
		if (entity.nbt?.HandItems[0]?.id != 'minecraft:bow' && entity.nbt?.HandItems[1]?.id == {}) return;
		server.players.forEach(player => {
			let player_coef = getPlayerCoef(player);
			let maxChanceValue = MIN_SPECIAL_ARROW_CHANCE + (player_coef - 1) * ((MAX_SPECIAL_ARROW_CHANCE - MIN_SPECIAL_ARROW_CHANCE) / 19);
			if (Math.random() < maxChanceValue) {
				let randomTippedArrow = randomize(tippedArrows);
				let randomIdTippedArrow = randomize(idTippedArrows);
				let arrowFormula = [
					`${randomize(specialArrows)}`,
					Item.of('minecraft:tipped_arrow', `{Potion:"${randomTippedArrow}"}`),
					Item.of('minecraft:tipped_arrow', `{CustomPotionEffects:[{Duration:400,"forge:id":"${randomIdTippedArrow}"}]}`)
				];
				let selectedArrow = randomize(arrowFormula);
				entity.setOffHandItem(selectedArrow)
			}
		})
	}
})