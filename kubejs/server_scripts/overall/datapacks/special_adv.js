ServerEvents.highPriorityData(event => {
	let rogue_root = ({
		"display": {
			"background": "minecraft:textures/block/deepslate.png",
			"icon": {
				"item": "citadel:icon_item",
				"nbt": "{IconLocation:\"rogue:textures/misc/icon16x16.png\"}"
			},
			"title": `Rogue! - Quest Unlocks`,
			"description": `Unlocked by completing Quests`,
			"frame": "task",
			"show_toast": false,
			"announce_to_chat": false,
			"hidden": false
		},
		"criteria": {
			"requirement": {
				"trigger": "minecraft:impossible"
			}
		}
	})

	let advHelper = (advName) => ({
		"display": {
			"icon": {
				"item": "citadel:icon_item",
				"nbt": "{IconLocation:\"rogue:textures/pufferfish/symbols/chest.png\"}"
			},
			"title": `${titleCase(advName.replace(/_/g, " "))}`,
			"description": `Grants better loot when using a specific Loot Box`,
			"frame": "task",
			"show_toast": false,
			"announce_to_chat": false,
			"hidden": false
		},
		"parent": "rogue:rogue/root",
		"criteria": {
			"requirement": {
				"trigger": "minecraft:impossible"
			}
		}
	})

	//ROOT GENERATION
	event.addJson(`rogue:advancements/rogue/root.json`, rogue_root);
	let generateAdv = (advName) => {
		event.addJson(`rogue:advancements/rogue/${advName}.json`, advHelper(advName));
	};
	
	//BOTANIA
	generateAdv('unlock_manasteel');
	//BM
	generateAdv('unlock_hellforge');
	generateAdv('unlock_alchemy_table');
	generateAdv('unlock_crystallized_will');
	//AE2
	generateAdv('unlock_inscriber');
	generateAdv('unlock_the_system');
	//THEURGY
	generateAdv('unlock_theurgy');
	//EMBER
	generateAdv('unlock_ember_bore');
	generateAdv('unlock_exchange_tablet');
	//MISC
	generateAdv('unlock_modular_router');
	generateAdv('unlock_low_generator');
	generateAdv('unlock_powah_end');
});