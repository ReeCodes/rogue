ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/bloated', table => {
		//MAIN
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('ironchests:iron_dolly', 8)
			pool.addItem('ironchests:blank_chest_upgrade', 30)
			pool.addItem('ironchests:copper_chest_upgrade', 20)
			pool.addItem('ironchests:iron_chest_upgrade', 15)
			pool.addItem('ironchests:gold_chest_upgrade', 12)
			pool.addItem('ironchests:diamond_chest_upgrade', 6).addCondition(cond_entity_advancement('minecraft:story/mine_diamond'))
			//UPGRADES
			pool.addItem('functionalstorage:copper_upgrade', 20)
			pool.addItem('functionalstorage:gold_upgrade', 12)
			pool.addItem('functionalstorage:redstone_upgrade', 25)
			pool.addItem('functionalstorage:iron_downgrade', 20)
			pool.addItem('functionalstorage:void_upgrade', 20)
			pool.addItem('functionalstorage:collector_upgrade', 10)
			pool.addItem('functionalstorage:puller_upgrade', 15)
			pool.addItem('functionalstorage:pusher_upgrade', 15)
			
		})
		//CONTAINERS
		table.addPool(pool => {
			pool.rolls = 1;
			Ingredient.of(['/functionalstorage:(oak|spruce|birch|jungle|acacia|dark_oak|crimson|warped|mangrove|cherry).+/']).stacks.forEach(item => {
				pool.addItem(item.id, 2, [1, 2])
			})
			pool.addItem('labels:label', 30, [4, 6])
			pool.addItem('ironchests:lock', 20, [2, 4])
			pool.addItem('cloudstorage:balloon_bit', 10, [1, 4]).addCondition(cond_entity_advancement('cloudstorage:cloudstorage/balloon'))
		})
	})
})