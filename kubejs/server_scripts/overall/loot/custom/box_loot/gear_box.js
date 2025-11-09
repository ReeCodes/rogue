ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/gear', table => {
		table.addPool(pool => {
			pool.rolls = 2;
			
			//CONDITIONED
			pool.addItem('create:precision_mechanism', 15).addCondition(cond_entity_advancement('create:precision_mechanism'))
			pool.addItem('create:super_glue', 13).addFunction(func_set_dmg(0.45, 0.7)).addCondition(cond_entity_advancement('create:super_glue'))
			pool.addItem('create:cogwheel', 30, [4, 12]).addCondition(cond_entity_advancement('create:andesite_alloy'))
			pool.addItem('create:shaft', 32, [8, 16]).addCondition(cond_entity_advancement('create:andesite_alloy'))
			pool.addItem('create:belt_connector', 25, [1, 3]).addCondition(cond_entity_advancement('create:andesite_alloy'))
			
			pool.addItem('modularrouters:modular_router', 11).addCondition(cond_entity_advancement('rogue:rogue/unlock_modular_router'))
			Ingredient.of(['/modularrouters:.+(augment$|module$|upgrade$|filter$)/']).subtract(Ingredient.of([
				'modularrouters:creative_module'
			])).stacks.forEach(item => {
				pool.addItem(item, 2, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_modular_router'))
			})
			
			pool.addItem('ae2:logic_processor', 30, [2, 8]).addCondition(cond_entity_advancement('rogue:rogue/unlock_inscriber'))
			pool.addItem('ae2:calculation_processor', 28, [2, 8]).addCondition(cond_entity_advancement('rogue:rogue/unlock_inscriber'))
			pool.addItem('ae2:engineering_processor', 8, [1, 4]).addCondition(cond_entity_advancement('rogue:rogue/unlock_inscriber'))
			
			pool.addItem('ae2:cell_component_1k', 20, [2, 5]).addCondition(cond_entity_advancement('rogue:rogue/unlock_the_system'))
			pool.addItem('ae2:cell_component_4k', 16, [2, 5]).addCondition(cond_entity_advancement('rogue:rogue/unlock_the_system'))
			
			pool.addItem('powah:capacitor_basic', 26, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_low_generator'))
			pool.addItem('powah:capacitor_basic_large', 20, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_low_generator'))
			pool.addItem('powah:capacitor_hardened', 14, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_powah_end'))
			pool.addItem('powah:capacitor_blazing', 8, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_powah_end'))
			pool.addItem('powah:capacitor_spirited', 4, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_powah_end'))
			pool.addItem('powah:capacitor_nitro', 3, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_powah_end'))
			
			//MAIN
			pool.addItem('create:crafting_blueprint', 19, [1, 2])
			pool.addItem('industrialforegoing:machine_frame_pity', 15)
			pool.addItem('powah:dielectric_paste', 25, [12, 24])
			Ingredient.of(['/thermal:(quartz|copper|iron|lead|silver|tin)_gear/']).stacks.forEach(item => {
				pool.addItem(item, 5, [1, 2])
			})
			Ingredient.of(['/thermal:(nickel|gold)_gear/']).stacks.forEach(item => {
				pool.addItem(item, 4, [1, 2])
			})
			Ingredient.of(['/thermal:(emerald|diamond)_gear/']).stacks.forEach(item => {
				pool.addItem(item, 3, [1, 2]).addCondition(cond_entity_advancement('minecraft:story/mine_diamond'))
			})
		})
	})
})