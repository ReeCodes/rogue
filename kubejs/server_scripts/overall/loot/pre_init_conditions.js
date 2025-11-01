// priority: 300

const cond_kbp = ({
	"condition": "minecraft:killed_by_player"
})

const cond_rChance = (chance) => ({
	"condition": "minecraft:random_chance",
	"chance": chance
})

const cond_rChance_looting = (chance, lootMultiplier) => ({
	"condition": "minecraft:random_chance_with_looting",
	"chance": chance,
	"looting_multiplier": lootMultiplier
})

const cond_location = (predicates) => {
	var predicateList = [];

	for (let i = 0; i < predicates.length; i++) {
		var predicateType = predicates[i].predicateType;
		var ids = predicates[i].ids;
		var predicatesOfType = [];

		if (predicateType == 'biome') {
			predicatesOfType = ids.map(id => ({
				"biome": id
			}));
		} else if (predicateType == 'feature') {
			predicatesOfType = ids.map(id => ({
				"feature": id
			}));
		} else if (predicateType == 'dimension') {
			predicatesOfType = ids.map(id => ({
				"dimension": id
			}));
		}

		predicateList = predicateList.concat(predicatesOfType);
	}

	return {
		"condition": "minecraft:any_of",
		"terms": predicateList.map(predicate => ({
			"condition": "minecraft:entity_properties",
			"entity": "this",
			"predicate": {
				"location": predicate
			}
		}))
	}
}

const cond_entity_advancement = (adv) => {
	var advancement = {
		"condition": "minecraft:entity_properties",
		"entity": "this",
		"predicate": {
			"type": "minecraft:player",
			"type_specific": {
                  "type": "player",
                  "advancements": {}
                }
		}
	};
	advancement.predicate.type_specific.advancements[adv] = true;
	return advancement;
};