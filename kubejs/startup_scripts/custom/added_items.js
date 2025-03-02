StartupEvents.registry('item', event => {
	//SPECIAL
	event.create('torn_pocket').displayName('§6Torn Pocket').rarity("epic").texture('kubejs:item/special/torn_pocket');
	event.create('time_essence').displayName('§6Essence Of Time').rarity("epic").texture('kubejs:item/special/time_essence');
	event.create('enlightened_petal').displayName('§6Enlightened Petal').rarity("epic").texture('kubejs:item/special/enlightened_petal').unstackable();
	event.create('purifying_rune').displayName('§6Purifying Rune').rarity("epic").texture('kubejs:item/special/purifying_rune').unstackable();

	//SIZE-POWDERS
	event.create('dust_size_down').displayName('Stew Of Ensmallening').maxDamage(16).texture('kubejs:item/special/dust_size_down');
	event.create('dust_size_up').displayName('Stew Of Enbiggening').maxDamage(16).texture('kubejs:item/special/dust_size_up');
	
	//GLUTTY, THE CHEST
	event.create('gluttonous_chest').displayName('§6Gluttonous Chest').rarity("epic").maxDamage(8).texture("kubejs:item/loot_boxes/box_of_food")
	
	//NOTHINGNESS
	event.create('nothingness').displayName('Nothingness')
		.unstackable()
		.use((level, player, hand) => true)
		.useAnimation("bow")
		.useDuration((itemstack) => 32)
		.finishUsing((itemstack, level, entity) => {
			if (!level.isClientSide()) {
				Utils.server.scheduleInTicks(100, () => {
					if (entity.player) global.spreadPlayer(entity)
				})
				return itemstack;
			}
	}).texture('kubejs:item/special/nothingness');
	
	// BOXES
	global.createBox = [
		{name: 'Makeshift', rarity: 'common'}, 
		{name: 'Rustic'}, 
		{name: 'Oxidized', sound: 'artifacts:entity.mimic.hurt',}, 
		{name: 'Bloated', rarity: 'rare', sound: 'cloudstorage:balloon_pop'},
		{name: 'Jewelled', rarity: 'epic', sound: 'chimes:block.amethyst.shimmer'}, 
		{name: 'Gear', rarity: 'rare', sound: 'ad_astra:wrench', no_texture: true}, 
		{name: 'Glitched', rarity: 'epic', sound: 'farlanders:item.mystic_wand.cast_invis', special_event: true}, 
		{name: 'Mischievous', sound: 'blue_skies:entity.crogre.idle_happy', no_texture: true}, 
		{name: 'Stylish', sound: 'farlanders:item.mystic_wand.cast_ore', no_texture: true},
		{name: 'Druidic', rarity: 'rare', sound: 'malum:alchemical_trinket_equipped', particles: 'occultism:ritual_waiting'}, 
		{name: 'Floral', rarity: 'rare', sound: 'galosphere:block.lumiere.compost', particles: 'autumnity:falling_maple_leaf'}
	];

	global.createBox.forEach(box => {
		let boxName = box.name.toLowerCase();
		if (!box.rarity) box.rarity = 'uncommon';
		if (!box.no_texture) {
			event.create(boxName + '_box').displayName({ translate: 'item.kubejs.'+boxName+'_box' }).rarity(box.rarity).texture('kubejs:item/loot_boxes/' + boxName + '_box');
		} else {
			event.create(boxName + '_box').displayName({ translate: 'item.kubejs.'+boxName+'_box' }).texture('kubejs:item/loot_boxes/nyt_box');
		}
	});
})

global.spreadPlayer = entity => {
	var offHandItem = entity.getHeldItem('off_hand');
	var mainHandItem = entity.getHeldItem('main_hand');
	if (mainHandItem.id == 'kubejs:nothingness' || offHandItem.id == 'kubejs:nothingness') {
		if (offHandItem.id == 'kubejs:nothingness') offHandItem.count--;
		if (mainHandItem.id == 'kubejs:nothingness') mainHandItem.count--;
		if (Utils.server.minecraftServer) Utils.server.tell(`§e${entity.username}§r used Nothingness`);
		entity.setStatusMessage(Text.of(`This might take a while...`).yellow())
		Utils.server.runCommandSilent(`playsound minecraft:block.glass.break master ${entity.username} ${entity.x} ${entity.y} ${entity.z} 1`)
		Utils.server.runCommandSilent(`execute as ${entity.username} run spreadplayers ~ ~ 5000 10000 false ${entity.username}`)
		entity.addItemCooldown('kubejs:nothingness', 1500)
	}
}