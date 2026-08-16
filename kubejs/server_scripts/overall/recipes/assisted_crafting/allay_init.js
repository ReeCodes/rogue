PlayerEvents.tick(event => {
	const { player } = event;
	if (!player || player.level.clientSide || player.age % 50 !== 0) return;
	let level = player.level;
	
	let nearbyAllays = findNearbyEntitiesCloseToPlayer(level, player, 'minecraft:allay', 2, 4);
	
	if (nearbyAllays.length === 0) {
		let anyKeySet = global.assistedCrafting.some(craft => {
			let idName = craft.tool.split(':')[1];
			return getPersistentBoolean(player, 'ac_' + idName, false);
		});
		
		if (anyKeySet) {
			for (let craft of global.assistedCrafting) {
				let idName = craft.tool.split(':')[1];
				removePersistentData(player, 'ac_' + idName);
			}
			player.setStatusMessage(
				Text.of("Assisted Crafting: ").color("#fcec03")
					.append(Text.of("\uE814 ").white())
					.append(Text.of("out of range!").red())
			);
		}
		return;
	}
	
	let allay = nearbyAllays.length > 1
		? (getClosestInRange(player, nearbyAllays, assistedCraftingRange) || nearbyAllays[0])
		: nearbyAllays[0];
	
	for (let craft of global.assistedCrafting) {
		let allayItem = craft.tool;
		let idName = allayItem.split(':')[1];
		let key = 'ac_' + idName;
		let held = allay.getItemBySlot($EquipmentSlot.MAINHAND);
		let holdingCorrect = held?.id === allayItem;
		let currentlyHolding = getPersistentBoolean(player, key, false);
		
		if (holdingCorrect !== currentlyHolding) {
			if (holdingCorrect) {
				player.setStatusMessage(
					Text.of("Assisted Crafting: ").color("#fcec03")
						.append(Text.of("\uE814 ").white())
						.append(Text.of("holding ").color("#fcec03"))
						.append(Text.of(Utils.snakeCaseToTitleCase(idName)).color("#00d9fa"))
				);
				setPersistentBoolean(player, key, true);
			} else {
				player.setStatusMessage(
					Text.of("Assisted Crafting: ").color("#fcec03")
						.append(Text.of("\uE814 ").white())
						.append(Text.of("not holding an item!").red())
				);
				removePersistentData(player, key);
			}
		}
	}
});