if (Platform.isClientEnvironment()) {
    ClientEvents.init(event => {
		let $RollEvents = Java.loadClass("net.combatroll.api.event.ServerSideRollEvents");
		let $PlayerRollEvent = Java.loadClass("net.combatroll.api.event.ServerSideRollEvents$PlayerStartRolling");
        $RollEvents.PLAYER_START_ROLLING.register(new JavaAdapter($PlayerRollEvent, {
            onPlayerStartedRolling: function (player, velocity) {
                global.onPlayerStartedRolling(player, velocity)
            }
        }))
    })
	global.onPlayerStartedRolling = (player, velocity) => {
        player.sendData('player_roll', {})
    };
}