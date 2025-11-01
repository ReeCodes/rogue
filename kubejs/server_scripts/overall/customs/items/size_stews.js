let sizeUP = 'kubejs:dust_size_up';
let sizeDOWN = 'kubejs:dust_size_down';

const SCALE_STAGES = {
    '0.1':  { BASE: 0.1,  MOTION: 2.5,  JUMP_HEIGHT: 2.00 },
    '0.25': { BASE: 0.25, MOTION: 2.25, JUMP_HEIGHT: 1.75 },
    '0.5':  { BASE: 0.5,  MOTION: 1.15, JUMP_HEIGHT: 1.25 },
    '0.75': { BASE: 0.75, MOTION: 1.0,  JUMP_HEIGHT: 1.125 },
    '1':    { BASE: 1 },
    '2':    { BASE: 2,    MOTION: 0.95, JUMP_HEIGHT: 0.95 },
    '4':    { BASE: 4,    MOTION: 0.9,  JUMP_HEIGHT: 0.9 },
    '6':    { BASE: 6,    MOTION: 0.9,  JUMP_HEIGHT: 0.85 },
    '8':    { BASE: 8,    MOTION: 0.9,  JUMP_HEIGHT: 0.8 }
};

const SCALE_STEPS = Object.keys(SCALE_STAGES).map(Number).sort((a, b) => a - b);

function setScaleStage(affectedEntity, step) {
    const stage = SCALE_STAGES[step];
    if (!stage) return;
	
    if (stage.BASE !== undefined)					setScaleData(affectedEntity, stage.BASE, $ScaleTypes.BASE);
	if (stage.REACH !== undefined)					setScaleData(affectedEntity, stage.REACH, $ScaleTypes.REACH);
    if (stage.MOTION !== undefined)					setScaleData(affectedEntity, stage.MOTION, $ScaleTypes.MOTION);
    if (stage.JUMP_HEIGHT !== undefined)			setScaleData(affectedEntity, stage.JUMP_HEIGHT, $ScaleTypes.JUMP_HEIGHT);
}

function getNextScale(current, direction) {

    if (direction > 0) {
        for (let step of SCALE_STEPS) {
            if (step > current) return step;
        }
        return null;
    } else {
        for (let i = SCALE_STEPS.length - 1; i >= 0; i--) {
            if (SCALE_STEPS[i] < current) return SCALE_STEPS[i];
        }
        return null;
    }
}


function scaleEntity(event, affectedEntity, itemId, transition) {
	const { hand, server, item, player } = event;
	
	if (item.id == itemId) {
		let currentScale = Math.round(getScaleData(affectedEntity) * 100) / 100; 
		if ((currentScale > 0.1 || transition > 0) && (currentScale < 8 || transition < 0) && !player.isCrouching()) {
			let nextScale = getNextScale(currentScale, transition);
			player.damageHeldItem(hand, 1, item => player.give(Item.of('minecraft:bowl')));
			setScaleStage(affectedEntity, nextScale);
			server.runCommandSilent(`playsound occultism:poof master ${player.username} ${affectedEntity.x} ${affectedEntity.y} ${affectedEntity.z} 1`);
			addItemCooldown(player, itemId, 12);
			event.cancel();
		}
	}
}

function resetSize(event, affectedEntity, itemId) {
	const { hand, server, item, player } = event;

	if (item.id == itemId) {
		if (getScaleData(affectedEntity) !== 1 && player.isCrouching() && player.onGround()) {
			player.damageHeldItem(hand, 1, item => player.give(Item.of('minecraft:bowl')));
			server.runCommandSilent(`scale reset ${affectedEntity.username}`);
			server.runCommandSilent(`playsound additional_lights:fire_ignition_l master ${player.username} ${affectedEntity.x} ${affectedEntity.y} ${affectedEntity.z} 1`);
			event.cancel();
		}
	}
}

ItemEvents.rightClicked(event => {
	const { player } = event;
	
	scaleEntity(event, player, Item.of(sizeDOWN), -1);
	scaleEntity(event, player, Item.of(sizeUP), 1);
		
	resetSize(event, player, Item.of(sizeUP));
	resetSize(event, player, Item.of(sizeDOWN));
	
});

ItemEvents.entityInteracted(event => {
	const { target } = event;
	
	scaleEntity(event, target, Item.of(sizeDOWN), -1);
	scaleEntity(event, target, Item.of(sizeUP), 1);
	
	resetSize(event, target, Item.of(sizeUP));
	resetSize(event, target, Item.of(sizeDOWN));
});

PlayerEvents.tick(event => {
	const { player, server } = event;
	if (player.isHoldingInAnyHand(Item.of(sizeDOWN)) || player.isHoldingInAnyHand(Item.of(sizeUP))) {
		player.setStatusMessage([Text.of(`Current Scale: `).append(Text.of(`${getScaleData(player).toFixed(2)}x`).color(COLOR_ROGUE))]);
	}
});