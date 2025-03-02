global.onPlayerStartedRolling = (player, velocity) => {
	if (player?.persistentData?.puff_abilities) {
		let nimbleBoost = player.persistentData.puff_abilities.find(a => a.ability == "nimble");
		if (nimbleBoost) {
			Utils.server.scheduleInTicks(2, () => {
				player.level.runCommandSilent(`playsound malum:staff_charged master ${player.username} ${player.x} ${player.y} ${player.z} 0.3`)
			})
			nimbleBoost.on_cooldown = 1;
		}
	}
};

global.hurtEvent = event => {
	const { amount, source,	entity } = event;
	if (!source?.actual?.persistentData?.puff_abilities) return;
	let aerial_assault = source.actual.persistentData?.puff_abilities?.some(a => a.ability == 'aerial_assault');

	if (aerial_assault) {
		if (!source.actual.onGround()) {
			if (entity.isAlive() && entity.type !== "minecraft:player") {
				if (source.actual.isPlayer()) {
					let extraDamage = (amount * 1.5).toFixed(1);
					event.setAmount(extraDamage);
				}
			}
		}
	}

	let nimble = source.actual.persistentData?.puff_abilities?.find(a => a.ability == 'nimble');
	if (nimble && nimble.on_cooldown == 1) {
		if (entity.isAlive() && entity.type != "minecraft:player") {
			if (source.actual.isPlayer()) {
				let extraDamage = (amount * 3).toFixed(1);
				event.setAmount(extraDamage);
				nimble.on_cooldown = 0;
			}
		}
	}
};