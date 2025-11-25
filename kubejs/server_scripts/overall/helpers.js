//priority: 1000

// CLASSES
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier");
const $Player = Java.loadClass("net.minecraft.world.entity.player.Player");
const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer");
const $FakePlayer = Java.loadClass("net.minecraftforge.common.util.FakePlayer");
const $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");
const $ScaleTypes = Java.loadClass("virtuoel.pehkui.api.ScaleTypes");
const $EquipmentSlot = Java.loadClass("net.minecraft.world.entity.EquipmentSlot");
const $PotionUtils = Java.loadClass("net.minecraft.world.item.alchemy.PotionUtils");
const $Potions = Java.loadClass("net.minecraft.world.item.alchemy.Potions");
const $MobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance");

// CHANGEABLE CONSTANTS
// [Mob Scaling] Search Radius for nearby Players
const maxPlayerSearchRange = 128;
const playerAllayACSearchRange = 6;

// [Mob Scaling] Debugger
const DEBUG_MODE_MS = false;

// ALL CONSTANTS
const COLOR_ROGUE = '#f76628';
const skilltree_version = 5;

const VALID_SERVER_MODES = ['HARD', 'BALANCED'];

const SERVER_MODE = VALID_SERVER_MODES.includes(SET_SERVER_MODE)
    ? SET_SERVER_MODE
    : 'BALANCED';

console.log("[SERVER MODE] Set to " + SERVER_MODE);

const allBowEntities = new RegExp([
    'minecraft:skeleton',
    'variantsandventures:verdant',
    'variantsandventures:murk',
    'goety:mossy_skeleton_servant',
    'goety:skeleton_servant',
    'goety:sunken_skeleton_servant',
    'specialmobs:.*skeleton.*',
    'specialmobs:.*skeleton$',
    'specialmobs:.*zombie$'
].join("|"));

const allSpecialMobs = new RegExp(
	'specialmobs:(?!creeper$|zombie$|drowned$|zombifiedpiglin$|skeleton$|witherskeleton$|slime$|magmacube$|spider$|cavespider$|silverfish$|enderman$|witch$|ghast$|blaze$).*'
);

const blacklistedPickup = [
	'minecraft:wither',
	'minecraft:ender_dragon',
	'minecraft:evoker',
	'irons_spellbooks:citadel_keeper',
	'irons_spellbooks:necromancer'
];

const allGateways = [
	'gateways:basic/blaze', 
	'gateways:basic/enderman',
	'gateways:basic/slime',
	'gateways:hellish_fortress',
	'gateways:overworldian_nights',
	'apotheotic_additions:aether_gate',
	'apotheotic_additions:caves_gate',
	'apotheotic_additions:dark_garden',
	'apotheotic_additions:time_lost_gate'
];

const emptyJSON = {
	"type": "empty"
};

const replaceJSON = {
	"replace": true,
	"type": "empty"
};

const SKILL_TREES = [
	'puffish_skills:brawler',
	'puffish_skills:sorcery',
	'puffish_skills:adventure'
];

// ALL FUNCTIONS
function getScaleData(entity, scaleType) {
	if (scaleType == null) {
        scaleType = $ScaleTypes.BASE;
    }
	return scaleType.getScaleData(entity).getScale();
}

function setScaleData(entity, scale, scaleType) {
	if (scaleType == null) {
        scaleType = $ScaleTypes.BASE;
    }
	scaleType.getScaleData(entity).setScale(scale);
}

function randomize(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function toTitleCase(string) {
	return string
		.replace(/[_-]+/g, ' ') 
		.replace(/\b\w/g, c => c.toUpperCase());
}

function roundTo(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

function useItem(player, itemId) {
	if (player.isCreative()) return;
	
	const main = player.getHeldItem('main_hand');
	const off = player.getHeldItem('off_hand');

	if (main.id === itemId) main.count--;
	if (off.id === itemId) off.count--;
}

function playSound(level, sound, soundSource, x, y, z, vol, pitch) {
	vol = vol || 1.0;
	pitch = pitch || 0.9;
	level.runCommandSilent('playsound ' + sound + ' master ' + soundSource + ' ' + x + ' ' + y + ' ' + z + ' ' + vol + ' ' + pitch);
}

function addItemCooldown(player, itemId, ticks) {
	player.addItemCooldown(Item.of(itemId), ticks);
}

function isFakePlayer(player) {
    return (!player || !player.isPlayer() || !player.isAlive() || player instanceof $FakePlayer);
}

function hasCompletedQuest(player, id) {
	if (isFakePlayer(player)) return;
	return player.data.ftbquests.isCompleted(id);
}

function simpleQuestComplete(player, id) {
	if (isFakePlayer(player)) return;
	if (!player.data.ftbquests.isCompleted(id)) player.data.ftbquests.addProgress(id, 1)
}

function isTamedBy(entity, player) {
    let hasOwner = entity?.owner === player;
    let hasOwnerUUID = !!entity?.ownerUUID;
	let isTrustedByPlayer = typeof entity?.isPlayerTrusted === "function" 
        ? !!entity.isPlayerTrusted(player.uuid) 
        : false;
    return {
        tamed: hasOwner || hasOwnerUUID || isTrustedByPlayer,
        hasOwner: hasOwner,
        hasOwnerUUID: hasOwnerUUID,
		isTrustedByPlayer: isTrustedByPlayer
    };
}

function isTamed(entity) {
	if (!entity) return false;
	return (!!entity?.owner || !!entity?.ownerUUID || !!entity?.nbt?.TrustedPlayers);
}

// MOB UTILS
function getFollowRange(entity) {
    return entity.getAttributes().hasAttribute('minecraft:generic.follow_range') ? entity.getAttributeValue('minecraft:generic.follow_range') : 32;
}

function findNearbyEntitiesCloseToPlayer(level, player, entityTypesRegEx, initialRadius, maxRadius, debug) {
	
	debug = debug || false;	
	let radius = initialRadius;
	let nearby;
	
	if (!(entityTypesRegEx instanceof RegExp)) {
		entityTypesRegEx = new RegExp(String(entityTypesRegEx));
	}

	let playerAABB = player.boundingBox.inflate(radius);
	nearby = level.getEntities(player, playerAABB, (entity) => {
		return entityTypesRegEx.test(entity.type);
	});

	if (debug && nearby.length > 0) console.log("[Scanning Entities] Found nearby entities initially: ", nearby);

	while (nearby.length === 0 && radius <= maxRadius) {
		if (debug) console.log(`[Scanning Entities] Expanding radius: Radius: ${radius}, Block Position: ${player.blockPosition()}, Username: ${player.username}`);

		playerAABB = player.boundingBox.inflate(radius);
		nearby = level.getEntities(player, playerAABB, (entity) => {
			return entityTypesRegEx.test(entity.type);
		});
		
		radius += 2;
	}

	if (nearby.length === 0 && debug) {
		console.log(`[Scanning Entities] No entities found in specified range for: Block Position: ${player.blockPosition()}, Username: ${player.username}`);
	}

	return nearby;
}

function getClosestEntity(player, entities, maxDistSq, debug) {
	
	debug = debug || false;
	let closest;
	let minDist = maxDistSq;

	for (let e of entities) {
		if (!e) continue;
		let dist = e.distanceToEntitySqr(player);
		if (debug) console.log(`[Scaling] Distance to Player: [${dist}]`);
		if (dist <= maxDistSq && dist < minDist) {
			minDist = dist;
			closest = e;
		}
	}
	if (debug && closest) console.log(`[Scaling] Closest Entity: ${closest.type}`);
	return closest;
}

function findNearbyPlayersCloseToEntity(level, entity, initialRadius, maxRadius, isStrict, debug) {
	
	debug = debug || false;
	let radius = initialRadius;

	let mobAABB = entity.boundingBox.inflate(radius);
	let nearby = level.getEntitiesOfClass($ServerPlayer, mobAABB, (player) => {
		return !!player?.persistentData?.coef;
	});

	if (debug && nearby.length > 0) console.log("[Scanning Players] Found nearby players initially!");

	while (nearby.length === 0 && radius <= maxRadius) {
		if (debug) console.log("[Scanning Players] Expanding radius: " + radius, entity.blockPosition(), entity.type);

		mobAABB = entity.boundingBox.inflate(radius);
		nearby = level.getEntitiesOfClass($ServerPlayer, mobAABB);

		radius += 8;
	}

	if (nearby.length === 0) {
		
		if (isStrict) {
			nearby = level.players;
			if (debug) console.log("[Scanning Players] Fallback to all players in level for: " + entity.blockPosition(), entity.type);
		} else {
			if (debug) console.log("[Scanning Entities] No players found in specified range for: " + entity.blockPosition(), entity.type);
		}
		
	}

	return nearby;
}

function getClosestPlayer(entity, players, maxDistSq, debug) {
	
	debug = debug || false;
	let closest;
	let minDist = maxDistSq;

	for (let p of players) {
		if (!p) continue;
		let dist = p.distanceToEntitySqr(entity);
		if (debug) console.log(`[Scaling] Distance to Entity: [${dist}]`);
		if (dist <= maxDistSq && dist < minDist) {
			minDist = dist;
			closest = p;
		}
	}
	if (debug && closest) console.log(`[Scaling] Closest Player: ${closest.username}`);
	return closest;
}

function calculateCoef(entity, players, radius, debug) {
	
	debug = debug || false;
    let resultCoef;

    if (SERVER_MODE === 'HARD') {
        let chosen = players.reduce((a, b) =>
            (getPlayerCoef(b) > getPlayerCoef(a)) ? b : a
        );
        resultCoef = getPlayerCoef(chosen);
        if (debug) console.log(`[Scaling/${SERVER_MODE}] Chosen Player: ${chosen.username} [COEF:${resultCoef}]`);
    } else if (SERVER_MODE === 'BALANCED') {
        let total = 0;
        for (let p of players) total += getPlayerCoef(p);
        resultCoef = Math.max(1, total / players.length);
        if (debug) console.log(`[Scaling/${SERVER_MODE}] Calculated Coef: [COEF:${resultCoef}]`);
    }

    return resultCoef;
}

function levelDetectQuest(condition, player, questID) {
	if (!hasCompletedQuest(player, questID)) {
		if (condition) simpleQuestComplete(player, questID);
	}
}

// GLOBAL EXECUTIONS
global.spreadPlayer = (entity, level) => {
	if (isFakePlayer(entity)) return;
	
	let player = entity;
	let server = player.getServer();
	let off = player.offHandItem;
	let main = player.mainHandItem;
	let nothing = 'kubejs:nothingness';
	
	if (player.isHoldingInAnyHand(Item.of(nothing))) {
		if (off.id == nothing) off.count--;
		if (main.id == nothing) main.count--;
		player.setStatusMessage(Text.of(`Finding a right stop...`).yellow());
		player.addItemCooldown(nothing, 800);
		server.runCommandSilent(`playsound minecraft:block.glass.break master ${player.username} ${player.x} ${player.y} ${player.z} 0.5 0.5`);
		server.scheduleInTicks(40, () => {
			server.runCommandSilent(`execute as ${player.username} run spreadplayers ${player.x} ${player.z} 5000 10000 false ${player.username}`);
		})
	}
}