LevelEvents.tick(event => {
	const { level } = event;
	if (level.clientSide) return;
	if (level.time % 20 !== 0) return;

	global.assistedCrafting.forEach(c => {
		let allayItem = c.tool;
		let allayStage = 'ac_' + allayItem.substring(allayItem.indexOf(':') + 1);
		let allayItemOnly = allayItem.substring(allayItem.indexOf(':') + 1);

		let allays = level.entities.filterSelector(`@e[type=minecraft:allay]`);
		if (allays.length === 0 || level.players.length === 0) return;

		for (let player of level.players) {
			let nearAllay = false;

			for (let allay of allays) {
				if (allay?.nbt?.HandItems[0]?.id && allay.nbt.HandItems[0].id == allayItem) {
					if (allay.distanceToEntitySqr(player) <= Math.pow(12, 2)) {
						nearAllay = true;
						break;
					}
				}
			}
			if (player.stages.has(allayStage) != nearAllay) {
				if (nearAllay) {
					player.setStatusMessage(
						Text.of('Assisted Crafting: ').color('#fcec03')
							.append(Text.of('\uE814 ').white())
							.append(Text.of('holding ').color('#fcec03'))
							.append(Text.of(Utils.snakeCaseToTitleCase(allayItemOnly)).color('#00d9fa'))
					);
					player.stages.add(allayStage);
				} else {
					player.setStatusMessage(
						Text.of('Assisted Crafting: ').color('#fcec03')
							.append(Text.of('\uE814 ').white())
							.append(Text.of('out of range!').red())
					);
					player.stages.remove(allayStage);
				}
				player.stages.sync();
			}
		}
	});
});
