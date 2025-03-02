ItemEvents.rightClicked(event => {
	const {	player,	server,	item } = event
	
	let pocketItem = 'kubejs:torn_pocket';
	let pocketTypes = ['pocket_left', 'pocket_right'];
	let pocketVersion = 1;
	let maxPockets = 4;
	
	if (item.id == pocketItem) {

		if (player.persistentData.totalPocketAmount == undefined || !player.persistentData.tornPocketVersion == pocketVersion) {
			player.persistentData.totalPocketAmount = 0
			player.persistentData.tornPocketVersion = pocketVersion
			for (let s of pocketTypes) {
				server.runCommandSilent(`curios set ${s} ${player.username} 1`);
			}
		}
		
		if (player.persistentData.totalPocketAmount < maxPockets) {
			player.persistentData.totalPocketAmount++
			player.addItemCooldown(Item.of(pocketItem), 12)
			server.runCommandSilent(`curios add ${randomize(pocketTypes)} ${player.username} 1`)
			server.runCommandSilent(`playsound embers:item.bauble.equip master ${player.username} ${player.x} ${player.y} ${player.z} 1`)
			player.setStatusMessage(Text.of(`${player.persistentData.totalPocketAmount}/${maxPockets}`).gold().append(Text.of(` Pocket Slots unlocked`).color('#c4a9fc')));
			itemCreativeBypass(event, pocketItem);
		}
		
		if (player.persistentData.totalPocketAmount == maxPockets) {
			player.setStatusMessage(Text.of('Unlocked max amount of additional Pocket Slots.').red());
		}		
	}
})