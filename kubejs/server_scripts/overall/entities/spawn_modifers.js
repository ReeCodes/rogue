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

EntityEvents.spawned(event => {
	const { entity, level } = event;
	if (level.clientSide || level.players.length === 0) return;
	
	if (!allBowEntities.test(entity.getType())) return;
	if (entity.getItemBySlot($EquipmentSlot.MAINHAND).id !== 'minecraft:bow') return;
	if (!entity.getItemBySlot($EquipmentSlot.OFFHAND).isEmpty()) return;
			
		let player, coef, maxCoef;
	
		if (level.players.length === 1) {
			
			player = level.players[0];
			coef = getPlayerCoef(player);
			maxCoef = getMaxPlayerCoef(player);
			
		} else if (level.players.length > 1) {
			
			let followRange = getFollowRange(entity);
			let radius = Math.floor(followRange + 16);
			let dynamicSearchRange = getDynamicSearchRange(level.players.length);
			let nearbyPlayers = findNearbyPlayersCloseToEntity(level, entity, radius, dynamicSearchRange, true);
			
			if (nearbyPlayers.length > 1) {
				
				let closestPlayer = getClosestInRange(entity, nearbyPlayers, radius);
				if (!closestPlayer) closestPlayer = nearbyPlayers[0];
				
				player = closestPlayer;
				coef = calculateCoef(entity, nearbyPlayers, radius);
				maxCoef = getMaxPlayerCoef(closestPlayer);
				
			}  else if (nearbyPlayers.length === 1) {
				
				player = nearbyPlayers[0];
				coef = getPlayerCoef(player);
				maxCoef = getMaxPlayerCoef(player);
				
			} else {
				return;
			}
		}
		
		let chanceForArrow = MIN_SPECIAL_ARROW_CHANCE + (coef - 1) * ((MAX_SPECIAL_ARROW_CHANCE - MIN_SPECIAL_ARROW_CHANCE) / (maxCoef - 1));

		if (Math.random() < chanceForArrow) {
			let arrowPool = [
				() => $PotionUtils.setPotion(Item.of('minecraft:tipped_arrow'), randomize(effectsByPotion)),
				() => $PotionUtils.setCustomEffects(Item.of('minecraft:tipped_arrow'), [new $MobEffectInstance(randomize(effectsById), 100, 0)]),
				() => randomize(specialArrows)
			];
			let selectedArrow = randomize(arrowPool)();
			entity.setItemSlot($EquipmentSlot.OFFHAND, selectedArrow);
		}
})