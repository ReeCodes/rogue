StartupEvents.registry('item', event => {
	
	let registerItem = (name, path, unstackable, maxDamage) => {
		unstackable = unstackable || false;

		let item = event.create(name)
			.displayName({ translate: 'item.kubejs.' + name })
			.texture(`rogue:item/${path}/${name}`);
		if (unstackable) item.unstackable();
		if (maxDamage) item.maxDamage(maxDamage);
	}

	// SPECIAL
	registerItem('enlightened_petal', 'special');
	registerItem('dust_size_down', 'special', false, 16);
	registerItem('dust_size_up', 'special', false, 16);
	registerItem('gluttonous_chest', 'loot_boxes', true, 8);
	
	//TROPHY
	event.create('rogue:completionist_trophy').parentModel('rogue:item/completionist_trophy').displayName('Completionist\'s Trophy');
	
	//NOTHINGNESS
	event.create('nothingness')
		.displayName('Nothingness')
		.unstackable()
		.use((level, player, hand) => true)
		.useAnimation("bow")
		.useDuration((itemstack) => 30)
		.finishUsing((itemstack, level, entity) => {
			if (!level.isClientSide() && entity.player) {
				global.spreadPlayer(entity, level)
			}
			return itemstack;
	}).texture('rogue:item/special/nothingness');
	
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
			event.create(boxName + '_box')
			.displayName({ translate: 'item.kubejs.'+boxName+'_box' })
			.rarity(box.rarity)
			.texture('rogue:item/loot_boxes/' + boxName + '_box');
		} else {
			event.create(boxName + '_box')
			.displayName({ translate: 'item.kubejs.'+boxName+'_box' })
			.texture('rogue:item/loot_boxes/base_box');
		}
	});
})