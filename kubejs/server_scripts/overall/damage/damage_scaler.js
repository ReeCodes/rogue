/*
	DAMAGE SCALER
*/

const PLAYER_DAMAGE_TYPES = [
    'inFire','lava','onFire','stalagmite','thorns', 
    'explosion.player','fall','explosion','starve', 
    'dehydrate','witherSkull','wither','drown', 
    'indirectMagic','radiation','thrown','hotFloor', 'magic'
];

if (!global.DamageHandlers) global.DamageHandlers = [];
if (!global.DamageHandlers.some(fn => fn.tag === "damage_scaler")) {
    let handler = (event, amount) => {
        const { source, entity } = event;
        let actualSource = source?.actual;
        let multiplier = 1;
		let originalAmount = amount;
        
		if (entity.isAlive() && entity.type === "minecraft:player" && PLAYER_DAMAGE_TYPES.includes(source.getType())) {
			if (entity.type === "minecraft:player") {
				multiplier = entity.persistentData?.coef ?? 1;
			}
			let healthScale = 1 + Math.pow(entity.maxHealth, 0.04);
			amount = originalAmount * (1 + ((multiplier - 1) / 19) * healthScale);
		}

        amount = Math.max(originalAmount, amount, 1);
        return amount;
    };

    handler.tag = "damage_scaler";
    global.DamageHandlers.push(handler);
    console.log('[Damage Scaler] registered');
}