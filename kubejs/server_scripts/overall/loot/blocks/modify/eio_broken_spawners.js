let eio_broken_spawner = {
	"type": "enderio:broken_spawner",
	"conditions": [{
			"block": "minecraft:spawner",
			"condition": "minecraft:block_state_property"
		},
		{
			"condition": "minecraft:random_chance",
			"chance": 0.15
		}
	]
}

ServerEvents.highPriorityData(event => {
	event.addJson(`enderio:loot_modifiers/broken_spawner.json`, eio_broken_spawner)
})