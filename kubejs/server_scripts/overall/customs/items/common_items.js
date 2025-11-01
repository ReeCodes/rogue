ItemEvents.rightClicked(event => {
	const { player, server, item } = event
	
	let iPetal = 'kubejs:enlightened_petal';
	
	//PETAL
	if (item.id == iPetal) {
		addItemCooldown(player, iPetal, 20);
		useItem(player, iPetal);
		let cTree = randomize(SKILL_TREES);		
		server.runCommandSilent(`puffish_skills experience add ${player.username} ${cTree} 100`);
		server.runCommandSilent(`playsound minecraft:block.chorus_flower.death master ${player.username} ${player.x} ${player.y} ${player.z} 1`);
	}
})