let effectsByPotion = [
	'minecraft:weakness',
	'eidolon:vulnerable',
	'undergarden:featherweight',
	'undergarden:brittleness'
];

let effectsById = [
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
	'cataclysm:void_scatter_arrow',
	'archeryexp:gold_arrow', 
	'archeryexp:iron_arrow', 
	'archeryexp:diamond_arrow', 
	'archeryexp:netherite_arrow'
];

const MIN_SPECIAL_ARROW_CHANCE = 0.02;
const MAX_SPECIAL_ARROW_CHANCE = 0.63;

EntityEvents.spawned(event => {
	const { entity, level } = event;
	if (level.clientSide || level.players.length === 0) return;
	
	if (allBowEntities.test(entity.type) && 
		entity.getItemBySlot($EquipmentSlot.MAINHAND) === 'minecraft:bow' && 
		entity.getItemBySlot($EquipmentSlot.OFFHAND) === 'air') {
		
		let coef;
		let maxCoef;
		let player;
		
		let followRange = getFollowRange(entity);
		let radius = Math.floor(followRange + 8);
		
		if (level.players.length === 1) {
			player = level.players[0];
			coef = getPlayerCoef(player);
			maxCoef = getMaxPlayerCoef(player);
		} else if (level.players.length > 1) {
			let nearbyPlayers = findNearbyPlayersCloseToEntity(level, entity, radius, maxPlayerSearchRange, true);
			if (nearbyPlayers.length > 1) {
				let closestPlayer = getClosestPlayer(entity, nearbyPlayers, radius);
				if (!closestPlayer) nearbyPlayers[0];
				coef = calculateCoef(entity, nearbyPlayers, radius);
				maxCoef = getMaxPlayerCoef(closestPlayer);
			} else {
				player = nearbyPlayers[0];
				coef = getPlayerCoef(player);
				maxCoef = getMaxPlayerCoef(player);
			}
		}
		
		let chanceForArrow = MIN_SPECIAL_ARROW_CHANCE + (coef - 1) * ((MAX_SPECIAL_ARROW_CHANCE - MIN_SPECIAL_ARROW_CHANCE) / (maxCoef - 1));
		
		if (Math.random() < chanceForArrow) {
			
			let selectedEffectByPotion = randomize(effectsByPotion);
			let selectArrowFromPotion = $PotionUtils.setPotion(Item.of('minecraft:tipped_arrow'), selectedEffectByPotion);
			
			let selectedEffectById = randomize(effectsById);
			let selectArrowFromPotionId = $PotionUtils.setCustomEffects(Item.of('minecraft:tipped_arrow'), [new $MobEffectInstance(selectedEffectById, 100, 0)]);
			
			let selectSpecialArrow = randomize(specialArrows);
			
			let arrowFormula = [
				selectArrowFromPotion, 
				selectArrowFromPotionId, 
				selectSpecialArrow
				];
			
			let selectedArrow = randomize(arrowFormula);
			entity.setItemSlot($EquipmentSlot.OFFHAND, selectedArrow);
		}
	}
})