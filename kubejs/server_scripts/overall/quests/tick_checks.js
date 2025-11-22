PlayerEvents.tick(event => {
	const {	player,	level } = event
	if (player.age % 100 !== 0) return;
		
		//HEALTH - QUESTS
		if (player.maxHealth >= 100) simpleQuestComplete(player, '3FD294778CAE3400');
		if (player.maxHealth >= 300) simpleQuestComplete(player, '62A2B8521C7318A5');
		if (player.maxHealth >= 600) simpleQuestComplete(player, '451F36FB9784BE0D');
		
		//DIMENSION QUESTS
		if (player.level.dimensionKey == 'minecraft:overworld' && player.y <= 10 && player.block.down == 'minecraft:bedrock') {
			simpleQuestComplete(player, '1F1A0B5E5F71A6AD');
		}

		//SPECIAL MOUNT HEIGHT QUESTS
		let hasRootVehicle = player.nbt?.RootVehicle;
		if (!hasRootVehicle) return;
		let rootVehicle = hasRootVehicle?.Entity?.id;
		if (rootVehicle == 'immersive_aircraft:gyrodyne' ||
			rootVehicle == 'immersive_aircraft:airship' ||
			rootVehicle == 'immersive_aircraft:airship' ||
			rootVehicle == 'immersive_aircraft:quadrocopter' &&
			player.y >= 100) {
			simpleQuestComplete(player, '2637C9786B140F06')
		}

		if (rootVehicle == 'immersive_aircraft:biplane' && player.y >= 150) {
			simpleQuestComplete(player, '48A44AD54A4F1733')
		}

		if (rootVehicle == 'man_of_many_planes:economy_plane' ||
			rootVehicle == 'man_of_many_planes:scarlet_biplane' &&
			player.y >= 200) {
				simpleQuestComplete(player, '0AE5474451690DC4')
		}
		
		if (rootVehicle == 'alexscaves:subterranodon' && 
			player.y >= 200) {
			simpleQuestComplete(player, '6527F4A47F447521')
		}
})