const $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

// CLIENT EVENTS

// SERVER SIDE ROLL
StartupEvents.init(event => {
	const $RollEvents = Java.loadClass("net.combatroll.api.event.ServerSideRollEvents");
	const $PlayerRollEvent = Java.loadClass("net.combatroll.api.event.ServerSideRollEvents$PlayerStartRolling");
	$RollEvents.PLAYER_START_ROLLING.register(new JavaAdapter($PlayerRollEvent, {
		onPlayerStartedRolling: function (player, velocity) {
			global.onPlayerStartedRolling(player, velocity)
		}
	}))
});

// ALL EVENTS

// ANVIL APPLY
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.AnvilRepairEvent", event => {
	if (global.AnvilApply) {
		global.AnvilApply(event);
	}
});

// CRIT HIT
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.CriticalHitEvent", event => {
	if (global.CritEvent) {
		global.CritEvent(event);
	}
});

// MOB EFFECT ADDED
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.MobEffectEvent$Added", event => {
	const effectId = String($BuiltInRegistries.MOB_EFFECT.getKey(event.effectInstance.effect));
	if (global.MobEffectAdded) {
		global.MobEffectAdded(event, effectId);
	}
});

// ENTITY HURT
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingHurtEvent", event => {
	if (global.DamageEvent) {
		global.DamageEvent(event);
	}
});

// ENTITY MOUNT
ForgeEvents.onEvent("net.minecraftforge.event.entity.EntityMountEvent", event => {
	if (global.EntityMount) {
		global.EntityMount(event);
	}
});

// ANIMAL TAME
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.AnimalTameEvent", event => {
	if (global.EntityTame) {
		global.EntityTame(event);
	}
});

// ENTITY BREED
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.BabyEntitySpawnEvent", event => {
	if (global.BabyEntitySpawn) {
		global.BabyEntitySpawn(event);
	}
});

// POTION REMOVAL
MoreJSEvents.registerPotionBrewing(event => {
	event.removeByPotion(null, null, "irons_rpg_tweaks:drowsy");
	event.addPotionBrewing('minecraft:dried_kelp', "minecraft:awkward", "irons_rpg_tweaks:drowsy");
})