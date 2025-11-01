let pillager_lt = {
	"replace": true,
	"type": "minecraft:entity",
	"random_sequence": "minecraft:entities/pillager",
	"pools": [{
		"rolls": 1.0,
		"bonus_rolls": 0.0,
		"entries": [{
			"type": "minecraft:tag",
			"functions": [{
					"function": "minecraft:set_count",
					"count": {
						"type": "minecraft:uniform",
						"min": 0.0,
						"max": 2.0
					},
					"add": false
				},
				{
					"function": "minecraft:looting_enchant",
					"count": {
						"type": "minecraft:uniform",
						"min": 0.0,
						"max": 1.0
					}
				}
			],
			"name": 'forge:nuggets/silver',
			"expand": true
		}]
	}]
}

ServerEvents.highPriorityData(event => {
	event.addJson(`minecraft:loot_tables/entities/pillager.json`, pillager_lt)
})