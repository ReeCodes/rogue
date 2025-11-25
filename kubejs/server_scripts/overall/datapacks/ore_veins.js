ServerEvents.highPriorityData(event => {

    let createOreFeature = (size, airDiscard, ores) => ({
		"type": "minecraft:ore",
		"config": {
			"size": size,
			"discard_chance_on_air_exposure": airDiscard,
			"targets": ores.map(ore => {
				let target;

				if (ore.tag) {
					target = {
						"predicate_type": "minecraft:tag_match",
						"tag": ore.tag
					};

				} else if (ore.block && ore.probability !== undefined) {
					target = {
						"predicate_type": "minecraft:random_block_match",
						"block": ore.block,
						"probability": ore.probability
					};

				} else if (ore.block) {
					target = {
						"predicate_type": "minecraft:block_match",
						"block": ore.block
					};
				}

				return {
					"target": target,
					"state": { "Name": ore.oreBlock }
				};
			})
		}
	});

    let createPlacement = (key, place, suffix) => ({
        "feature": `rogue:${key}_${suffix}`,
        "placement": [
            {
                "type": "minecraft:rarity_filter",
                "chance": place.rarity
            },
            {
                "type": "minecraft:in_square"
            },
            {
                "type": "minecraft:height_range",
                "height": {
                    "type": place.shape,
                    "max_inclusive": { "absolute": place.maxRange },
                    "min_inclusive": { "absolute": place.minRange }
                }
            },
            { "type": "minecraft:biome" }
        ]
    });

    let createBiomeModifier = (key, suffix, biomes) => ({
        "type": "forge:add_features",
        "biomes": Array.isArray(biomes) ? biomes : biomes ?? "#minecraft:is_overworld",
        "features": `rogue:${key}_${suffix}`,
        "step": "underground_ores"
    });

    const features = {
		"iron_nickel": {
            oreConfig: createOreFeature(24, 0.12, [
                { block: "minecraft:stone", probability: 0.04, oreBlock: "minecraft:raw_iron_block" },
                { block: "minecraft:deepslate", probability: 0.06, oreBlock: "minecraft:raw_iron_block" },
                { block: "minecraft:stone", probability: 0.04, oreBlock: "immersiveengineering:raw_block_nickel" },
                { block: "minecraft:deepslate", probability: 0.06, oreBlock: "immersiveengineering:raw_block_nickel" },
                { block: "minecraft:stone", probability: 0.3, oreBlock: "immersiveengineering:ore_nickel" },
                { block: "minecraft:deepslate", probability: 0.4, oreBlock: "immersiveengineering:deepslate_ore_nickel" },
				{ block: "minecraft:stone", oreBlock: "minecraft:iron_ore" },
                { block: "minecraft:deepslate", oreBlock: "minecraft:deepslate_iron_ore" }
            ]),
            placeConfig: {
                rarity: 16,
				shape: "minecraft:trapezoid",
                maxRange: 24,
                minRange: -64
            }
        },
        "lead_silver": {
            oreConfig: createOreFeature(24, 0.12, [
                { block: "minecraft:stone", probability: 0.03, oreBlock: "embers:raw_lead_block" },
                { block: "minecraft:deepslate", probability: 0.05, oreBlock: "embers:raw_lead_block" },
                { block: "minecraft:stone", probability: 0.03, oreBlock: "embers:raw_silver_block" },
                { block: "minecraft:deepslate", probability: 0.05, oreBlock: "embers:raw_silver_block" },
                { block: "minecraft:stone", probability: 0.5, oreBlock: "embers:silver_ore" },
                { block: "minecraft:deepslate", probability: 0.5, oreBlock: "embers:deepslate_silver_ore" },
                { tag: "minecraft:stone_ore_replaceables", oreBlock: "embers:lead_ore" },
                { tag: "minecraft:deepslate_ore_replaceables", oreBlock: "embers:deepslate_lead_ore" }
            ]),
            placeConfig: {
                rarity: 18,
				shape: "minecraft:trapezoid",
                maxRange: 64,
                minRange: -28
            }
        },
        "decaying": {
            oreConfig: createOreFeature(32, 0.32, [
                { block: "minecraft:stone", probability: 0.02, oreBlock: "immersiveengineering:raw_block_uranium" },
                { block: "minecraft:deepslate", probability: 0.04, oreBlock: "immersiveengineering:raw_block_uranium" },
                { block: "minecraft:stone", probability: 0.5, oreBlock: "powah:uraninite_ore_poor" },
                { block: "minecraft:deepslate", probability: 0.5, oreBlock: "powah:deepslate_uraninite_ore_poor" },
				{ block: "minecraft:stone", probability: 0.2, oreBlock: "powah:uraninite_ore" },
                { block: "minecraft:deepslate", probability: 0.25, oreBlock: "powah:deepslate_uraninite_ore" },
				{ block: "minecraft:stone", probability: 0.12, oreBlock: "powah:uraninite_ore_dense" },
                { block: "minecraft:deepslate", probability: 0.15, oreBlock: "powah:deepslate_uraninite_ore_dense" },
                { tag: "minecraft:stone_ore_replaceables", oreBlock: "immersiveengineering:ore_uranium" },
                { tag: "minecraft:deepslate_ore_replaceables", oreBlock: "immersiveengineering:deepslate_ore_uranium" }
            ]),
            placeConfig: {
                rarity: 16,
				shape: "minecraft:very_biased_to_bottom",
                maxRange: 10,
                minRange: -58
            }
        },
        "radioactive": {
			biomes: "alexscaves:toxic_caves",
            oreConfig: createOreFeature(42, 0.13, [
                { block: "alexscaves:radrock", probability: 0.12, oreBlock: "alexscaves:block_of_uranium" },
                { block: "alexscaves:radrock", probability: 0.9, oreBlock: "alexscaves:radrock_uranium_ore" },
                { block: "alexscaves:radrock", probability: 0.38, oreBlock: "alexscaves:acidic_radrock" },
                { block: "alexscaves:radrock", probability: 0.075, oreBlock: "alexscaves:unrefined_waste" }
            ]),
            placeConfig: {
                rarity: 7,
				shape: "minecraft:very_biased_to_bottom",
                maxRange: 20,
                minRange: -16
            }
        },
        "copper_tin": {
            oreConfig: createOreFeature(32, 0.08, [
                { block: "minecraft:stone", probability: 0.04, oreBlock: "minecraft:raw_copper_block" },
                { block: "minecraft:deepslate", probability: 0.06, oreBlock: "minecraft:raw_copper_block" },
                { block: "minecraft:stone", probability: 0.02, oreBlock: "thermal:raw_tin_block" },
                { block: "minecraft:deepslate", probability: 0.04, oreBlock: "thermal:raw_tin_block" },
                { block: "minecraft:stone", probability: 0.5, oreBlock: "minecraft:copper_ore" },
                { block: "minecraft:deepslate", probability: 0.5, oreBlock: "minecraft:deepslate_copper_ore" },
                { tag: "minecraft:stone_ore_replaceables", oreBlock: "thermal:tin_ore" },
                { tag: "minecraft:deepslate_ore_replaceables", oreBlock: "thermal:deepslate_tin_ore" }
            ]),
            placeConfig: {
                rarity: 9,
				shape: "minecraft:biased_to_bottom",
                maxRange: 100,
                minRange: -10
            }
        },
        "starfall": {
            oreConfig: createOreFeature(56, 0.76, [
                { tag: "minecraft:deepslate_ore_replaceables", oreBlock: "minecraft:deepslate" },
                { block: "minecraft:deepslate", probability: 0.09, oreBlock: "malum:brilliant_deepslate" },
                { block: "minecraft:deepslate", probability: 0.19, oreBlock: "forbidden_arcanus:deepslate_arcane_crystal_ore" },
                { block: "minecraft:deepslate", probability: 0.26, oreBlock: "forbidden_arcanus:xpetrified_ore" },
                { block: "minecraft:deepslate", probability: 0.02, oreBlock: "forbidden_arcanus:stella_arcanum" },
                { block: "minecraft:deepslate", probability: 0.37, oreBlock: "minecraft:deepslate_emerald_ore" },
                { block: "minecraft:deepslate", probability: 0.09, oreBlock: "farlanders:deepslate_endumium_ore" },
                { block: "minecraft:deepslate", probability: 0.13, oreBlock: "minecraft:deepslate_diamond_ore" },
                { block: "minecraft:deepslate", probability: 0.24, oreBlock: "evilcraft:dark_ore_deepslate" },
                { block: "minecraft:deepslate", probability: 0.16, oreBlock: "caverns_and_chasms:deepslate_spinel_ore" },
                { block: "minecraft:deepslate", probability: 0.15, oreBlock: "draconicevolution:deepslate_draconium_ore" }
            ]),
            placeConfig: {
                rarity: 32,
				shape: "minecraft:uniform",
                maxRange: -10,
                minRange: -58
            }
        },
        "magical_starfall": {
			biomes: "#forge:is_magical",
            oreConfig: createOreFeature(64, 0.32, [
				{ tag: "minecraft:deepslate_ore_replaceables", oreBlock: "minecraft:deepslate" },
                { block: "minecraft:deepslate", probability: 0.19, oreBlock: "malum:brilliant_deepslate" },
                { block: "minecraft:deepslate", probability: 0.29, oreBlock: "forbidden_arcanus:deepslate_arcane_crystal_ore" },
                { block: "minecraft:deepslate", probability: 0.36, oreBlock: "forbidden_arcanus:xpetrified_ore" },
                { block: "minecraft:deepslate", probability: 0.12, oreBlock: "forbidden_arcanus:stella_arcanum" },
                { block: "minecraft:deepslate", probability: 0.47, oreBlock: "minecraft:deepslate_emerald_ore" },
                { block: "minecraft:deepslate", probability: 0.19, oreBlock: "farlanders:deepslate_endumium_ore" },
                { block: "minecraft:deepslate", probability: 0.23, oreBlock: "minecraft:deepslate_diamond_ore" },
                { block: "minecraft:deepslate", probability: 0.34, oreBlock: "evilcraft:dark_ore_deepslate" },
                { block: "minecraft:deepslate", probability: 0.26, oreBlock: "caverns_and_chasms:deepslate_spinel_ore" },
                { block: "minecraft:deepslate", probability: 0.25, oreBlock: "draconicevolution:deepslate_draconium_ore" }
            ]),
            placeConfig: {
                rarity: 14,
				shape: "minecraft:uniform",
                maxRange: -10,
                minRange: -58
            }
        }
    };

    for (let [key, feature] of Object.entries(features)) {
		let suffix = feature.suffix ?? "vein";
		let biomes = feature.biomes;

		let configuredFeature = feature.customFeature ?? feature.oreConfig;
		let placement = createPlacement(key, feature.placeConfig, suffix);

		event.addJson(`rogue:worldgen/configured_feature/${key}_${suffix}.json`, configuredFeature);
		event.addJson(`rogue:worldgen/placed_feature/${key}_${suffix}.json`, placement);
		event.addJson(`rogue:forge/biome_modifier/add_${key}_${suffix}.json`, createBiomeModifier(key, suffix, biomes));
	}
});