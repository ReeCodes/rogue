//priority: 250

const BLACKLIST_FLOOR = ["minecraft:generic.movement_speed", "attributeslib:armor_shred", "attributeslib:current_hp_damage"];

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
	'attributeslib:current_hp_damage',
	'puffish_attributes:ranged_damage',
	'puffish_attributes:melee_damage',
	'irons_spellbooks:spell_power'
];

const ENTITY_SCALE_BLACKLIST = entityRegex([
	'dummmmmmy:target_dummy',
	'luggage:ender_luggage',
	'luggage:luggage',
	'forbidden_arcanus:lost_soul',
	'evilcraft:vengeance_spirit',
	'minecraft:armor_stand',
	'cardiac:.*'
]);

const AUTO_SYNC_TAMED = entityRegex([
	'species:spectre',
	'summonerscrolls.*',
	'twilightforest:loyal_zombie',
	'dungeonnowloading:sealed_chaos',
	'goety:.*_servant$',
	'goety_cataclysm:.*_servant$'
]);

// EXCLUSIONS LIST

const BOSS_EXCLUDE = entityRegex([
	'mutantmore.*',
	'mutantmonsters.*',
	'iceandfire.*_dragon$'
]);

const ARMOR_EXCLUDE = entityRegex([
	'alshanex.*',
	'fossil:.*',
	'goety:.*_servant$',
	'goety_cataclysm:.*_servant$',
	'grimoireofgaia:.*',
	'draconicevolution:.*'
]);

// EXTRA LIST

const EXTRA_HEALTH = {
	'minecraft:ender_dragon': 500,
	'minecraft:wither': 150
};

const RANGED_DMG_EXTRA = entityRegex([
	'mutantmore:.*',
	'mutantmonsters:mutant_snow_golem',
	'alshanex_familiars:.*_pet$',
	'minecraft:ender_dragon'
]);

const MELEE_DMG_EXTRA = entityRegex([
	'mutantmore:sentry_vine',
	'(?:mutantmonsters|mutantmore):mutant_(?!blaze$|shulker$).*$',
	'minecraft:warden',
	'^(?:cataclysm|goety_cataclysm):(?!.*_servant$).*$',
	'minecraft:ender_dragon'
]);

const SPELL_POWER_EXTRA = entityRegex([
	'alshanex_familiars:.*'
]);

// FUNCTIONS

function getPetData(entity) {
	if (!entity.getPersistentData()) {
		return { sync_health_cooldown: 0 };
	}
	if (!entity.getPersistentData().contains('PetData')) {
		entity.getPersistentData().PetData = { sync_health_cooldown: 0 };
	}
	return entity.getPersistentData().PetData;
}

function getPetCooldown(entity) {
	let petData = getPetData(entity);
	return petData.sync_health_cooldown ?? 0;
}

function setPetCooldown(entity, seconds) {
    let ticks = Math.max(0, seconds) * 20;
    getPetData(entity).sync_health_cooldown = ticks;
}

function syncHealth(entity, player) {
	let petData = getPetData(entity);
	
	if (!petData.initialHealthSet) {
		entity.setHealth(entity.maxHealth);
		petData.initialHealthSet = true;
		return;
	}
	
	if (!isTamedBy(entity, player).tamed) {
		entity.setHealth(entity.maxHealth);
		return;
	}
	
	if (getPetCooldown(entity) <= 0) {
		let newHealth = Math.min(entity.health + (entity.maxHealth * PET_HEAL_PERCENTAGE), entity.maxHealth);
		entity.setHealth(newHealth);
		setPetCooldown(entity, PET_SYNC_COOLDOWN(player));
	}
}

function attDebug(entity, attName) {
	let att = entity.nbt?.Attributes?.find(att => (
		att.Name == attName
	));
	if (att) Utils.server.tell(Text.of(entity.getType()+': ').red().append(Text.of(att).green()));
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

function scaleProportionalAttribute(coef, maxCoef, exponent, targetMax, subtract) {
	subtract = subtract || 0;
	const ratio = Math.pow(coef / maxCoef, exponent);
	return Math.max(0, (ratio * targetMax) - subtract);
}

// UTILS

const getExtraHealth = entity =>
	EXTRA_HEALTH[entity.getType()] ?? 0;