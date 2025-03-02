function lootEvent(event, lootItem, lootSound, lootPath, lootParticles) {
	const {	player,	server,	item, level } = event
	
		let lootAmount = 1;
		lootParticles = lootParticles || false;
		
		if (item.id == Item.of(lootItem)) {

			//COOLDOWN
			addICooldown(event, lootItem, 20);

			//OPTIONAL PARTICLES
			if (lootParticles) server.runCommandSilent(`execute as ${player.username} run particle ${lootParticles} ${player.x} ${player.y} ${player.z} 1 2 1 4 45`);

			//SOUND EFFECT
			server.runCommandSilent(`playsound ${lootSound} master ${player.username} ${player.x} ${player.y} ${player.z} 1`);

			//LUCK BASED LOOT
			let player_luck = player.getAttributeValue('minecraft:generic.luck');
			player_luck *= 0.12;

			if (Math.random() < player_luck) lootAmount++;
			if (player_luck > 1.00 && Math.random() < (player_luck - 1) * 0.1) lootAmount++;

			for (let i = 0; i < lootAmount; i++) {
				server.runCommandSilent(`execute as ${player.username} in ${level.dimension} run loot spawn ${player.x} ${player.y} ${player.z} loot ${lootPath}`);
			}

			//CREATIVE BYPASS
			if (!player.isCreative()) {
				if (lootItem == 'kubejs:gluttonous_chest') {
					player.damageHeldItem(event.hand, 1)
				}
			}
			if (lootItem != 'kubejs:gluttonous_chest') {
				itemCreativeBypass(event, lootItem);
			}
		}
}

function specialEvent(event, lootItem, lootSound) {
	const {	player,	server,	item, level } = event
		
		if (item.id == Item.of(lootItem)) {
			//COOLDOWN
			addICooldown(event, lootItem, 20);
			
			//EVENT
			server.runCommandSilent(`execute as ${player.username} in ${level.dimension} run open_gateway ${player.username} ${randomize(gateways)}`);
			
			//SOUND EFFECT
			server.runCommandSilent(`playsound ${lootSound} master ${player.username} ${player.x} ${player.y} ${player.z} 1`);
			
			//CREATIVE BYPASS
			itemCreativeBypass(event, lootItem);
		}
}

let gateways = [
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

let baseBoxSound = ['grimoireofgaia:box_open', 'grimoireofgaia:bag_open'];
let rusticSound = ['alexscaves:copper_valve_creak_on', 'alexscaves:copper_valve_creak_off'];

let foodLoot = 'rogue:chests/loot/food';
let foodChestSound = ['artifacts:entity.mimic.hurt', 'artifacts:entity.mimic.death', 'aether:block.chest_mimic.open', 'alexscaves:forsaken_bite', 'alexscaves:grottoceratops_attack'];

ItemEvents.rightClicked(event => {
	let player = event.player;

	for (let i of global.createBox) {
		let boxName = i.name.toLowerCase();
		let soundEffect = i.sound;
		let particlesEffect = i.particles ? i.particles : false;
		
		if (!i.special_event) {
			if (!soundEffect) {
				if (boxName == 'makeshift') lootEvent(event, 'kubejs:' + boxName + '_box', randomize(baseBoxSound), 'rogue:suprise_boxes/' + boxName, i.particles);
				if (boxName == 'rustic') lootEvent(event, 'kubejs:' + boxName + '_box', randomize(rusticSound), 'rogue:suprise_boxes/' + boxName, i.particles);
			} else {
				lootEvent(event, 'kubejs:' + boxName + '_box', soundEffect, 'rogue:suprise_boxes/' + boxName, i.particles);
			}
		} else {
			if (boxName == 'glitched') {
				if (Math.random() < 0.92) {
					lootEvent(event, 'kubejs:' + boxName + '_box', soundEffect, 'rogue:suprise_boxes/' + boxName, i.particles);
				} else {
					specialEvent(event, 'kubejs:' + boxName + '_box', soundEffect);
				}
			}
		}
	}
	lootEvent(event, 'kubejs:gluttonous_chest', randomize(foodChestSound), foodLoot, false);
})