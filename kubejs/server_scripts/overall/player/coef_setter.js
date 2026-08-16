//priority: 500

const coefDebug = false;

function getAttValue(player, attName) {
    let val = player.getAttributeValue(attName);
    return (typeof val === "number" && !isNaN(val)) ? val : 0;
}

const ATTRIBUTE_WEIGHTS = [
	['minecraft:generic.armor_toughness', 0.3],
	['minecraft:generic.armor', 0.3],
	['lodestone:magic_damage', 0.2],
	['puffish_attributes:magic_damage', 0.2],
	['minecraft:generic.attack_damage', 0.25],
	['attributeslib:cold_damage', 0.125],
	['attributeslib:fire_damage', 0.125],
	['attributeslib:crit_damage', 0.19],
	['puffish_attributes:tamed_damage', 0.18]
];

function setPlayerCoef(player) {
	const maxCoef = getMaxPlayerCoef(player);
	let PLAYER_MAX_HEALTH = player.maxHealth || 0;
	let PLAYER_ADVANCMENTS = getPersistentInt(player, 'adv_completed', 0);

	let PLAYER_ATTRIBUTES = ATTRIBUTE_WEIGHTS.reduce(
		(sum, [attName, weight]) => sum + getAttValue(player, attName) * weight,
		0
	);

	PLAYER_ATTRIBUTES +=
		(PLAYER_MAX_HEALTH * 0.25) +
		((PLAYER_ADVANCMENTS - 40) * 0.025);

	let rawCoef = Math.pow(PLAYER_ATTRIBUTES / COEF_DIVISOR, COEF_TOLERANCE);
	
	if (coefDebug) {
		console.log(`RawCoef for ${player.username} : ${rawCoef}`);
		console.log(`Total Advancements for ${player.username} : ${PLAYER_ADVANCMENTS}`);
	}
	
	if (rawCoef < 1.01) rawCoef = 1;

	return Math.min(rawCoef.toFixed(2), maxCoef);
}

PlayerEvents.advancement(event => {
	const { player, server } = event;
	
	if (!player.getPersistentData().contains('adv_completed')) {
		let seededCount = server.advancements.allAdvancements
			.stream()
			.filter(adv => player.isAdvancementDone(adv.id))
			.toList().size();
		setPersistentInt(player, 'adv_completed', seededCount);
	}
	
	let newCount = getPersistentInt(player, 'adv_completed', 0) + 1;
	
	setPersistentInt(player, 'adv_completed', newCount);
	setPersistentDouble(player, 'coef', setPlayerCoef(player));
});

PlayerEvents.respawned(event => {
	const { player } = event;
	
	setPersistentDouble(player, 'coef', setPlayerCoef(player));
});

PlayerEvents.loggedIn(event => {
	const { player, server } = event;
	
	let pData = getEntityData(player);
	
	if (!pData || !pData.contains('coef')) {
		setPersistentDouble(player, 'coef', 1);
	}
})

if (!doResourcefulChecking) {
	PlayerEvents.tick(event => {
		const { player } = event;
		if (player.age % COEF_CHECK_INTERVAL !== 0) return;
		
		const newCoef = setPlayerCoef(player);
		const currentCoef = getPersistentDouble(player, 'coef', 1);
		if (currentCoef !== newCoef) {
			setPersistentDouble(player, 'coef', newCoef);
		}
	});
}