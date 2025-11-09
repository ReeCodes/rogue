function playEffects(server, player, sound, particles) {
    if (particles) {
        server.runCommandSilent(
            `execute as ${player.username} run particle ${particles} ${player.x} ${player.y} ${player.z} 1 2 1 4 45`
        );
    }
    if (sound) {
        server.runCommandSilent(
            `playsound ${sound} master ${player.username} ${player.x} ${player.y} ${player.z} 1`
        );
    }
}

function spawnLoot(server, player, level, lootPath, amount) {
    for (let i = 0; i < amount; i++) {
        server.runCommandSilent(
            `execute as ${player.username} in ${level.dimension} run loot spawn ${player.x} ${player.y} ${player.z} loot ${lootPath}`
        );
    }
}

function calcLootAmountFromLuck(player) {
    let lootAmount = 1;
    let player_luck = player.getAttributeValue('minecraft:generic.luck') || 0;
    player_luck *= 0.12;
    if (Math.random() < player_luck) lootAmount++;
    if (player_luck > 1.0 && Math.random() < (player_luck - 1) * 0.1) lootAmount++;
    return lootAmount;
}

const foodChestSound = [
	'artifacts:entity.mimic.hurt',
	'artifacts:entity.mimic.death',
	'aether:block.chest_mimic.open'
];

ItemEvents.rightClicked(event => {
	const {	player,	server,	item, level } = event;

	for (let box of global.createBox) {
		let boxName = box.name.toLowerCase();
		let boxItem = `kubejs:${boxName}_box`;
		if (item.id !== boxItem) continue;

		let soundEffect = box.sound ?? (
			boxName === 'makeshift' ? randomize(['grimoireofgaia:box_open', 'grimoireofgaia:bag_open']) :
			boxName === 'rustic' ? randomize(['alexscaves:copper_valve_creak_on', 'alexscaves:copper_valve_creak_off']) :
			null
		);
		
		let particles = box.particles ?? false;
		let lootPath = `rogue:suprise_boxes/${boxName}`;

		addItemCooldown(player, boxItem, 20);

		if (box.special_event) {
			if (boxName === 'glitched') {
				playEffects(server, player, soundEffect, particles);
				let chance = Math.random();
				if (chance < 0.91) {					
					spawnLoot(server, player, level, lootPath, calcLootAmountFromLuck(player));
				} else if (chance < 0.94) {
					player.tell('8%')
					//server.runCommandSilent(`execute as ${player.username} in ${level.dimension} run open_gateway ${player.username} ${randomize(allGateways)}`);
				} else if (chance < 0.97) {
					addPlayerMaxCoef(player, 2);
					player.tell([Text.of('\uE729 ').font("symbols_n_stuff:symbols")
						.append(Text.of('[Personal Max Coefficient] ').color(COLOR_ROGUE))
						.append(Text.of('§a+2§f'))
					]);
					player.tell([Text.of('\uE729 ').font("symbols_n_stuff:symbols")
						.append(Text.of('[Personal Max Coefficient] ').color(COLOR_ROGUE))
						.append(Text.of('Current: '))
						.append(Text.of(BASE_MAX_COEF + player.persistentData.player_max_coef).gold())
						.append(Text.of(' (Max: '))
						.append(Text.of(ABSOLUTE_MAX_COEF).gold())
						.append(Text.of(')'))
					]);
				} else {
					addPlayerExtraCoef(player, 2);
					player.tell([Text.of('\uE729 ').font("symbols_n_stuff:symbols")
						.append(Text.of('[Personal Extra Coefficient] ').color(COLOR_ROGUE))
						.append(Text.of('§a+2§f'))
						]);

					player.tell([Text.of('\uE729 ').font("symbols_n_stuff:symbols")
						.append(Text.of('[Personal Extra Coefficient] ').color(COLOR_ROGUE))
						.append(Text.of('Current: '))
						.append(Text.of('+'+player.persistentData.player_extra_coef.toFixed(0)).gold())
						.append(Text.of(' (Max: '))
						.append(Text.of(+ABSOLUTE_MAX_EXTRA_COEF).gold())
						.append(Text.of(')'))
					]);
				}
			}
		} else {
			playEffects(server, player, soundEffect, particles);
			spawnLoot(server, player, level, lootPath, calcLootAmountFromLuck(player));
		}
		useItem(player, boxItem);
		return;
	}

	if (item.id === 'kubejs:gluttonous_chest') {
		addItemCooldown(player, 'kubejs:gluttonous_chest', 20);
		playEffects(server, player, randomize(foodChestSound), false);
		spawnLoot(server, player, level, 'rogue:chests/loot/food', calcLootAmountFromLuck(player));
		if (!player.isCreative()) player.damageHeldItem(event.hand, 1);
	}
});