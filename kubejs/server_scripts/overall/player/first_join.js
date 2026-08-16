const skilltree_version = 6;

PlayerEvents.loggedIn(event => {
	const { player, server } = event;
	
	if (!getPersistentBoolean(player, 'starting_items', false)) {
		player.give(Item.of('eccentrictome:tome', '{"eccentrictome:items":[{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"ad_astra:astrodux"}},{Count:1b,id:"alexsmobs:animal_dictionary"},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"apotheosis:apoth_chronicle"}},{Count:1b,id:"ars_nouveau:worn_notebook"},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"industrialforegoing:industrial_foregoing"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"buildinggadgets2:buildinggadgets2book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"modularrouters:book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"convivium:book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"pneumaticcraft:book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"bloodmagic:guide"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"naturesaura:book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"sushigocrafting:sushigocrafting"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"twilightdelight:twilight_guide"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"caupona:book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"goety:black_book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"goety:witches_brew"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"psi:encyclopaedia_psionica"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"dimdungeons:guide_book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"elementalcraft:element_book"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"productivebees:guide"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"hexcasting:thehexbook"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"enderio:guide"}},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"thermal:guidebook"}},{Count:1b,id:"feywild:feywild_lexicon"},{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"grimoireofgaia:gaiapedia"}},{Count:1b,id:"cloudstorage:guide_book"},{Count:1b,id:"eidolon:codex"},{Count:1b,id:"embers:ancient_codex"},{Count:1b,id:"immersiveengineering:manual"},{Count:1b,id:"integrateddynamics:on_the_dynamics_of_integration"},{Count:1b,id:"modonomicon:modonomicon",tag:{"modonomicon:book_id":"theurgy:the_hermetica"}},{Count:1b,id:"powah:book"},{Count:1b,id:"occultism:dictionary_of_spirits",tag:{"modonomicon:book_id":"occultism:dictionary_of_spirits"}}],"eccentrictome:version":2}'))
		player.give(Item.of('minecraft:potion', 16, '{Potion:"minecraft:water",Purity:3}'))
		player.give('kubejs:gluttonous_chest')
		player.give('kubejs:nothingness');
		setPersistentBoolean(player, 'starting_items', true);
	};
	
	if (!getPersistentBoolean(player, 'luggage', false)) {
		let pUUID = player.nbt.UUID;
		let luggage = player.level.createEntity("luggage:luggage");
		luggage.mergeNbt(`{Owner:${pUUID}}`);
		luggage.x = player.x;
		luggage.y = player.y;
		luggage.z = player.z;
		luggage.spawn();
		setPersistentBoolean(player, 'luggage', true);
	};
	
	let pData = player.getPersistentData();
	
	if (pData.contains('skilltree_version')) {
		let currentVersion = getPersistentInt(player, 'skilltree_version', 0);
		if (currentVersion !== skilltree_version) {
			server.runCommandSilent(`execute as ${player.username} run puffish_reset`);
			setPersistentInt(player, 'skilltree_version', skilltree_version);
		}
	} else {
		setPersistentInt(player, 'skilltree_version', skilltree_version);
	}
})