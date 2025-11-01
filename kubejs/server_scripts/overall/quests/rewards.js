FTBQuestsEvents.customReward('472DFD56C18719BD', event => {
	const { player, server } = event
	server.runCommandSilent(`execute as ${player.username} run publish false survival`)
})