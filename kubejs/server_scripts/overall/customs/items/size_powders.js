const pehkuiStages = {
	'-3': {
		'pehkui:base': 0.05,
		'pehkui:drops': 4,
		'pehkui:motion': 1.5,
		'pehkui:step_height': 0.5,
		'pehkui:view_bobbing': 2,
		'pehkui:reach': 2,
		'pehkui:third_person': 2
	},
	'-2': {
		'pehkui:base': 0.25,
		'pehkui:drops': 3,
		'pehkui:motion': 1.25,
		'pehkui:step_height': 1,
		'pehkui:view_bobbing': 2,
		'pehkui:reach': 2,
		'pehkui:third_person': 2
	},
	'-1': {
		'pehkui:base': 0.5,
		'pehkui:drops': 2,
		'pehkui:motion': 1.125,
		'pehkui:step_height': 1.5,
		'pehkui:view_bobbing': 1,
		'pehkui:reach': 2,
		'pehkui:third_person': 2
	},
	'0': {
		'pehkui:base': 1,
		'pehkui:drops': 1,
		'pehkui:motion': 1,
		'pehkui:step_height': 1,
		'pehkui:view_bobbing': 1,
		'pehkui:reach': 1,
		'pehkui:third_person': 1
	},
	'1': {
		'pehkui:base': 2,
		'pehkui:drops': 0.5,
		'pehkui:motion': 1,
		'pehkui:step_height': 1,
		'pehkui:view_bobbing': 1,
		'pehkui:reach': 1,
		'pehkui:third_person': 0.875
	},
	'2': {
		'pehkui:base': 4,
		'pehkui:drops': 0.25,
		'pehkui:motion': 0.75,
		'pehkui:step_height': 1,
		'pehkui:view_bobbing': 1,
		'pehkui:reach': 1,
		'pehkui:third_person': 0.75
	},
	'3': {
		'pehkui:base': 8,
		'pehkui:drops': 0.125,
		'pehkui:motion': 0.625,
		'pehkui:step_height': 1,
		'pehkui:view_bobbing': 1,
		'pehkui:reach': 1,
		'pehkui:third_person': 0.625
	}
}

let sizeUP = 'kubejs:dust_size_up';
let sizeDOWN = 'kubejs:dust_size_down';

const pehkuiJumpBoost = {
	'-3': 4.5,
	'-2': 2.0,
	'-1': 1.5
}

function setPehkuiStage(event, entity, item, transition) {
	const { hand, server } = event
	
	if (event.item.id == item) {
		if (entity.persistentData.pehkuiStage == undefined) entity.persistentData.pehkuiStage = 0;
		if ((entity.persistentData.pehkuiStage > -3 || transition > 0) && (entity.persistentData.pehkuiStage < 3 || transition < 0) && !event.player.isCrouching()) {
			entity.persistentData.pehkuiStage += transition;
			
			event.player.damageHeldItem(hand, 1, item => event.player.give(Item.of('minecraft:bowl')));
			
			let pStages = pehkuiStages[entity.persistentData.pehkuiStage];
			for (let i in pStages) {
				server.runCommandSilent(`scale set ${i} ${pStages[i]} ${entity.username}`);
			}
			server.runCommandSilent(`playsound occultism:poof master ${entity.username} ${entity.x} ${entity.y} ${entity.z} 1`);
			event.player.addItemCooldown(item, 12);
			event.cancel();
		}
	}
}

function resetSize(event, entity, item) {
	const { hand, server } = event
	
	if (event.item.id == item) {
		if (entity.persistentData.pehkuiStage != 0 && event.player.isCrouching() && event.player.onGround()) {
			event.player.damageHeldItem(hand, 1, item => event.player.give(Item.of('minecraft:bowl')));
			server.runCommandSilent(`scale reset ${entity.username}`);
			entity.persistentData.pehkuiStage = 0;
			server.runCommandSilent(`playsound additional_lights:fire_ignition_l master ${entity.username} ${entity.x} ${entity.y} ${entity.z} 1`);
			event.cancel();
		}
	}
}

ItemEvents.rightClicked(event => {
	setPehkuiStage(event, event.player, Item.of(sizeDOWN), -1);
	setPehkuiStage(event, event.player, Item.of(sizeUP), 1);
		
	resetSize(event, event.player, Item.of(sizeUP));
	resetSize(event, event.player, Item.of(sizeDOWN));
});

ItemEvents.entityInteracted(event => {
	setPehkuiStage(event, event.target, Item.of(sizeDOWN), -1);
	setPehkuiStage(event, event.target, Item.of(sizeUP), 1);
	
	resetSize(event, event.target, Item.of(sizeUP));
	resetSize(event, event.target, Item.of(sizeDOWN));
});

PlayerEvents.tick(event => {
	const { player, server } = event
	
	if (player.persistentData.pehkuiStage != undefined) {
		let pStage = player.persistentData.pehkuiStage;

		if (pStage < 0 && player.isCrouching() && player.onGround() && player.data.tempJumpHeight == 1) {
			player.data.tempJumpHeight = pehkuiJumpBoost[pStage];
			player.runCommandSilent(`scale set pehkui:jump_height ${player.data.tempJumpHeight} ${player.username}`);
			player.runCommandSilent(`scale set pehkui:jump_height ${player.data.tempJumpHeight} ${player.username}`);
		} else if (pStage < 0 && !player.isCrouching() && player.data.tempJumpHeight != 1) {
			player.data.tempJumpHeight = 1;
			player.runCommandSilent(`scale set pehkui:jump_height 1 ${player.username}`);
			player.runCommandSilent(`scale set pehkui:jump_height 1 ${player.username}`);
		}
		if (player.isHoldingInAnyHand(Item.of(sizeDOWN)) || player.isHoldingInAnyHand(Item.of(sizeUP))) {
			player.setStatusMessage(Text.of(`Current Scale: ${pehkuiStages[pStage]['pehkui:base']}x`).gold());
		}
	}
});
