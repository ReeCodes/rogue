PlayerEvents.loggedIn(event => {
	const { player, server } = event
	
	let skilltree_version = 3;
	
	if (!player.stages.has('starting_items')) {
		server.runCommandSilent(`item replace entity ${player.username} container.9 with minecraft:potion{Potion:"minecraft:water",Purity:3} 12`)
		server.runCommandSilent(`item replace entity ${player.username} container.10 with kubejs:gluttonous_chest 1`)
		player.give(Item.of('eccentrictome:tome', '{"eccentrictome:mods":{ad_astra:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"ad_astra:astrodux"}}},alexsmobs:{0:{Count:1b,id:"alexsmobs:animal_dictionary"}},apotheosis:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"apotheosis:apoth_chronicle"}}},ars_nouveau:{0:{Count:1b,id:"ars_nouveau:worn_notebook"}},bloodmagic:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"bloodmagic:guide"}}},botania:{0:{Count:1b,id:"botania:lexicon"}},buildinggadgets2:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"buildinggadgets2:buildinggadgets2book"}}},caupona:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"caupona:book"}}},cloudstorage:{0:{Count:1b,id:"cloudstorage:guide_book"}},convivium:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"convivium:book"}}},dimdungeons:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"dimdungeons:guide_book"}}},eidolon:{0:{Count:1b,id:"eidolon:codex"}},elementalcraft:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"elementalcraft:element_book"}}},embers:{0:{Count:1b,id:"embers:ancient_codex"}},feywild:{0:{Count:1b,id:"feywild:feywild_lexicon"}},goety:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"goety:black_book"}},1:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"goety:witches_brew"}}},immersiveengineering:{0:{Count:1b,id:"immersiveengineering:manual"}},industrialforegoing:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"industrialforegoing:industrial_foregoing"}}},integrateddynamics:{0:{Count:1b,id:"integrateddynamics:on_the_dynamics_of_integration"}},irons_spellbooks:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"irons_spellbooks:iss_guide_book"}}},modonomicon:{0:{Count:1b,id:"modonomicon:modonomicon",tag:{"modonomicon:book_id":"theurgy:the_hermetica"}}},naturesaura:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"naturesaura:book"}}},occultism:{0:{Count:1b,id:"occultism:dictionary_of_spirits",tag:{"modonomicon:book_id":"occultism:dictionary_of_spirits"}}},pneumaticcraft:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"pneumaticcraft:book"}}},powah:{0:{Count:1b,id:"powah:book"}},productivebees:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"productivebees:guide"}}},securitycraft:{0:{Count:1b,id:"securitycraft:sc_manual"}},sushigocrafting:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"sushigocrafting:sushigocrafting"}}},twilightdelight:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"twilightdelight:twilight_guide"}}}}}'))
		player.give('kubejs:nothingness')
		player.give('ftbquests:book')
		player.stages.add('starting_items')
	};
	
	if (!player.stages.has('luggage')) {
		let pUUID = player.getNbt().UUID
		let luggage = player.level.createEntity("luggage:luggage")
		luggage.setCustomName(`${player.username}'s Accomplice`)
		luggage.mergeNbt(`{Owner:${pUUID}}`)
		luggage.spawn()
		player.stages.add('luggage')
	};
	
	if (player.persistentData?.skilltree_version != skilltree_version) {
		let pBrawler = server.runCommandSilent(`puffish_skills experience get ${player.username} puffish_skills:brawler`);
		let pScorcery = server.runCommandSilent(`puffish_skills experience get ${player.username} puffish_skills:sorcery`);
		let pAdventure = server.runCommandSilent(`puffish_skills experience get ${player.username} puffish_skills:adventure`);
		if (pBrawler >= 1 || pScorcery >= 1 || pAdventure >= 1) {
			server.runCommandSilent(`execute as ${player.username} run puff_reset`);
		}
		player.persistentData.skilltree_version = skilltree_version;
	};
})