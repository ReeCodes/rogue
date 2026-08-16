//priority: 1000

// ALL FUNCTIONS
function getEntityData(entity) {
	if (!entity || entity.getPersistentData().isEmpty()) return null;
	return entity.getPersistentData();
}

function getDynamicSearchRange(playerCount) {
	const BASE_RANGE = maxPlayerSearchRange;
	const MIN_RANGE = 48;
	let range = Math.floor(BASE_RANGE / Math.sqrt(playerCount));
	return Math.max(range, MIN_RANGE);
}

function entityRegex(patterns) {
	return new RegExp(patterns.join("|"));
}

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
	if (!entity) return;
	return (!!entity?.owner || !!entity?.ownerUUID || !!entity?.nbt?.TrustedPlayers);
}

// MOB UTILS
function getFollowRange(entity) {
    return entity.getAttributes().hasAttribute('minecraft:generic.follow_range') ? entity.getAttributeValue('minecraft:generic.follow_range') : 32;
}

function findNearbyEntitiesCloseToPlayer(level, player, entityTypesRegEx, initialRadius, maxRadius, debug) {
	debug = debug || false;

	if (!(entityTypesRegEx instanceof RegExp)) {
		entityTypesRegEx = new RegExp(String(entityTypesRegEx));
	}
	
	let radius = initialRadius;
	let nearby = [];
	
	while (nearby.length === 0 && radius <= maxRadius) {
		let playerAABB = player.boundingBox.inflate(radius);
		nearby = level.getEntities(player, playerAABB, (entity) => entityTypesRegEx.test(entity.getType()));
		
		if (debug) {
			if (nearby.length > 0) {
				console.log(`[Scanning Entities] Found ${nearby.length} nearby entities at radius ${radius} for ${player.username}`);
			} else {
				console.log(`[Scanning Entities] Nothing found at radius ${radius}, expanding. Block Position: ${player.blockPosition()}, Username: ${player.username}`);
			}
		}
		
		radius += 2;
	}
	
	if (nearby.length === 0 && debug) {
		console.log(`[Scanning Entities] No entities found in specified range for: Block Position: ${player.blockPosition()}, Username: ${player.username}`);
	}
	
	return nearby;
}

function findNearbyPlayersCloseToEntity(level, entity, initialRadius, maxRadius, isStrict, debug) {
	debug = debug || false;
	
	let hasCoef = (player) => !!player.getPersistentData().contains('coef');
	let radius = initialRadius;
	let nearby = [];
	
	while (nearby.length === 0 && radius <= maxRadius) {
		let mobAABB = entity.boundingBox.inflate(radius);
		nearby = level.getEntitiesOfClass($ServerPlayer, mobAABB, hasCoef);
		
		if (debug) {
			if (nearby.length > 0) {
				console.log(`[Scanning Players] Found ${nearby.length} nearby players at radius ${radius}`);
			} else {
				console.log(`[Scanning Players] Nothing found at radius ${radius}, expanding. Block Position: ${entity.blockPosition()}, Type: ${entity.getType()}`);
			}
		}
		
		radius += 8;
	}
	
	if (nearby.length === 0) {
		if (isStrict) {
			nearby = level.players;
			if (debug) console.log(`[Scanning Players] Fallback to all players in level for: ${entity.blockPosition()}, ${entity.getType()}`);
		} else if (debug) {
			console.log(`[Scanning Players] No players found in specified range for: ${entity.blockPosition()}, ${entity.getType()}`);
		}
	}
	
	return nearby;
}

function getClosestInRange(reference, candidates, maxDistSq, debug) {
	
	debug = debug || false;
	let closest;
	let minDist = maxDistSq;
	
	for (let c of candidates) {
		if (!c) continue;
		let dist = c.distanceToEntitySqr(reference);
		if (debug) console.log(`[Scaling] Distance: [${dist}]`);
		if (dist <= maxDistSq && dist < minDist) {
			minDist = dist;
			closest = c;
		}
	}
	
	if (debug && closest) console.log(`[Scaling] Closest: ${closest.username ?? closest.type}`);
	return closest;
}

function calculateCoef(entity, players, radius, debug) {
	
	debug = debug || false;
	let resultCoef;
	
	if (global.SERVER_MODE === 'HARD' || global.SERVER_MODE === 'MAYHEM') {
		
		let chosen = players[0];
		let chosenCoef = getPlayerCoef(chosen);
		
		for (let p of players) {
			let c = getPlayerCoef(p);
			if (c > chosenCoef) {
				chosen = p;
				chosenCoef = c;
			}
		}
		resultCoef = chosenCoef;
		
		if (debug) console.log(`[Scaling/${global.SERVER_MODE}] Chosen Player: ${chosen.username} [COEF:${resultCoef}]`);
		
	} else if (global.SERVER_MODE === 'BALANCED') {
		
		let total = 0;
		for (let p of players) total += getPlayerCoef(p);
		resultCoef = Math.max(1, total / players.length);
		
		if (debug) console.log(`[Scaling/${global.SERVER_MODE}] Calculated Coef: [COEF:${resultCoef}]`);
		
	} else {
		resultCoef = 1;
		if (debug) console.log(`[Scaling] Unrecognized SERVER_MODE "${global.SERVER_MODE}", defaulting to COEF:1`);
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
			server.runCommandSilent(`execute as ${player.username} in ${player.level.getDimension()} run spreadplayers ${player.x} ${player.z} 5000 10000 false ${player.username}`);
		})
	}
}