let advancements = [
	'unlock_manasteel',
	'unlock_hellforge',
	'unlock_alchemy_table',
	'unlock_crystallized_will',
	'unlock_inscriber',
	'unlock_the_system',
	'unlock_theurgy',
	'unlock_ember_bore',
	'unlock_exchange_tablet',
	'unlock_modular_router',
	'unlock_low_generator',
	'unlock_powah_end'
];

let rogue_root = ({
	"display": {
		"background": "minecraft:textures/block/deepslate.png",
		"icon": {
			"item": "citadel:icon_item",
			"nbt": "{IconLocation:\"rogue:textures/misc/icon16x16.png\"}"
		},
		"title": `Rogue! - Loot Enhancements`,
		"description": `Welcome to Rogue! Mayhem`,
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

function advHelper(advName) {
	return {
		"display": {
			"icon": { "item": 'ironchests:diamond_chest_upgrade' },
			"title": toTitleCase(advName),
			"description": 'Enhances overall loot acquired by chests or boxes.',
			"frame": "task",
			"show_toast": false,
			"announce_to_chat": false,
			"hidden": false
		},
		"parent": "rogue:rogue/root",
		"criteria": {
			"requirement": { "trigger": "minecraft:impossible" }
		}
	};
}
ServerEvents.highPriorityData(event => {
	// ROOT GENERATION
	event.addJson("rogue:advancements/rogue/root.json", rogue_root);

	// ADVANCEMENTS
	advancements.forEach(advName => event.addJson(`rogue:advancements/rogue/${advName}.json`, advHelper(advName)));
})