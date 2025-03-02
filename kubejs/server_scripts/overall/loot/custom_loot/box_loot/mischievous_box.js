ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/mischievous', table => {
		table.addPool(pool => {
			pool.rolls = 2;
			//RARE
			pool.addItem('supplementaries:globe', 1)
			pool.addItem('supplementaries:soap_block', 4)
			pool.addItem('supplementaries:feather_block', 8, [1, 2])
			pool.addItem('supplementaries:sugar_cube', 12, [1, 2])
			pool.addItem('supplementaries:blackboard', 18, [2, 4])
			Ingredient.of(['/supplementaries:.+sign_post_.+/']).stacks.forEach(item => {
				pool.addItem(item, 3, [1, 4])
			})
			Ingredient.of([
				'/scholar:.+writable_book/'
			]).stacks.forEach(item => {
				pool.addItem(item, 6)
			})
			//COMMON
			Ingredient.of([
				'supplementaries:jar',
				'supplementaries:goblet',
				'supplementaries:speaker_block',
				'supplementaries:pulley_block',
				'supplementaries:clock_block',
				'supplementaries:notice_board',
				'supplementaries:pedestal',
				'handcrafted:fancy_painting',
				'suppsquared:copper_plaque',
				'suppsquared:gold_plaque',
				'suppsquared:iron_plaque',
				'supplementaries:doormat',
				'supplementaries:bomb',
				'supplementaries:slice_map',
				'supplementaries:faucet',
				'supplementaries:lock_block',
				'supplementaries:dispenser_minecart',
				'supplementaries:bellows',
				'supplementaries:crystal_display',
				'supplementaries:relayer',
				'supplementaries:spring_launcher',
				'supplementaries:wind_vane',
				'supplementaries:crank',
				'supplementaries:cog_block',
				'supplementaries:turn_table',
				'supplementaries:trapped_present',
				'supplementaries:present',
				'supplementaries:item_shelf',
				'supplementaries:statue',
				'supplementaries:hat_stand',
				'supplementaries:planter',
				'supplementaries:flower_box',
				'supplementaries:sack',
				'supplementaries:cage',
				'supplementaries:hourglass'
			]).stacks.forEach(item => {
				pool.addItem(item, 20)
			})
		})
	})
})