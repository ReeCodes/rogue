const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

// ALL EVENTS
// ANVIL APPLY
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.AnvilRepairEvent", event => {
	global.AnvilApply(event)
});

// CLIENT - SERVER SIDE ROLL
if (Platform.isClientEnvironment()) {
	ClientEvents.init(event => {
		const $RollEvents = Java.loadClass("net.combatroll.api.event.ServerSideRollEvents");
		const $PlayerRollEvent = Java.loadClass("net.combatroll.api.event.ServerSideRollEvents$PlayerStartRolling");
		$RollEvents.PLAYER_START_ROLLING.register(new JavaAdapter($PlayerRollEvent, {
			onPlayerStartedRolling: function (player, velocity) {
				global.onPlayerStartedRolling(player, velocity)
			}
		}))
	});
}

// CRIT HIT
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.CriticalHitEvent", event => {
	global.CritEvent(event);
});

// MOB EFFECT ADDED
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.MobEffectEvent$Added", event => {
	const effectId = String($BuiltInRegistries.MOB_EFFECT.getKey(event.effectInstance.effect));
	global.MobEffectAdded(event, effectId);
});

// ENTITY HURT
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingHurtEvent", event => {
    if (global.DamageEvent) {
        global.DamageEvent(event);
    }
});