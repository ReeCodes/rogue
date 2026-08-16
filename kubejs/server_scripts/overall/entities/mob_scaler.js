//priority: 50

function addModifiers(event, player, coef, maxCoef, entity, attName, attModifierName, attOperation) {
	
	let PLAYER_COEF = coef;
	let PLAYER_MAX_COEF = maxCoef;
	
	const tamed = isTamed(entity);
	const monster = entity.isMonster();
	const entityType = entity.getType();
	
	const isBossExcluded = BOSS_EXCLUDE.test(entityType);
	const isArmorExcluded = ARMOR_EXCLUDE.test(entityType);

	const hasExtraMelee = MELEE_DMG_EXTRA.test(entityType);
	const hasExtraRanged = RANGED_DMG_EXTRA.test(entityType);
	const hasExtraSpellPower = SPELL_POWER_EXTRA.test(entityType);
		
	if (entity.getAttributes().hasAttribute(attName)) {
		let BASE_VALUE = entity.getAttributes().getInstance(attName).getBaseValue();
		if (attModifierName == 'rogue:scaler') {
			if (attName == 'minecraft:generic.max_health') {
				
				let HEALTH_ADD_VALUE = 0;
				let isBoss = BASE_VALUE >= BOSS_MIN_HEALTH &&
					!isBossExcluded &&
					!tamed;	
				
				if (isBoss) {
					HEALTH_ADD_VALUE = Math.min(Math.pow(PLAYER_COEF, 0.66) * (PLAYER_COEF * 12), TOTAL_MOB_MAX_HEALTH);
				} else {
					HEALTH_ADD_VALUE = Math.min(12 * (Math.pow(PLAYER_COEF, 1.18) - 1), TOTAL_MOB_MAX_HEALTH);
				}
				
				HEALTH_ADD_VALUE += getExtraHealth(entity);
				assignAtt(entity, player, attName, HEALTH_ADD_VALUE, attModifierName, attOperation);
			}
			if (attName == 'minecraft:generic.movement_speed') {
			  const SPEED_ADD = Math.min(Math.max(((PLAYER_COEF - 1) / (PLAYER_MAX_COEF - 1)) * MAX_EXTRA_SPEED, 0), MAX_EXTRA_SPEED);
			  assignAtt(entity, player, attName, SPEED_ADD, attModifierName, attOperation);
			}
			if (!hasExtraMelee && attName == 'minecraft:generic.attack_damage') {
				const DAMAGE_MULTIPLIER = 1 / (1 + (BASE_VALUE - 1) / 40);
				const ATTACK_DMG_ADD = scaleAttribute(PLAYER_COEF, 1.05, PLAYER_MAX_COEF, 2, PLAYER_MAX_COEF * 2, DAMAGE_MULTIPLIER);
				assignAtt(entity, player, attName, ATTACK_DMG_ADD, attModifierName, attOperation);
			}
			if (attName == 'attributeslib:arrow_damage') {
				const ARROW_DMG_ADD = scaleAttribute(PLAYER_COEF, 0.72, PLAYER_MAX_COEF, 2);
				assignAtt(entity, player, attName, ARROW_DMG_ADD, attModifierName, attOperation);
			}
			if (!allBowEntities.test(entity.getType()) && attName == 'obscure_api:magic_damage') {
				const MAGIC_DMG_ADD = scaleAttribute(PLAYER_COEF, 0.63, PLAYER_MAX_COEF, 1);
				assignAtt(entity, player, attName, MAGIC_DMG_ADD, attModifierName, attOperation);
			}
			if (attName == 'forge:step_height_addition') {
				const STEP_HEIGHT_ADD = Math.max(0, Math.min((PLAYER_COEF - 1) / (BASE_MAX_COEF - 1) * 2, 2));
				if (STEP_HEIGHT_ADD < 0) STEP_HEIGHT_ADD = 0;
				assignAtt(entity, player, attName, STEP_HEIGHT_ADD, attModifierName, attOperation);
			}
			if (!tamed && monster && !isArmorExcluded) {
				if (attName == 'minecraft:generic.armor') {
					const RANDOM_ARMOR = Math.random() * 1.15;
					const ARMOR_ADD = scaleAttribute(PLAYER_COEF, 0.57, PLAYER_MAX_COEF, 2, PLAYER_MAX_COEF + 20, RANDOM_ARMOR);
					assignAtt(entity, player, attName, ARMOR_ADD, attModifierName, attOperation);
				}
				if (attName == 'minecraft:generic.armor_toughness') {
					const RANDOM_ARMOR_TOUGHNESS = Math.random() * 1.15;
					const ARMOR_TOUGHNESS_ADD = scaleAttribute(PLAYER_COEF, 0.35, PLAYER_MAX_COEF, 2, PLAYER_MAX_COEF + 20, RANDOM_ARMOR_TOUGHNESS);
					assignAtt(entity, player, attName, ARMOR_TOUGHNESS_ADD, attModifierName, attOperation);
				}
				if (attName == 'lodestone:magic_resistance') {
					const RANDOM_ARMOR_MAGIC = Math.random() * 1.25;
					const ARMOR_MAGIC_ADD = scaleAttribute(PLAYER_COEF, 0.55, PLAYER_MAX_COEF, 0, PLAYER_MAX_COEF + 20, RANDOM_ARMOR_MAGIC);
					assignAtt(entity, player, attName, ARMOR_MAGIC_ADD, attModifierName, attOperation);
				}
			}
			if (attName == 'attributeslib:armor_shred') {
				const ARMOR_SHRED_ADD = scaleProportionalAttribute(PLAYER_COEF, PLAYER_MAX_COEF, 0.98, 0.35);
				assignAtt(entity, player, attName, ARMOR_SHRED_ADD, attModifierName, attOperation);
			}
			if (!monster && tamed && attName == 'attributeslib:current_hp_damage') {
				const CHP_ADD = scaleProportionalAttribute(PLAYER_COEF, PLAYER_MAX_COEF, 1.1, 0.05);
				assignAtt(entity, player, attName, CHP_ADD, attModifierName, attOperation);
			}
			
			// EXTRA ENTITIES
			if (hasExtraMelee && attName == 'puffish_attributes:melee_damage') {
				const meleeDamageAdd = scaleAttribute(coef, 0.85, maxCoef, 0);
				assignAtt(entity, player, 'puffish_attributes:melee_damage', meleeDamageAdd, 'rogue:scaler', "addition");
			}
			if (hasExtraRanged && attName == 'puffish_attributes:ranged_damage') {
				const rangedDamageAdd = scaleAttribute(coef, 0.75, maxCoef, 0);
				assignAtt(entity, player, 'puffish_attributes:ranged_damage', rangedDamageAdd, 'rogue:scaler', "addition");
			}
			if (hasExtraSpellPower && attName == 'irons_spellbooks:spell_power') {
				const spellPowerAdd = scaleAttribute(coef, 0.75, maxCoef, 1);
				assignAtt(entity, player, 'irons_spellbooks:spell_power', spellPowerAdd, 'rogue:scaler', "addition");
			}
		}
	}
}

function assignAtt(entity, player, attName, attAddition, attModifierName, attOperation) {
	
	if (attOperation == "addition") {
		attAddition *= entity.isMonster() ? 1 : NON_HOSTILE_DEBUFF;
		if (!BLACKLIST_FLOOR.includes(attName)) {
			attAddition = Math.floor(attAddition);
		}
	}
	
    let transientModifier = new $AttributeModifier(attModifierName, attAddition, attOperation);
	let attributeInstance = entity.getAttributes().getInstance(attName);
	
	// REFRESH MODIFIER
	removeModifierByName(attributeInstance, attModifierName);
	
	// ADD MODIFIER
	attributeInstance.addPermanentModifier(transientModifier);
	if (attName === "minecraft:generic.max_health") {
		syncHealth(entity, player);
	}
}

EntityEvents.spawned(event => {
	const {	entity,	level } = event;
	
	if (level.clientSide) return;
	
	if (ENTITY_SCALE_BLACKLIST.test(entity.getType())) return;
	
	if (level.players.length == 0 || entity.isPlayer() || !entity.isAlive() || !entity.isLiving()) return;
	
	let coef, player, maxCoef;

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
			
			coef = calculateCoef(entity, nearbyPlayers, radius);
			player = closestPlayer;
			maxCoef = getMaxPlayerCoef(player);
			
		} else if (nearbyPlayers.length === 1) {
			
			player = nearbyPlayers[0];
			coef = getPlayerCoef(player);
			maxCoef = getMaxPlayerCoef(player);
			
		} else {
			return;
		}
	}
	
	if (mobScalingDebugger) {
		console.log(`[Server Mode: ${global.SERVER_MODE}] Selected Player: ${player.username}, COEF: ${coef}, Entity: ${entity.getType()}`);
	}
	
	/*
		Makes sure tamed mobs cannot be placed down while in Carry Mode to readjust their stats infinitely
	*/
	if (isTamedBy(entity, player).tamed && !AUTO_SYNC_TAMED.test(entity.getType())) return;
	
	NATURAL_ATTRIBUTES.forEach(attribute => {
		addModifiers(event, player, coef, maxCoef, entity, attribute, 'rogue:scaler', "addition");
	})
});

const SYNC_MESSAGE_TYPE = ['rats'];

ItemEvents.entityInteracted(event => {
	const { target, player, item, hand } = event;
	
	if (hand != 'MAIN_HAND' || item.id !== 'minecraft:air' || ENTITY_SCALE_BLACKLIST.test(target.getType()) || player.isCrouching()) return;
	
	let tamedInfo = isTamedBy(target, player);
	if (!tamedInfo.tamed) return;

	let coef = getPlayerCoef(player);
	let maxCoef = getMaxPlayerCoef(player);
		
	NATURAL_ATTRIBUTES.forEach(attribute => {
		addModifiers(event, player, coef, maxCoef, target, attribute, 'rogue:scaler', "addition");
	});
	
	let petCD = Math.ceil(getPetCooldown(target) / 20);
	let petPlayerCD = Math.round(getPlayerPetCD(player) * 100);
	
	if (!petCD) return;
	
	let syncSuccess = [
		Text.of('[Attribute Sync] ')
			.color('#f7e7ba')
			.append(Text.of(`All attributes synced!`).green())
		];
	
	let syncInfo = [
		Text.of('[Attribute Sync] ')
			.color('#f7e7ba')
			.append(Text.of(`Next sync available in ${petCD} seconds.`).red())
		];
		
	let petCDInfo = [
		Text.of(`Current Pet Cooldown Reduction: `)
			.color('#f7e7ba')
			.append(Text.of(`(-${petPlayerCD}%)`)
				.color(COLOR_ROGUE))
		];
	
	if (tamedInfo.hasOwner && !target.getType().includes(SYNC_MESSAGE_TYPE)) {
		
		if (petCD == PET_SYNC_COOLDOWN(player)) player.tell(syncSuccess);
		player.tell(syncInfo);
		if (petPlayerCD != 0) player.tell(petCDInfo);
		
	} else if (tamedInfo.hasOwnerUUID || tamedInfo.isTrustedByPlayer || target.getType().includes(SYNC_MESSAGE_TYPE)) {
		
		if (petCD == PET_SYNC_COOLDOWN(player)) player.tell(syncSuccess);
		player.setStatusMessage(syncInfo);
		if (petPlayerCD != 0) player.tell(petCDInfo);
	}
});

LevelEvents.tick(event => {
    const { level, server } = event;
	
    if (level.clientSide) return;
    if (server.tickCount % 20 !== 0) return;

    for (let entity of level.entities) {
        if (!isTamed(entity)) continue;
        let petData = getPetData(entity);
        if (petData && petData.sync_health_cooldown > 0) {
            petData.sync_health_cooldown = Math.max(0, petData.sync_health_cooldown - 20);
        }
    }
});