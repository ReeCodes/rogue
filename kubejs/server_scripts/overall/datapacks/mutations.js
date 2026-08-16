let mutationJSON = (entityType, resultEntityType, options) => {
	let json = {
		"entityType": entityType,
		"resultEntityType": resultEntityType
	};

	if (options.mutatedSoundEvent) json.mutatedSoundEvent = options.mutatedSoundEvent;
	if (options.requiredBiomes) json.requiredBiomes = options.requiredBiomes;
	if (options.requiredEffects) json.requiredEffects = options.requiredEffects;

	if (options.screenShake) {
		json.screenShake = {
			"amount": options.screenShake.amount,
			"duration": options.screenShake.duration,
			"range": options.screenShake.range
		};
	}

	json.spawnsNaturally = options.spawnsNaturally;
	json.naturalSpawnChance = options.naturalSpawnChance;

	return json;
};

function createMutation(event, entityType, settings, index) {

	let [resultMod, resultName] = settings.resultEntityType.split(":");

	let fileName = resultMod === 'mutantmore'
		? resultName
		: `${resultMod}_${resultName}`;

	if (typeof settings.suffix === 'string') {
		fileName += `_${settings.suffix}`;
	}

	else if (settings.suffix !== false && index > 0) {
		let [sourceMod, sourceName] = entityType.split(":");
		fileName += `_from_${sourceMod}_${sourceName}`;
	}

	event.addJson(`mutantmore:mutation_type/${fileName}.json`, mutationJSON(entityType, settings.resultEntityType, settings));
}

let allMutations = [
	{
		entities: ["minecraft:blaze", "specialmobs:blaze"],
		resultEntityType: "mutantmore:mutant_blaze",
		mutatedSoundEvent: "mutantmore:entity.mutant_blaze.intro",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 150
	},
	{
		entities: ["minecraft:zombie"],
		resultEntityType: "mutantmore:mutant_frozen_zombie",
		suffix: "vanilla",
		requiredBiomes: "mutantmore:vanilla_mutant_frozen_zombie_required_biomes",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 100
	},
	{
		entities: ["specialmobs:zombie"],
		resultEntityType: "mutantmore:mutant_frozen_zombie",
		suffix: "specialmobs",
		requiredBiomes: "mutantmore:vanilla_mutant_frozen_zombie_required_biomes",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 100
	},
	{
		entities: ["minecraft:zombie"],
		resultEntityType: "mutantmore:mutant_jungle_zombie",
		suffix: "vanilla",
		requiredBiomes: "mutantmore:vanilla_mutant_jungle_zombie_required_biomes",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 100
	},
	{
		entities: ["specialmobs:zombie"],
		resultEntityType: "mutantmore:mutant_jungle_zombie",
		suffix: "specialmobs",
		requiredBiomes: "mutantmore:vanilla_mutant_jungle_zombie_required_biomes",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 100
	},
	{
		entities: ["minecraft:husk", "specialmobs:huskzombie"],
		resultEntityType: "mutantmore:mutant_husk",
		mutatedSoundEvent: "mutantmore:entity.mutant_husk.intro",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 100
	},
	{
		entities: ["minecraft:hoglin", "minecraft:zoglin"],
		resultEntityType: "mutantmore:mutant_hoglin",
		mutatedSoundEvent: "minecraft:entity.hoglin.ambient",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 120
	},
	{
		entities: ["minecraft:wither_skeleton", "specialmobs:witherskeleton"],
		resultEntityType: "mutantmore:mutant_wither_skeleton",
		mutatedSoundEvent: "mutantmore:entity.mutant_wither_skeleton.roar",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 90
	},
	{
		entities: ["minecraft:shulker"],
		resultEntityType: "mutantmore:mutant_shulker",
		mutatedSoundEvent: "mutantmore:entity.mutant_shulker.roar",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 120
	},
	{
		entities: ["minecraft:creeper", "specialmobs:creeper"],
		resultEntityType: "mutantmonsters:mutant_creeper",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 120
	},
	{
		entities: ["minecraft:enderman", "specialmobs:enderman"],
		resultEntityType: "mutantmonsters:mutant_enderman",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 200
	},
	{
		entities: ["minecraft:skeleton", "specialmobs:skeleton"],
		resultEntityType: "mutantmonsters:mutant_skeleton",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 120
	},
	{
		entities: ["minecraft:snow_golem"],
		resultEntityType: "mutantmonsters:mutant_snow_golem",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 60
	},
	{
		entities: ["minecraft:zombie", "specialmobs:zombie"],
		resultEntityType: "mutantmonsters:mutant_zombie",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 120
	},
	{
		entities: ["minecraft:pig"],
		resultEntityType: "mutantmonsters:mutant_spider_pig",
		requiredEffects: "mutantmore:mutantmonsters_spider_pig_required_effects",
		screenShake: { amount: 0.05, duration: 26, range: 25 },
		spawnsNaturally: true,
		naturalSpawnChance: 250
	}
];

ServerEvents.highPriorityData(event => {
	allMutations.forEach(settings => {
		settings.entities.forEach((entityType, index) => {
			createMutation(event, entityType, settings, index);
		});
	});
});