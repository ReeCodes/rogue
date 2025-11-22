PlayerEvents.loggedIn(event => {
	const { player, server } = event;
	
	if (!player.stages.has('starting_items')) {
		server.runCommandSilent(`item replace entity ${player.username} container.9 with minecraft:potion{Potion:"minecraft:water",Purity:3} 12`);
		server.runCommandSilent(`item replace entity ${player.username} container.10 with kubejs:gluttonous_chest 1`);
		player.give(Item.of('eccentrictome:tome', '{"eccentrictome:mods":{ad_astra:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"ad_astra:astrodux"}}},alexsmobs:{0:{Count:1b,id:"alexsmobs:animal_dictionary"}},apotheosis:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"apotheosis:apoth_chronicle"}}},ars_nouveau:{0:{Count:1b,id:"ars_nouveau:worn_notebook"}},bloodmagic:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"bloodmagic:guide"}}},botania:{0:{Count:1b,id:"botania:lexicon"}},buildinggadgets2:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"buildinggadgets2:buildinggadgets2book"}}},caupona:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"caupona:book"}}},cloudstorage:{0:{Count:1b,id:"cloudstorage:guide_book"}},convivium:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"convivium:book"}}},dimdungeons:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"dimdungeons:guide_book"}}},eidolon:{0:{Count:1b,id:"eidolon:codex"}},elementalcraft:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"elementalcraft:element_book"}}},embers:{0:{Count:1b,id:"embers:ancient_codex"}},feywild:{0:{Count:1b,id:"feywild:feywild_lexicon"}},goety:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"goety:black_book"}},1:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"goety:witches_brew"}}},hexcasting:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"hexcasting:thehexbook"}}},immersiveengineering:{0:{Count:1b,id:"immersiveengineering:manual"}},industrialforegoing:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"industrialforegoing:industrial_foregoing"}}},integrateddynamics:{0:{Count:1b,id:"integrateddynamics:on_the_dynamics_of_integration"}},irons_spellbooks:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"irons_spellbooks:iss_guide_book"}}},modonomicon:{0:{Count:1b,id:"modonomicon:modonomicon",tag:{"modonomicon:book_id":"theurgy:the_hermetica"}}},naturesaura:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"naturesaura:book"}}},occultism:{0:{Count:1b,id:"occultism:dictionary_of_spirits",tag:{"modonomicon:book_id":"occultism:dictionary_of_spirits"}}},pneumaticcraft:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"pneumaticcraft:book"}}},powah:{0:{Count:1b,id:"powah:book"}},productivebees:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"productivebees:guide"}}},securitycraft:{0:{Count:1b,id:"minecraft:air"}},sushigocrafting:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"sushigocrafting:sushigocrafting"}}},twilightdelight:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"twilightdelight:twilight_guide"}}}}}'))
		player.give('kubejs:nothingness');
		player.stages.add('starting_items');
	};
	
	if (!player.stages.has('luggage')) {
		let pUUID = player.nbt.UUID;
		let luggage = player.level.createEntity("luggage:luggage");
		luggage.setCustomName(`${player.username}'s Accomplice`);
		luggage.mergeNbt(`{Owner:${pUUID}}`);
		luggage.x = player.x;
		luggage.y = player.y;
		luggage.z = player.z;
		luggage.spawn();
		player.stages.add('luggage');
	};
	
	if (player.persistentData?.skilltree_version < 5) {
		player.give(Item.of('minecraft:snowball', 64, "{display:{Name:'{\"text\":\"<rainb>OLD-SCALED REMOVER<rainb>\"}'},tag:\"kill_old\"}"));
		player.tell(
			Text.of("Your world used the old mob scaling system.\n\n" +
				"Mobs that spawned before this update might have unbalanced attributes and health - they are able to kill you instantly or endure a lot of damage.\n")
			.red()
			.append(
				Text.of(
					"About the new scaling system:\n" +
					"- Mob attributes now scale dynamically whenever a player enters or re-enters an area. This applies to both hostile and non-hostile mobs, including tamed pets.\n" +
					"- Example: If you tamed a pet while the difficulty modifier was [2], you can right-click it later to update its stats to match the current modifier. This also heals your pet.\n" +
					"- To prevent abuse, this sync comes with a "+PET_SYNC_ABSOLUTE_CD+"-second cooldown. This feature also only works for pets that you own yourself.\n\n" +
					"Recommendation:\n" +
					"It’s best to remove old pre-scaling mobs (even tamed ones or those carrying items).\n" +
					"Make sure to collect any items from mobs with inventories first.\n\n"
				).color("#fcba03")
			)
			.append(
				Text.of("You have been given ")
				.color("#fcba03")
			)
			.append(
				Text.of("64x snowballs ")
				.red()
			)
			.append(
				Text.of("which when thrown will remove all old-scaled mobs in a 200 block radius.")
				.color("#fcba03")
			)
		);
	}
	
	if (player.persistentData?.skilltree_version && (player.persistentData?.skilltree_version != skilltree_version)) {
		server.runCommandSilent(`execute as ${player.username} run puffish_reset`);
		player.persistentData.skilltree_version = skilltree_version;
	};
})

//SCALER KILLER
ItemEvents.rightClicked(event => {
	const { player, server, item } = event;
	if (item?.nbt?.tag == 'kill_old') {
		let list = 0;
		server.entities.filter(e => e && !!e.persistentData.changed_attributes && !e.isPlayer() && e.distanceToEntitySqr(player) <= Math.pow(200, 2)).forEach(entity => {
			list += 1;
			entity.kill();
		});
		player.setStatusMessage(Text.of('[OLD-SCALED REMOVER] ').red().append(Text.of('/ Killed: ').aqua()).append(Text.of(list.toFixed(0)).red()));
	}
})