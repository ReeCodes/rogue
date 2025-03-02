const $AnvilApply = Java.loadClass("net.minecraftforge.event.entity.player.AnvilRepairEvent");

ForgeEvents.onEvent($AnvilApply, event => {
	global.anvilApply(event)
})

global.anvilApply = event => {
	let player = event.entity;
	if (/.+elementalcraft:\{jewel:.+\}.+/.test(event.output.nbt)) {
		player.data.ftbquests.addProgress('0DC2F94E32B5B42F', 1)
	}
}