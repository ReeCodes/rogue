// priority: 200

const func_ench = (minL, maxL, treasureB) => ({
	"function": "minecraft:enchant_with_levels",
	"levels": {
		"type": "minecraft:uniform",
		"min": minL,
		"max": maxL
	},
    "treasure": treasureB || false
})

const func_loot_ench = (minC, maxC) => ({
	"function": "minecraft:looting_enchant",
	"count": {
		"min": minC,
		"max": maxC
	}
})

const func_set_count = (minC, maxC, addB) => ({
	"function": "minecraft:set_count",
	"count": {
		"type": "minecraft:uniform",
		"min": minC,
		"max": maxC
	},
	"add": addB || false
})

const func_ench_random = (enchantments) => {
    var result = {
        "function": "minecraft:enchant_randomly"
    };
    if (enchantments) {
        result.enchantments = enchantments;
    }
    return result;
};

const func_apply_bonus = (enchantment, bonusMultiplier) => ({
	"function": "minecraft:apply_bonus",
	"enchantment": enchantment,
	"formula": "minecraft:uniform_bonus_count",
	"parameters": {
		"bonusMultiplier": bonusMultiplier
	}
})

const func_set_stew = (stewEffects) => {
	var effectsArray = stewEffects.map(e => {
		return {
			type: e.type,
			duration: {
				max: e.maxD,
				min: e.minD
			}
		};
	});
	return {
		function: "minecraft:set_stew_effect",
		effects: effectsArray
	};
}

const func_set_multiple_stew_effects = ({
	"function": "dungeoncrawl:suspicious_stew"
})

const func_set_potion = (potion) => ({
	"function": "minecraft:set_potion",
	"id": potion
})

const func_set_shield = (shield_level) => ({
	"function": "dungeoncrawl:shield",
	"loot_level": shield_level
})

const func_enchant_levels = (lvls, treasureB) => ({
	"function": "minecraft:enchant_with_levels",
	"levels": lvls,
	"treasure": treasureB ?? false
})

const func_set_dmg = (minD, maxD) => ({
	"function": "minecraft:set_damage",
	"damage": {
		"type": "minecraft:uniform",
		"min": minD,
		"max": maxD
	}
})

const func_limit_count = (lMin, lMax) => ({
	"function": "minecraft:limit_count",
	"limit": {
		"min": lMin,
		"max": lMax
	}
})