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

let validSkeletons = [
	'minecraft:skeleton',
	'variantsandventures:verdant',
	'variantsandventures:murk',
	'goety:mossy_skeleton_servant',
	'goety:skeleton_servant',
	'goety:sunken_skeleton_servant',
	'tinyskeletons:baby_skeleton'
];

EntityEvents.spawned(event => {
	const {entity, server} = event
	if (/.*creeperoverhaul.*/.test(entity.type)) return;
	if (validSkeletons.includes(entity.type) || (/specialmobs:.*(skeleton.*|skeleton$|zombie$)/.test(entity.type))) {
		if (entity.nbt?.HandItems[0]?.id != 'minecraft:bow' && entity.nbt?.HandItems[1]?.id == null) return;
		server.players.forEach(player => {
			var coefPlayer = player.persistentData?.coef ?? 1;
			var minChance = 0.03;
			var maxChance = 0.45;
			var maxChanceValue = minChance + (coefPlayer - 1) * ((maxChance - minChance) / 19);
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