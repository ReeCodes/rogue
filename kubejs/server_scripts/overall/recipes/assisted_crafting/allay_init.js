ItemEvents.entityInteracted(event => {
	const { player, target, server, item, hand } = event;
	
	if (target.type !== 'minecraft:allay') return;
	
	let allayHeld = target.getItemBySlot($EquipmentSlot.MAINHAND);
	if (!allayHeld || allayHeld.isEmpty()) {

        let heldByPlayer = item;

        for (let craft of global.assistedCrafting) {
            if (heldByPlayer?.id === craft.tool) {

				if (!player.stages.has('allay_interacted')) player.stages.add('allay_interacted');
				return;
            }
        }
    }
})

PlayerEvents.tick(event => {
	const { player } = event;
	if (!player || player.level.clientSide || player.age % 50 !== 0) return;
	let level = player.level;
	
	if (!player.stages.has('allay_interacted')) return;
	let nearbyAllays = findNearbyEntitiesCloseToPlayer(level, player, 'minecraft:allay', 2, 4);
	
	if (nearbyAllays.length === 0) {

		for (let craft of global.assistedCrafting) {
			let idName = craft.tool.split(':')[1];
			let stage = 'ac_' + idName;
			if (player.stages.has(stage)) player.stages.remove(stage);
		}

		player.setStatusMessage(
			Text.of("Assisted Crafting: ").color("#fcec03")
				.append(Text.of("\uE814 ").white())
				.append(Text.of("out of range!").red())
		);
		player.stages.sync();
		return;
	}
	
	let allay = (nearbyAllays.length > 1)
        ? (getClosestEntity(player, nearbyAllays, playerAllayACSearchRange) || nearbyAllays[0])
        : nearbyAllays[0];
		
	for (let craft of global.assistedCrafting) {

        let allayItem = craft.tool;
        let idName = allayItem.split(':')[1];
        let acStage = 'ac_' + idName;

        let held = allay.getItemBySlot($EquipmentSlot.MAINHAND);
        let holdingCorrect = (held?.id === allayItem);

        let currentlyHasStage = player.stages.has(acStage);

        if (holdingCorrect !== currentlyHasStage) {

            if (holdingCorrect) {
                player.setStatusMessage(
                    Text.of("Assisted Crafting: ").color("#fcec03")
                        .append(Text.of("\uE814 ").white())
                        .append(Text.of("holding ").color("#fcec03"))
                        .append(Text.of(Utils.snakeCaseToTitleCase(idName)).color("#00d9fa"))
                );
                player.stages.add(acStage);
            }
            else {
                player.setStatusMessage(
                    Text.of("Assisted Crafting: ").color("#fcec03")
                        .append(Text.of("\uE814 ").white())
                        .append(Text.of("not holding an item!").red())
                );
                player.stages.remove(acStage);
                player.stages.remove('allay_interacted');
            }
        }
    }
    player.stages.sync();
});
