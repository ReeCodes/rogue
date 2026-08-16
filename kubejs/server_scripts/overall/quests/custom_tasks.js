// HEALTH QUESTS
const healthQuests = [
	[100, '3FD294778CAE3400'],
	[300, '62A2B8521C7318A5'],
	[600, '451F36FB9784BE0D']
];

function registerHealthQuest(threshold, taskID) {
	FTBQuestsEvents.customTask(taskID, event => {
		event.setMaxProgress(threshold);
		event.setCheckTimer(400);
		event.setEnableButton(true);
		event.setCheck((task, player) => {
			if (isFakePlayer(player) || task.progress >= threshold) return;
			task.progress = Math.min(player.maxHealth + (player.getAbsorptionAmount() || 0), threshold);
		});
	});
}

for (const [threshold, taskID] of healthQuests) {
	registerHealthQuest(threshold, taskID);
}

// MOUNT HEIGHT QUESTS
const mountQuests = [
	{ taskID: '2637C9786B140F06', minY: 100, vehicles: entityRegex(['immersive_aircraft:.*']) },
	{ taskID: '48A44AD54A4F1733', minY: 150, vehicles: ['immersive_aircraft:biplane'] },
	{ taskID: '0AE5474451690DC4', minY: 200, vehicles: ['man_of_many_planes:economy_plane', 'man_of_many_planes:scarlet_biplane', 'immersive_aircraft:bamboo_hopper'] },
	{ taskID: '6527F4A47F447521', minY: 200, vehicles: ['alexscaves:subterranodon'] }
];

function matchesVehicle(vehicles, vehicleType) {
	return (vehicles instanceof RegExp)
		? vehicles.test(vehicleType)
		: vehicles.includes(vehicleType);
}

function registerMountQuest(quest) {
	FTBQuestsEvents.customTask(quest.taskID, event => {
		event.setMaxProgress(quest.minY);
		event.setCheckTimer(400);
		event.setCheck((task, player) => {
			if (isFakePlayer(player) || task.progress >= quest.minY) return;
			
			let rootVehicle = player.getRootVehicle();
			if (!rootVehicle.hasPassenger(player)) return;
			
			if (matchesVehicle(quest.vehicles, rootVehicle.getType())) {
				task.progress = Math.min(Math.max(player.y, 0), quest.minY);
			}
		});
	});
}

for (const quest of mountQuests) {
	registerMountQuest(quest);
}

// SPECIAL BALD-EAGLE QUEST
FTBQuestsEvents.customTask('306474F0DF86D367', event => {
	event.setMaxProgress(600);
	event.setCheckTimer(300);
	event.setEnableButton(true);
	event.setCheck((task, player) => {
		if (isFakePlayer(player) || task.progress >= 600) return;
		
		let level = player.level;
		let eagleEntities = level.entities.filterSelector(`@e[type=alexsmobs:bald_eagle]`)
			.filter(entity => isTamedBy(entity, player).tamed && entity.nbt.HasCap == 1);
		
		if (eagleEntities.length === 0) {
			task.progress = 0;
			return;
		}
		
		let bestLaunchTime = 0;
		for (let baldEagle of eagleEntities) {
			let launchTime = baldEagle.nbt.LaunchTime ?? 0;
			if (launchTime > bestLaunchTime) bestLaunchTime = launchTime;
		}
		
		task.progress = Math.min(bestLaunchTime, 600);
	});
});



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

const detectionQuests = [
	{
		taskID: '5D3CD2236CCBF635',
		prereqAny: ['7F548D4CA44C4388', '63735B5FD2DC4796'],
		entityType: 'species:spectre',
		check: (entity, player) => isTamedBy(entity, player).tamed && entity.nbt.Type == 'hulking_spectre'
	},
	{
		taskID: '069675355CD1E139',
		prereqAny: ['4488F91C0461630A'],
		entityType: 'whaleborne:hullback',
		check: (entity) => isHullbackClean(entity)
	},
	{
		taskID: '0F80291110DB5EAE',
		prereqAny: ['4488F91C0461630A'],
		entityType: 'whaleborne:hullback',
		check: (entity) => hasSaddle(entity)
	},
	{
		taskID: '0B2397BFB9F65CD5',
		prereqAny: ['4488F91C0461630A'],
		entityType: 'whaleborne:hullback',
		check: (entity) => isBoated(entity)
	},
	{
		taskID: '72CBAD503889F198',
		prereqAny: ['52B7CED353169C0E'],
		entityType: 'alexscaves:vallumraptor',
		check: (entity) => entity.nbt.RelaxedTime >= 1
	},
	{
		taskID: '60E41D3C0C9F67F9',
		prereqAny: ['106E1FE1F3B52A7F'],
		entityType: 'alexsmobs:gorilla',
		check: (entity, player) => isTamedBy(entity, player).tamed
	},
	{
		taskID: '670B9CF038ECDC1F',
		prereqAny: ['79B93C32676C1B48'],
		entityType: 'alexsmobs:crow',
		check: (entity, player) => isTamedBy(entity, player).tamed
	}
];

const MIN_DIST = 4;
const MAX_DIST = 6;

function registerDetectionQuest(quest) {
	FTBQuestsEvents.customTask(quest.taskID, event => {
		event.setMaxProgress(1);
		event.setCheckTimer(600);
		event.setEnableButton(true);
		event.setCheck((task, player) => {
			if (task.progress >= 1) return;
			if (!quest.prereqAny.some(id => hasCompletedQuest(player, id))) return;
			
			let level = player.level;
			let nearbyEntities = findNearbyEntitiesCloseToPlayer(level, player, quest.entityType, MIN_DIST, MAX_DIST);
			
			for (let entity of nearbyEntities) {
				if (!entity || entity.getType() !== quest.entityType) continue;
				if (quest.check(entity, player)) {
					task.progress = 1;
				}
				break;
			}
		});
	});
}

for (const quest of detectionQuests) {
	registerDetectionQuest(quest);
}