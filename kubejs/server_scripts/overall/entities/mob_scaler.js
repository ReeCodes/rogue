//priority: 50

const ENTITY_SCALE_BLACKLIST = new RegExp([
	'dummmmmmy:target_dummy', 
	'luggage:ender_luggage', 
	'luggage:luggage', 
	'forbidden_arcanus:lost_soul', 
	'evilcraft:vengeance_spirit',
	'minecraft:armor_stand'
].join("|"));

const ATT_EXCLUDE_ARMOR = new RegExp([
	'alshanex.*'
].join("|"));

const AUTO_SYNC_TAMED = new RegExp([
	'species:spectre'
].join("|"));

function getPetData(entity) {
	if (!entity.persistentData) entity.persistentData = {}
	if (!entity.persistentData.PetData) {
		entity.persistentData.PetData = { sync_health_cooldown: 0 }
	}
	return entity.persistentData.PetData;
}

function getPetCooldown(entity) {
	return getPetData(entity).sync_health_cooldown ?? 0;
}

function setPetCooldown(entity, seconds) {
    let ticks = Math.max(0, seconds) * 20;
    getPetData(entity).sync_health_cooldown = ticks;
}

function syncHealth(entity, player) {
	if (!isTamedBy(entity, player).tamed) {
		entity.setHealth(entity.maxHealth);
		return;
	}
	
	if (getPetCooldown(entity) <= 0) {
		entity.setHealth(entity.maxHealth);
		setPetCooldown(entity, PET_SYNC_COOLDOWN(player));
	}
}

function attDebug(entity, attName) {
	let att = entity.nbt?.Attributes?.find(att => (
		att.Name == attName
	));
	if (att) Utils.server.tell(Text.of(entity.type+': ').red().append(Text.of(att).green()));
}

function removeModifierByName(attributeInstance, modifierName) {
	for (let modifier of attributeInstance.getModifiers()) {
		if (modifier.getName() === modifierName) {
			attributeInstance.removePermanentModifier(modifier.getId());
			return true;
		}
	}
	return false;
}

function scaleAttribute(coef, exponent, defaultMax, subtract, customMax, randomMultiplier) {
    randomMultiplier = randomMultiplier || 1;
    let value = Math.pow(coef, exponent) * 2;
    value *= randomMultiplier;
    const cap = (customMax !== undefined) ? customMax : (defaultMax * 2);
    const clamped = Math.min(value, cap);
    return Math.max(0, clamped - subtract);
}

function scaleNormalizedAttribute(coef, maxCoef, exponent, clampMax, subtract) {
	subtract = subtract || 0;
    const value = Math.pow(coef, exponent) / Math.pow(maxCoef, exponent);
    const clamped = Math.min(value, clampMax);
    return Math.max(0, clamped - subtract);
}

const MAX_SPEED = 0.085;

function addModifiers(event, player, coef, entity, attName, attModifierName, attOperation) {
	
	const PLAYER_COEF = coef;
	const PLAYER_MAX_COEF = getMaxPlayerCoef(player);
		
	if (entity.getAttributes().hasAttribute(attName)) {
		let BASE_VALUE = entity.getAttributes().getInstance(attName).getBaseValue();
		if (attModifierName == 'rogue:scaler') {
			if (attName == 'minecraft:generic.max_health') {
				let BOSS_MIN_HEALTH = 200;
				let BASIC_ADD = 15 * (Math.pow(PLAYER_COEF, 1.18) - 1);
				let BOSS_ADD = Math.min(Math.pow(PLAYER_COEF, 0.66) * (PLAYER_COEF * 15), 8000);
				let HEALTH_ADD_VALUE = 0;
				
				if (BASE_VALUE >= BOSS_MIN_HEALTH) {
					HEALTH_ADD_VALUE = BOSS_ADD;
				} else {
					HEALTH_ADD_VALUE = BASIC_ADD;
				}
				assignAtt(entity, player, attName, HEALTH_ADD_VALUE, attModifierName, attOperation);
			}
			if (attName == 'minecraft:generic.movement_speed') {
			  const SPEED_ADD = Math.min(Math.max(((PLAYER_COEF - 1) / (PLAYER_MAX_COEF - 1)) * MAX_SPEED, 0), MAX_SPEED);
			  assignAtt(entity, player, attName, SPEED_ADD, attModifierName, attOperation);
			}
			if (attName == 'minecraft:generic.attack_damage') {
				const DAMAGE_MULTIPLIER = 1 / (1 + (BASE_VALUE - 1) / 40);
				const ATTACK_DMG_ADD = scaleAttribute(PLAYER_COEF, 1.05, PLAYER_MAX_COEF, 2, PLAYER_MAX_COEF * 2, DAMAGE_MULTIPLIER);
				assignAtt(entity, player, attName, ATTACK_DMG_ADD, attModifierName, attOperation);
			}
			if (attName == 'attributeslib:arrow_damage') {
				const ARROW_DMG_ADD = scaleAttribute(PLAYER_COEF, 0.57, PLAYER_MAX_COEF, 2);
				assignAtt(entity, player, attName, ARROW_DMG_ADD, attModifierName, attOperation);
			}
			if (!allBowEntities.test(entity.type) && attName == 'obscure_api:magic_damage') {
				const MAGIC_DMG_ADD = scaleAttribute(PLAYER_COEF, 0.53, PLAYER_MAX_COEF, 1);
				assignAtt(entity, player, attName, MAGIC_DMG_ADD, attModifierName, attOperation);
			}
			if (attName == 'forge:step_height_addition') {
				const STEP_HEIGHT_ADD = Math.min((PLAYER_COEF - 1) / (BASE_MAX_COEF - 1) * 2, 2);
				if (STEP_HEIGHT_ADD < 0) STEP_HEIGHT_ADD = 0;
				assignAtt(entity, player, attName, STEP_HEIGHT_ADD, attModifierName, attOperation);
			}
			if (!isTamed(entity) && entity.isMonster() && !ATT_EXCLUDE_ARMOR.test(entity.type)) {
				if (attName == 'minecraft:generic.armor') {
					const RANDOM_ARMOR = Math.random() * 1.35;
					const ARMOR_ADD = scaleAttribute(PLAYER_COEF, 0.87, PLAYER_MAX_COEF, 2, PLAYER_MAX_COEF + 20, RANDOM_ARMOR);
					assignAtt(entity, player, attName, ARMOR_ADD, attModifierName, attOperation);
				}
				if (attName == 'minecraft:generic.armor_toughness') {
					const RANDOM_ARMOR_TOUGHNESS = Math.random() * 1.25;
					const ARMOR_TOUGHNESS_ADD = scaleAttribute(PLAYER_COEF, 0.65, PLAYER_MAX_COEF, 2, PLAYER_MAX_COEF + 20, RANDOM_ARMOR_TOUGHNESS);
					assignAtt(entity, player, attName, ARMOR_TOUGHNESS_ADD, attModifierName, attOperation);
				}
				if (attName == 'lodestone:magic_resistance') {
					const RANDOM_ARMOR_MAGIC = Math.random() * 1.25;
					const ARMOR_MAGIC_ADD = scaleAttribute(PLAYER_COEF, 0.55, PLAYER_MAX_COEF, 0, PLAYER_MAX_COEF + 20, RANDOM_ARMOR_MAGIC);
					assignAtt(entity, player, attName, ARMOR_MAGIC_ADD, attModifierName, attOperation);
				}
			}
			if (attName == 'attributeslib:armor_shred') {
				const ARMOR_SHRED_ADD = scaleNormalizedAttribute(PLAYER_COEF, PLAYER_MAX_COEF, 0.4, 0.75);
				assignAtt(entity, player, attName, ARMOR_SHRED_ADD, attModifierName, attOperation);
			}
			if (!entity.isMonster() && attName == 'attributeslib:current_hp_damage') {
				const CHP_ADD = scaleNormalizedAttribute(PLAYER_COEF, PLAYER_MAX_COEF, 0.2, 0.075);
				assignAtt(entity, player, attName, CHP_ADD, attModifierName, attOperation);
			}
		}
	}
}

function assignAtt(entity, player, attName, attAddition, attModifierName, attOperation) {
	
	const BLACKLIST_FLOOR = ["minecraft:generic.movement_speed", "attributeslib:armor_shred", "attributeslib:current_hp_damage"];
	
	if (attOperation == "addition") {
		let debuff = entity.isMonster() ? 1 : NON_HOSTILE_DEBUFF;
		attAddition = attAddition * debuff;
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

const NATURAL_ATTRIBUTES = [
	'minecraft:generic.max_health',
	'minecraft:generic.movement_speed',
	'minecraft:generic.attack_damage',
	'attributeslib:arrow_damage',
	'obscure_api:magic_damage',
	'forge:step_height_addition',
	'minecraft:generic.armor',
	'minecraft:generic.armor_toughness',
	'lodestone:magic_resistance',
	'attributeslib:armor_shred',
	'attributeslib:current_hp_damage'
];

EntityEvents.spawned(event => {
	const {	entity,	level } = event;
	if (level.clientSide || level.players.length == 0 || ENTITY_SCALE_BLACKLIST.test(entity.type) || entity.isPlayer() || !entity.isAlive() || !entity.isLiving()) return;

	let coef;
	let player;
		
	if (level.players.length === 1) {
		player = level.players[0];
		coef = getPlayerCoef(player);
	} else if (level.players.length > 1) {
		let followRange = getFollowRange(entity);
		let radius = Math.floor(followRange + 16);
		let nearbyPlayers = findNearbyPlayersCloseToEntity(level, entity, radius, maxPlayerSearchRange, true);
		if (nearbyPlayers.length > 1) {
			let closestPlayer = getClosestPlayer(entity, nearbyPlayers, radius);
			if (!closestPlayer) nearbyPlayers[0];
			coef = calculateCoef(entity, nearbyPlayers, radius);
			player = closestPlayer;
		} else {
			player = nearbyPlayers[0];
			coef = getPlayerCoef(player);
		}
	}
	if (DEBUG_MODE_MS) console.log(`[Scaling / ${SERVER_MODE}] Selected Player: ${player.username}, Coef: ${coef}, Entity: ${entity.type}, Distance to Entity: ${player.distanceToEntitySqr(entity)}`);
	if (isTamedBy(entity, player).tamed && !AUTO_SYNC_TAMED.test(entity.type)) return;
	NATURAL_ATTRIBUTES.forEach(attribute => {
		addModifiers(event, player, coef, entity, attribute, 'rogue:scaler', "addition");
	})
});

ItemEvents.entityInteracted(event => {
	const {	target,	player, item, hand } = event;
	if (!isTamedBy(target, player).tamed || hand != 'MAIN_HAND' || item.id !== 'minecraft:air') return;
	let coef = getPlayerCoef(player);
	NATURAL_ATTRIBUTES.forEach(attribute => {
		addModifiers(event, player, coef, target, attribute, 'rogue:scaler', "addition");
	})
});

const SYNC_MESSAGE_TYPE = ['rats'];

// COOLDOWN TOOLTIP
ItemEvents.entityInteracted(event => {
	const { target, player, item, hand } = event;
	
	if (!isTamedBy(target, player).tamed || hand != 'MAIN_HAND' || item.id !== 'minecraft:air') return;
	
	let petCD = Math.ceil(getPetCooldown(target) / 20);
	let petPlayerCD = Math.round(getPlayerPetCD(player) * 100);
	
	if (!petCD) return;
		
		let syncSuccess = [
			Text.of('[Attribute Sync] ').color('#f7e7ba')
				.append(Text.of(`All attributes synced!`).green())
			];
		
		let syncInfo = [
			Text.of('[Attribute Sync] ').color('#f7e7ba')
				.append(Text.of(`Next sync available in ${petCD} seconds.`).red())
			];
			
		let petCDInfo = [
			Text.of(`(Current Pet Cooldown: `).color('#f7e7ba')
				.append(Text.of(`(-${petPlayerCD}%)`).color(COLOR_ROGUE))
			];

		if (isTamedBy(target, player).hasOwner && !target.type.includes(SYNC_MESSAGE_TYPE)) {
			if (petCD == PET_SYNC_COOLDOWN(player)) player.tell(syncSuccess);
			player.tell(syncInfo);
			if (petPlayerCD != 0) player.tell(petCDInfo);
		} else if (isTamedBy(target, player).hasOwnerUUID || isTamedBy(target, player).isTrustedByPlayer || target.type.includes(SYNC_MESSAGE_TYPE)) {
			if (petCD == PET_SYNC_COOLDOWN(player)) player.tell(syncSuccess);
			player.setStatusMessage(syncInfo);
			if (petPlayerCD != 0) player.tell(petCDInfo);
		}
})

//COOLDOWN DECREMENT
LevelEvents.tick(event => {
    const { level } = event;
    if (level.clientSide) return;

    for (let entity of level.entities) {
        if (!isTamed(entity)) continue;

        let petData = getPetData(entity);
        if (petData && petData.sync_health_cooldown > 0) {
            petData.sync_health_cooldown -= 1;
            if (petData.sync_health_cooldown < 0) petData.sync_health_cooldown = 0;
        }
    }
});
