ServerEvents.highPriorityData(event => {
    let createOreFeature = (size, airDiscard, ores) => ({
        "type": "minecraft:ore",
        "config": {
            "size": size,
            "discard_chance_on_air_exposure": airDiscard,
            "targets": ores.map(ore => ({
                "target": ore.probability !== undefined ? {
                    "predicate_type": "minecraft:random_block_match",
                    "block": ore.block,
                    "probability": ore.probability
                } : {
                    "predicate_type": "minecraft:block_match",
                    "block": ore.block
                },
                "state": { "Name": ore.oreBlock }
            }))
        }
    });

    let placeOreFeature = (key, rarity, shape, maxRange, minRange) => ({
        "feature": `rogue:${key}_vein`,
        "placement": [
            {
                "type": "minecraft:rarity_filter",
                "chance": rarity
            },
            {
                "type": "minecraft:in_square"
            },
            {
                "type": "minecraft:height_range",
                "height": {
                    "type": shape,
                    "max_inclusive": {
                        "absolute": maxRange
                    },
                    "min_inclusive": {
                        "absolute": minRange
                    }
                }
            },
            {
                "type": "minecraft:biome"
            }
        ]
    });

    let createBiomeModifier = (key) => ({
        "type": "forge:add_features",
        "biomes": "#minecraft:is_overworld",
        "features": `rogue:${key}_vein`,
        "step": "underground_ores"
    });

    let features = {
        "iron_nickel": {
            oreConfig: createOreFeature(48, 0.35, [
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
                rarity: 25,
				shape: "minecraft:trapezoid",
                maxRange: 24,
                minRange: -64
            }
        },
        "lead_silver": {
            oreConfig: createOreFeature(48, 0.35, [
                { block: "minecraft:stone", probability: 0.03, oreBlock: "embers:raw_lead_block" },
                { block: "minecraft:deepslate", probability: 0.05, oreBlock: "embers:raw_lead_block" },
                { block: "minecraft:stone", probability: 0.03, oreBlock: "embers:raw_silver_block" },
                { block: "minecraft:deepslate", probability: 0.05, oreBlock: "embers:raw_silver_block" },
                { block: "minecraft:stone", probability: 0.5, oreBlock: "embers:silver_ore" },
                { block: "minecraft:deepslate", probability: 0.5, oreBlock: "embers:deepslate_silver_ore" },
                { block: "minecraft:stone", oreBlock: "embers:lead_ore" },
                { block: "minecraft:deepslate", oreBlock: "embers:deepslate_lead_ore" }
            ]),
            placeConfig: {
                rarity: 22,
				shape: "minecraft:trapezoid",
                maxRange: 64,
                minRange: -28
            }
        },
        "uranium_uraninite": {
            oreConfig: createOreFeature(32, 0.85, [
                { block: "minecraft:stone", probability: 0.02, oreBlock: "immersiveengineering:raw_block_uranium" },
                { block: "minecraft:deepslate", probability: 0.04, oreBlock: "immersiveengineering:raw_block_uranium" },
                { block: "minecraft:stone", probability: 0.5, oreBlock: "powah:uraninite_ore_poor" },
                { block: "minecraft:deepslate", probability: 0.5, oreBlock: "powah:deepslate_uraninite_ore_poor" },
				{ block: "minecraft:stone", probability: 0.2, oreBlock: "powah:uraninite_ore" },
                { block: "minecraft:deepslate", probability: 0.25, oreBlock: "powah:deepslate_uraninite_ore" },
				{ block: "minecraft:stone", probability: 0.12, oreBlock: "powah:uraninite_ore_dense" },
                { block: "minecraft:deepslate", probability: 0.15, oreBlock: "powah:deepslate_uraninite_ore_dense" },
                { block: "minecraft:stone", oreBlock: "immersiveengineering:ore_uranium" },
                { block: "minecraft:deepslate", oreBlock: "immersiveengineering:deepslate_ore_uranium" }
            ]),
            placeConfig: {
                rarity: 44,
				shape: "minecraft:very_biased_to_bottom",
                maxRange: 10,
                minRange: -60
            }
        },
        "copper_tin": {
            oreConfig: createOreFeature(64, 0.08, [
                { block: "minecraft:stone", probability: 0.04, oreBlock: "minecraft:raw_copper_block" },
                { block: "minecraft:deepslate", probability: 0.06, oreBlock: "minecraft:raw_copper_block" },
                { block: "minecraft:stone", probability: 0.02, oreBlock: "thermal:raw_tin_block" },
                { block: "minecraft:deepslate", probability: 0.04, oreBlock: "thermal:raw_tin_block" },
                { block: "minecraft:stone", probability: 0.5, oreBlock: "minecraft:copper_ore" },
                { block: "minecraft:deepslate", probability: 0.5, oreBlock: "minecraft:deepslate_copper_ore" },
                { block: "minecraft:stone", oreBlock: "thermal:tin_ore" },
                { block: "minecraft:deepslate", oreBlock: "thermal:deepslate_tin_ore" }
            ]),
            placeConfig: {
                rarity: 20,
				shape: "minecraft:biased_to_bottom",
                maxRange: 48,
                minRange: -64
            }
        }
    };

    for (let [key, feature] of Object.entries(features)) {
        let oreConfig = feature.oreConfig;
        let placeConfig = feature.placeConfig;
        event.addJson(`rogue:worldgen/configured_feature/${key}_vein.json`, oreConfig);
        event.addJson(`rogue:worldgen/placed_feature/${key}_vein.json`, placeOreFeature(key, placeConfig.rarity, placeConfig.shape, placeConfig.maxRange, placeConfig.minRange));
        event.addJson(`rogue:forge/biome_modifier/add_${key}_vein.json`, createBiomeModifier(key));
    }
});