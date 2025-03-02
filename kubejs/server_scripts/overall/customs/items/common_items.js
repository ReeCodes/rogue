ItemEvents.rightClicked(event => {
	const { player, server, item } = event
	
	let skillTrees = [
		'puffish_skills:brawler',
		'puffish_skills:sorcery',
		'puffish_skills:adventure'
	];
	
	let iRune = 'kubejs:purifying_rune';
	let iPetal = 'kubejs:enlightened_petal';
	
	//RUNE
	if (item.id == iRune) {
		addICooldown(event, iRune, 80);
		itemCreativeBypass(event, iRune);
		server.runCommandSilent(`execute as ${player.username} run puff_reset`);
		server.runCommandSilent(`playsound malum:void_transmutation master ${player.username} ${player.x} ${player.y} ${player.z} 1`);
	}
	
	//PETAL
	if (item.id == iPetal) {
		addICooldown(event, iPetal, 20);
		itemCreativeBypass(event, iPetal);
		
		let cTree = randomize(skillTrees);		
		
		server.runCommandSilent(`puffish_skills experience add ${player.username} ${cTree} 100`);
		server.runCommandSilent(`playsound minecraft:block.chorus_flower.death master ${player.username} ${player.x} ${player.y} ${player.z} 1`);
	}
})