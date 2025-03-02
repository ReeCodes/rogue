//priority: 500

function randomize(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function titleCase(string) {
	let array = string.split(" ");
	array.forEach((word, index) => {
		array[index] = word.charAt(0).toUpperCase() + word.slice(1);
	})
	return array.join(" ");
}

function randomize1To3() {
    return Math.floor(Math.random() * 3) + 1;
}

global.sound = (entity, soundId, volume, pitch, shift) => {
    entity.level.runCommandSilent(`playsound ${soundId} player @p ${entity.x} ${entity.y} ${entity.z} ${volume} ${pitch - shift/2 + Math.random() * shift}`);
}

function itemCreativeBypass(event, itemId) {
	let player = event.player;
	if (!player.isCreative()) {
		if (player.getHeldItem('off_hand').id == itemId) player.getHeldItem('off_hand').count--
		if (player.getHeldItem('main_hand').id == itemId) player.getHeldItem('main_hand').count--
	}
}

function addICooldown(event, itemId, cd) {
	let player = event.player;
	player.addItemCooldown(Item.of(itemId), cd)
}