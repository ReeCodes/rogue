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
		
		if (entity.level.clientSide) return;
		
        let actualSource = source?.actual;
        let multiplier = 1;
		let newAmount = amount;
        
		if (entity && 
			entity.isAlive() && 
			entity.getType() == "minecraft:player" && 
			entity instanceof $ServerPlayer && 
			!entity.getPersistentData().isEmpty() && 
			PLAYER_DAMAGE_TYPES.includes(source.getType())
			) {

			multiplier = getPlayerCoef(entity) ?? 1;			
			let playerMaxCoef = getMaxPlayerCoef(entity) ?? BASE_MAX_COEF;
			let healthScale = 1 + Math.pow(entity.maxHealth, 0.06);
			amount = newAmount * (1 + ((multiplier - 1) / (playerMaxCoef - 1)) * healthScale);
		}
		
		amount = Math.max(newAmount, amount, 1);
		return amount;
    };

    handler.tag = "damage_scaler";
    global.DamageHandlers.push(handler);
    console.log('[Damage Scaler] registered');
}