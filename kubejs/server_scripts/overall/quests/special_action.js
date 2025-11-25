//priority: 20

// POTION CHECK
global.MobEffectAdded = (event, effectId) => {
	let player = event.entity;
	if (isFakePlayer(player)) return;
	if (player.isPlayer()) {
		if (effectId == "occultism:third_eye") simpleQuestComplete(player, "6A3B780F1FC5232B");
		if (effectId == "minecraft:fire_resistance") simpleQuestComplete(player, "025A519AF6945B42");
		if (effectId == "alexscaves:deepsight") simpleQuestComplete(player, "19F73C4CDCD8235E");
		if (effectId == "alexscaves:sugar_rush") simpleQuestComplete(player, "68B25C8ACCD9E370");
		if (effectId == "allyeffect:allyship") simpleQuestComplete(player, "26370CA5DAAB9F56");
		if (effectId == "irons_rpg_tweaks:drowsy") simpleQuestComplete(player, "5414CD09900DC010");
	}
}

// SERVER CHECK
PlayerEvents.loggedIn(event => {
	const { player, server } = event;
	
	if (isFakePlayer(player)) return;
	if (!server.minecraftServer) {
		simpleQuestComplete(player, '527A5EAFAEEEAC1B')
	}
})

// SPECIAL BALD-EAGLE QUEST
ItemEvents.firstLeftClicked(event => {
	const {	level, server, item, player } = event;
	
	if (isFakePlayer(player)) return;
	
	if (item.id == 'alexsmobs:falconry_glove') {
		let eagleEntities = level.entities.filterSelector(`@e[type=alexsmobs:bald_eagle]`).filter(entity => isTamedBy(entity, player).tamed && entity.nbt.HasCap == 1);
		if (eagleEntities.length === 0) return;
		for (let baldEagle of eagleEntities) {
			server.scheduleInTicks(601, () => {
				if (baldEagle.nbt.LaunchTime >= 600 && baldEagle.nbt.HasCap == 1) {
					simpleQuestComplete(player, '306474F0DF86D367');
				}
			})
		}
	}
})

// HURT
EntityEvents.hurt(event => {
	let source = event.source?.actual;
	if (isFakePlayer(source)) return;
	const {	level, server, entity } = event;
		
	//TREMORSAURUS STUN
	if (source?.mainHandItem == Item.of('alexscaves:primitive_club') && entity.type == 'alexscaves:tremorsaurus') {
		server.scheduleInTicks(1, () => {
			if (entity.nbt?.ActiveEffects?.some(e => e["forge:id"] == 'alexscaves:stunned')) simpleQuestComplete(source, '71AACB5B150D754A');
		})
	}

	//SPECIAL POSSESSION QUEST
	if (source?.mainHandItem == Item.of('alexscaves:totem_of_possession') && entity.tags != 'resists_totem_of_possession') {
		simpleQuestComplete(source, '6F77AA460DC9D6B6');
	}
		
	//GINGERBREAD MAN
	if (entity.type == 'alexscaves:gingerbread_man') {
		simpleQuestComplete(source, '625E88F19B51255D');
	}
})

EntityEvents.death(event => {
	let source = event.source?.actual;
	if (isFakePlayer(source)) return;
	const {	level, server, entity } = event;
		
	//DESPOIL KILL
	if (source?.mainHandItem?.id == Item.of('biomancy:despoil_sickle') || !!(Array.isArray(source?.mainHandItem?.nbt?.Enchantments) && source?.mainHandItem?.nbt?.Enchantments?.some(enchant => enchant.id == "biomancy:despoil"))) {
		simpleQuestComplete(source, '1624298920C7C612');	
	}
		
	//FLESH BLOB KILL
	if (['biomancy:flesh_blob', 'biomancy:hungry_flesh_blob', 'biomancy:legacy_flesh_blob', 'biomancy:primordial_flesh_blob', 'biomancy:primordial_hungry_flesh_blob'].includes(entity.type)) {
		simpleQuestComplete(source, '5FFC34ACCC0F4E32');
	}
})

ItemEvents.rightClicked(event => {
	const { player, item } = event;
	
	if (isFakePlayer(player)) return;
	
	//AC Floater
    if (item.id == 'alexscaves:floater') simpleQuestComplete(player, '3F80D0223B517E84');
	
	//AC Codex
	if (item.id == 'alexscaves:cave_codex') simpleQuestComplete(player, '327E361C62833D5F');
	
	//BM Orb
	if (/bloodmagic:.+bloodorb$/.test(item.id)) simpleQuestComplete(player, '33A9401D7A9A7A10');
	
	//AN GLYPH
	if (/ars_.*:.*glyph.*/.test(item.id)) simpleQuestComplete(player, '4547300A9B5BA937');
})

BlockEvents.rightClicked(event => {
	const { block, hand, player, server } = event;
	
	if (isFakePlayer(player)) return;
	
	let blockData = block.entityData;
	let handItem = player.mainHandItem;
	
	//RITUAL-INIT CHECK
	let ritualCheck = (playerItem, ritualData, qID) => {
		if (block.id == 'bloodmagic:masterritualstone' && 
			handItem.id == playerItem && 
			blockData.currentRitual == ritualData && 
			blockData.isRunning) {
			simpleQuestComplete(player, qID);
		}
	}

	ritualCheck('bloodmagic:activationcrystalweak', 'armour_evolve', '49C2A42AFD946886');
	ritualCheck('bloodmagic:activationcrystalweak', 'crystal_split', '34DF335C747A6DC0');
	
	// AETHERWORKS
	if (handItem.id == 'embers:tinker_hammer' && block.id == 'aetherworks:forge_anvil' && blockData.hitTimeout >= 1) {
		server.scheduleInTicks(5, () => {
			simpleQuestComplete(player, '6AEA1DC98BE473A8');
		})
	}
	
	if (handItem.id == 'aetherworks:lexicon' && !!(handItem.nbt?.lexicon_item?.id) && block.id == 'aetherworks:lexicon_receptacle') {
		simpleQuestComplete(player, '750C59424F39B2C4');
	}

	if (block.id == 'biomancy:primordial_cradle' && blockData.SacrificeHandler?.LifeEnergy >= 100) {
		simpleQuestComplete(player, '38D833C5567A1A9D');
	}
})

BlockEvents.broken(event => {
    const { player, block } = event;
	
	if (isFakePlayer(player)) return;
	
	if (block.id == 'minecraft:spawner' && player.mainHandItem?.nbt?.Enchantments && player.mainHandItem?.nbt?.Enchantments.some(e => e.id == "minecraft:silk_touch")) {
		simpleQuestComplete(player, '1FAE1ED7FF14FB95');
	}
	
	if ((/betterarcheology:.*vase.*/.test(block.id))) {
		simpleQuestComplete(player, '742F759983CA266C');
	}
})

// ANVIL APPLY
global.AnvilApply = event => {
	const { entity, output } = event;
	
	if (/.+elementalcraft:\{jewel:.+\}.+/.test(output.nbt)) {
		simpleQuestComplete(entity, '0DC2F94E32B5B42F');
	}
}

function isHullbackClean(entity) {
    if (!entity || !entity.nbt) return false;

    let dirtSections = [
        "HeadDirt",
        "TailDirt",
        "flukeDirt",
        "BodyTopDirt",
        "HeadTopDirt",
        "BodyDirt"
    ];

    for (let section of dirtSections) {
        let data = entity.nbt[section];
        if (!data) continue;

        let allAir = true;

        for (let subKey in data) {
            let blocks = data[subKey];
            if (!Array.isArray(blocks)) continue;

            for (let block of blocks) {
                if (!block || block.Name !== "minecraft:air") {
                    allAir = false;
                    break;
                }
            }

            if (!allAir) break;
        }

        if (allAir) return true;
    }

    return false;
}

function hasSaddle(entity) {
    if (!entity?.nbt?.Items) return false;

    let items = entity.nbt.Items;

    for (let i = 0; i < items.length; i++) {
		let it = items[i];
        if (it && it.id == "minecraft:saddle") {
            return true;
        }
    }

    return false;
}

function isBoated(entity) {
    if (!entity?.nbt?.Items) return false;

    let items = entity.nbt.Items;

    for (let i = 0; i < items.length; i++) {
		let it = items[i];
        if (it && (/.*planks:*/).test(it.id)) {
            return true;
        }
    }

    return false;
}

let minDist = 4;
let maxDist = 6;
let nearbyEntities;

PlayerEvents.tick(event => {
	const {	player } = event;
	if (!player || player.level.clientSide || player.age % 160 !== 0) return;
	
	let level = player.level;
	
	if ((hasCompletedQuest(player, '7F548D4CA44C4388') || hasCompletedQuest(player, '63735B5FD2DC4796')) && !hasCompletedQuest(player, '2B605D3683173D88')) {
		nearbyEntities = findNearbyEntitiesCloseToPlayer(level, player, 'species:spectre', minDist, maxDist, true);
		for (let entity of nearbyEntities) {
			if (!entity || entity.type !== 'species:spectre') continue;		
			levelDetectQuest((isTamedBy(entity, player).tamed && entity.nbt.Type == 'hulking_spectre'), player, '5D3CD2236CCBF635');
			break;
		}
	}
	
	if (hasCompletedQuest(player, '4488F91C0461630A') && !hasCompletedQuest(player, '713BA4BB1DA825B8')) {
		nearbyEntities = findNearbyEntitiesCloseToPlayer(level, player, 'whaleborne:hullback', minDist, maxDist);
		for (let entity of nearbyEntities) {
			if (!entity || entity.type !== 'whaleborne:hullback') continue;		
			levelDetectQuest(isHullbackClean(entity), player, '069675355CD1E139');
			levelDetectQuest(hasSaddle(entity), player,	'0F80291110DB5EAE');
			levelDetectQuest(isBoated(entity), player, '0B2397BFB9F65CD5');
		}
	}
		
	if (hasCompletedQuest(player, '52B7CED353169C0E') && !hasCompletedQuest(player, '263EFC8C4D853891')) {
		nearbyEntities = findNearbyEntitiesCloseToPlayer(level, player, 'alexscaves:vallumraptor', minDist, maxDist);
		for (let entity of nearbyEntities) {
			if (!entity || entity.type !== 'alexscaves:vallumraptor') continue;		
			levelDetectQuest(entity.nbt.RelaxedTime >= 1, player, '72CBAD503889F198');
			break;
		}
	}
		
	if (hasCompletedQuest(player, '106E1FE1F3B52A7F') && !hasCompletedQuest(player, '75362D6074D0F702')) {
		nearbyEntities = findNearbyEntitiesCloseToPlayer(level, player, 'alexsmobs:gorilla', minDist, maxDist);
		for (let entity of nearbyEntities) {
			if (!entity || entity.type !== 'alexsmobs:gorilla') continue;		
			levelDetectQuest(isTamedBy(entity, player).tamed, player, '60E41D3C0C9F67F9');
			break;
		}
	}
		
	if (hasCompletedQuest(player, '79B93C32676C1B48') && !hasCompletedQuest(player, '083DADA621D02290')) {
		nearbyEntities = findNearbyEntitiesCloseToPlayer(level, player, 'alexsmobs:crow', minDist, maxDist);
		for (let entity of nearbyEntities) {
			if (!entity || entity.type !== 'alexsmobs:crow') continue;		
			levelDetectQuest(isTamedBy(entity, player).tamed, player, '670B9CF038ECDC1F');
			break;
		}
	}
})