PlayerEvents.tick(event => {
	const {	player,	level } = event
	
	if (player.age % 160 == 0) {
		
		//HEALTH - QUESTS
		if (player.maxHealth >= 100) player.data.ftbquests.addProgress('3FD294778CAE3400', 1);
		if (player.maxHealth >= 300) player.data.ftbquests.addProgress('62A2B8521C7318A5', 1);
		
		//DIMENSION QUESTS
		if (player.level.dimensionKey == 'minecraft:overworld' && player.y <= 10 && player.block.down == 'minecraft:bedrock') {
			player.data.ftbquests.addProgress('1F1A0B5E5F71A6AD', 1);
		}

		if (player.level.dimensionKey == 'minecraft:the_nether' && player.y <= 10) {
			player.data.ftbquests.addProgress('008DD75F2D1100FD', 1);
		}
		
		//STATUS EFFECT CHECK
		if (player.hasEffect('occultism:third_eye')) player.data.ftbquests.addProgress('6A3B780F1FC5232B', 1)
		
		if (player.hasEffect('minecraft:fire_resistance')) player.data.ftbquests.addProgress('025A519AF6945B42', 1)
		
		if (player.hasEffect('alexscaves:deepsight')) player.data.ftbquests.addProgress('19F73C4CDCD8235E', 1)
			
		if (player.hasEffect('alexscaves:sugar_rush')) player.data.ftbquests.addProgress('68B25C8ACCD9E370', 1)

		//SPECIAL MOUNT HEIGHT QUESTS
		if (!player.nbt?.RootVehicle) return;
		if (player.nbt.RootVehicle.Entity.id == 'immersive_aircraft:gyrodyne' ||
			player.nbt.RootVehicle.Entity.id == 'immersive_aircraft:airship' ||
			player.nbt.RootVehicle.Entity.id == 'immersive_aircraft:airship' ||
			player.nbt.RootVehicle.Entity.id == 'immersive_aircraft:quadrocopter') {
			if (player.y >= 100) player.data.ftbquests.addProgress('2637C9786B140F06', 1)
		}

		if (player.nbt.RootVehicle.Entity.id == 'immersive_aircraft:biplane') {
			if (player.y >= 150) player.data.ftbquests.addProgress('48A44AD54A4F1733', 1)
		}

		if (player.nbt.RootVehicle.Entity.id == 'man_of_many_planes:economy_plane' ||
			player.nbt.RootVehicle.Entity.id == 'man_of_many_planes:scarlet_biplane') {
			if (player.y >= 200) player.data.ftbquests.addProgress('0AE5474451690DC4', 1)
		}
		
		if (player.nbt.RootVehicle.Entity.id == 'alexscaves:subterranodon') {
			if (player.y >= 200) player.data.ftbquests.addProgress('6527F4A47F447521', 1)
		}
	}
})