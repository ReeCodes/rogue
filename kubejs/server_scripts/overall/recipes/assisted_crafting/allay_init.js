function assistedCrafting(event, allayItem, additionalDistance) {
	
	additionalDistance = additionalDistance || 10;
	let totalDistance = Math.pow(additionalDistance, 2);
	
	
		let allays = event.level.getEntities().filterSelector(`@e[type=minecraft:allay]`);

		if (allays.length === 0 || event.level.players.length === 0) {
			return;
		}

		for (let player of event.level.players) {
			let nearAllay = false;

			for (let allay of allays) {
				if (allay.getNbt()?.HandItems[0]?.id == allayItem) {
				if (allay.distanceToEntitySqr(player) <= totalDistance) {
					nearAllay = true;
					break;
					}
				}
			}
			
			let allayStage = 'ac_'+allayItem.substring(allayItem.indexOf(':') + 1);
			let allayItemOnly = allayItem.substring(allayItem.indexOf(':') + 1);
			
			if (player.stages.has(allayStage) != nearAllay) {
				if (nearAllay) {
					player.setStatusMessage(Text.of('Assisted Crafting: ').color('#fcec03').append(Text.of('\uE814').white()).append(Text.of(`holding `).color('#fcec03')).append(Text.of(`${Utils.snakeCaseToTitleCase(allayItemOnly)}`).color('#00d9fa')))
					player.stages.add(allayStage);
				} else {
					player.setStatusMessage(Text.of('Assisted Crafting: ').color('#fcec03').append(Text.of(`Out Of Range!`).red()));  // Added closing parentheses
					player.stages.remove(allayStage);
				}
				player.stages.sync();
			}
		}
}

LevelEvents.tick(event => {
	global.assistedCrafting.forEach(c => {
		assistedCrafting(event, c.tool);
	})
})