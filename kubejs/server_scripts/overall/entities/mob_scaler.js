const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier");

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

function setPetCooldown(entity, value) {
    getPetData(entity).sync_health_cooldown = value;
}

function decrementPetCooldown(entity) {
    let petData = getPetData(entity);
    if (petData.sync_health_cooldown > 0) {
        petData.sync_health_cooldown--;
    }
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

function addModifiers(event, player, entity, attName, attModifierName, attOperation) {

	if (ENTITY_SCALE_BLACKLIST.test(entity.type)) return;
	if (entity.isPlayer() || !entity.isAlive() || !entity.isLiving()) return;
	
	const PLAYER_COEF = getPlayerCoef(player);
	const PLAYER_MAX_COEF = getMaxPlayerCoef(player);
		
	if (entity.getAttributes().hasAttribute(attName)) {
		let BASE_VALUE = entity.getAttributes().getInstance(attName).getBaseValue();
		if (attModifierName == 'rogue:scaler') {
			if (attName == 'minecraft:generic.max_health') {
				let BOSS_MIN_HEALTH = 200;
				let BASIC_ADD = 20 * (Math.pow(PLAYER_COEF, 1.18) - 1);
				let BOSS_ADD = Math.min(Math.pow(PLAYER_COEF, 0.66) * (PLAYER_COEF * 15), 4500);
				let HEALTH_ADD_VALUE = 0;
				
				if (BASE_VALUE >= BOSS_MIN_HEALTH) {
					HEALTH_ADD_VALUE = BOSS_ADD;
				} else {
					HEALTH_ADD_VALUE = BASIC_ADD;
				}
				assignAtt(entity, player, attName, HEALTH_ADD_VALUE, attModifierName, attOperation);
			}
			if (attName == 'minecraft:generic.movement_speed') {
			  let MAX_SPEED = 0.085;
			  let SPEED_ADD_VALUE = Math.min(Math.max(((PLAYER_COEF - 1) / 19) * MAX_SPEED, 0), MAX_SPEED);
			  assignAtt(entity, player, attName, SPEED_ADD_VALUE, attModifierName, attOperation);
			}
			if (attName == 'minecraft:generic.attack_damage') {
				let ATTACK_DMG_ADD = Math.pow(PLAYER_COEF, 0.97) + Math.pow(PLAYER_COEF, 0.97);
				let ATTACK_DMG_ADD_VALUE = Math.min(ATTACK_DMG_ADD * (1 / (1 + (BASE_VALUE - 2) / 50)),	100);				
				assignAtt(entity, player, attName, ATTACK_DMG_ADD_VALUE, attModifierName, attOperation);
			}
			if (attName == 'attributeslib:arrow_damage') {
				let ARROW_DMG_ADD = Math.pow(PLAYER_COEF, 0.57) + Math.pow(PLAYER_COEF, 0.57);
				let ARROW_DMG_ADD_VALUE = Math.min(ARROW_DMG_ADD, 100);
				assignAtt(entity, player, attName, ARROW_DMG_ADD_VALUE, attModifierName, attOperation);
			}
			if (!allBowEntities.test(entity.type) && attName == 'obscure_api:magic_damage') {
				let MAGIC_DMG_ADD = Math.pow(PLAYER_COEF, 0.53) + Math.pow(PLAYER_COEF, 0.53);
				let MAGIC_DMG_ADD_VALUE = Math.min(MAGIC_DMG_ADD, 100);
				assignAtt(entity, player, attName, MAGIC_DMG_ADD_VALUE, attModifierName, attOperation);
			}
			if (attName == 'forge:step_height_addition') {
				let STEP_HEIGHT_ADD_VALUE = Math.min((PLAYER_COEF - 1) / (BASE_MAX_COEF - 1) * 2, 2);
				if (STEP_HEIGHT_ADD_VALUE < 0) STEP_HEIGHT_ADD_VALUE = 0;
				assignAtt(entity, player, attName, STEP_HEIGHT_ADD_VALUE, attModifierName, attOperation);
			}
			if (!isTamed(entity) && entity.isMonster() && !ATT_EXCLUDE_ARMOR.test(entity.type)) {
				if (attName == 'minecraft:generic.armor') {
					let RANDOM_ARMOR_EXTRA_CHANCE = 0.5 + Math.random() * 1.65;
					let ARMOR_ADD = Math.pow(PLAYER_COEF, 0.67) + Math.pow(PLAYER_COEF, 0.67);
					let ARMOR_ADD_VALUE = Math.min(ARMOR_ADD * RANDOM_ARMOR_EXTRA_CHANCE, 60);
					assignAtt(entity, player, attName, ARMOR_ADD_VALUE, attModifierName, attOperation);
				}
				if (attName == 'minecraft:generic.armor_toughness') {
					let RANDOM_ARMOR_TOUGHNESS_EXTRA_CHANCE = 0.5 + Math.random() * 1.35;
					let ARMOR_TOUGHNESS_ADD = Math.pow(PLAYER_COEF, 0.45) + Math.pow(PLAYER_COEF, 0.45);
					let ARMOR_TOUGHNESS_ADD_VALUE = Math.min(ARMOR_TOUGHNESS_ADD * RANDOM_ARMOR_TOUGHNESS_EXTRA_CHANCE, 60);
					assignAtt(entity, player, attName, ARMOR_TOUGHNESS_ADD_VALUE, attModifierName, attOperation);
				}
				if (attName == 'lodestone:magic_resistance') {
					let RANDOM_MAGIC_ARMOR_EXTRA_CHANCE = 0.5 + Math.random() * 1.45;
					let MAGIC_ARMOR_ADD = Math.pow(PLAYER_COEF, 0.55) + Math.pow(PLAYER_COEF, 0.55);
					let MAGIC_ARMOR_ADD_VALUE = Math.min(MAGIC_ARMOR_ADD * RANDOM_MAGIC_ARMOR_EXTRA_CHANCE, 60);
					assignAtt(entity, player, attName, MAGIC_ARMOR_ADD_VALUE, attModifierName, attOperation);
				}
			}
			if (attName == 'attributeslib:armor_shred') {
				let ARMOR_SHRED_ADD = ((Math.pow(PLAYER_COEF, 1.4) - 1) / (Math.pow(PLAYER_MAX_COEF, 1.4) - 1));
				let ARMOR_SHRED_ADD_VALUE = Math.min(ARMOR_SHRED_ADD, 0.75);
				assignAtt(entity, player, attName, ARMOR_SHRED_ADD_VALUE, attModifierName, attOperation);
			}
			if (!entity.isMonster() && attName == 'attributeslib:current_hp_damage') {
				let CHP_ADD = ((Math.pow(PLAYER_COEF, 1.2) - 1) / (Math.pow(PLAYER_MAX_COEF, 1.2) - 1));
				let CHP_ADD_VALUE = Math.min(CHP_ADD, 0.075);
				assignAtt(entity, player, attName, CHP_ADD_VALUE, attModifierName, attOperation);
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

NATURAL_ATTRIBUTES.forEach(attribute => {
	EntityEvents.spawned(event => {
		const {	entity,	level } = event;
		level.players.forEach(player => {
			if (isTamedBy(entity, player).tamed) return;
			addModifiers(event, player, entity, attribute, 'rogue:scaler', "addition");
		})
	});
	ItemEvents.entityInteracted(event => {
		const {	target,	player, item, hand } = event;
		if (!isTamedBy(target, player).tamed || hand != 'MAIN_HAND' || item.id !== 'minecraft:air') return;
		addModifiers(event, player, target, attribute, 'rogue:scaler', "addition");
	});
})

const SYNC_MESSAGE_TYPE = ['rats'];

// COOLDOWN TOOLTIP
ItemEvents.entityInteracted(event => {
	const { target, player, item, hand } = event;
	
	if (!isTamedBy(target, player).tamed || hand != 'MAIN_HAND' || item.id !== 'minecraft:air') return;
	let petCD = getPetCooldown(target);
	let petPlayerCD = Math.round(getPlayerPetCD(player) * 100);
	
	if (petCD == undefined) return;
		
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
	if (level.clientSide || level.time % 20 !== 0) return;

	for (let entity of level.entities) {
		if (isTamed(entity)) {
			decrementPetCooldown(entity)
		}
	}
})