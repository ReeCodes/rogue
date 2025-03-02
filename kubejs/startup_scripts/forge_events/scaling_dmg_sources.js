ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent', event => {
	global.hurtEvent(event)
})

global.hurtEvent = event => {
	const { amount, source, entity } = event;
	if (entity.isAlive() && entity.type != "minecraft:player") {
		if (['inFire', 'lava', 'onFire', 'stalagmite', 'thorns', 'explosion.player', 'fall', 'explosion', 'witherSkull', 'wither', 'magic', 'drown', 'indirectMagic', 'radiation', 'thrown', 'hotFloor'].includes(source.getType())) {
			let baseMultiplier = 1;
			let healthMultiplier = entity.maxHealth;
			if (source.actual) baseMultiplier = source.actual.persistentData?.coef ?? 1;
			baseMultiplier = 1 + (baseMultiplier - 1) / 10;
			let scaledDamage = (amount + baseMultiplier * (Math.pow(healthMultiplier, 0.38))).toFixed(1);
			event.setAmount(scaledDamage);
		}
	}
	if (entity.isAlive() && entity.type == "minecraft:player") {
		if (['inFire', 'lava', 'onFire', 'stalagmite', 'thorns', 'explosion.player', 'fall', 'explosion', 'starve', 'dehydrate', 'witherSkull', 'wither', 'drown', 'indirectMagic', 'radiation', 'thrown', 'hotFloor'].includes(source.getType())) {
			let baseMultiplier = entity.persistentData?.coef ?? 1;
			let healthMultiplier = entity.maxHealth;
			baseMultiplier = 1 + (baseMultiplier - 1) / 10;
			let scaledDamage = (amount + baseMultiplier * (Math.pow(healthMultiplier, 0.24))).toFixed(1);
			event.setAmount(scaledDamage);
		}
	}
}