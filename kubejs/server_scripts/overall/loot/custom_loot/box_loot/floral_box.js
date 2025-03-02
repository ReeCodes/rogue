ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/floral', table => {
		//MATERIALS
		table.addPool(pool => {
			pool.rolls = 2;
			Ingredient.of([
				'botania:fertilizer',
				'botania:livingwood_twig',
				'botania:red_string',
				'botania:mana_string',
				'botania:vine_ball',
				'naturesaura:crimson_meal'
			]).stacks.forEach(stack => {
				pool.addItem(stack.id, 6, [2, 8])
			})
			Ingredient.of([
				'botania:mana_diamond',
				'botania:manasteel_ingot',
				'botania:mana_pearl',
				'botania:mana_string'
			]).stacks.forEach(stack => {
				pool.addItem(stack.id, 2, [1, 2]).addCondition(cond_entity_advancement('botania:main/rune_pickup'))
			})
			pool.addItem('naturesaura:infused_iron', 1, [2, 4]).addCondition(cond_entity_advancement('naturesaura:infused_materials'))
			pool.addItem('naturesaura:sky_ingot', 1, [2, 4]).addCondition(cond_entity_advancement('naturesaura:offering'))
		})
		//MAIN
		table.addPool(pool => {
			pool.rolls = 3;
			Ingredient.of(['/botania:.+(mystical_flower$|double_flower$)/']).stacks.forEach(stack => {
				pool.addItem(stack.id, 3, [2, 6])
			})
			Ingredient.of([
				'/botania:.+_seeds/',
				'botania:fel_pumpkin',
				'botaniaadditions:regen_ivy',
				'botania:keep_ivy'
			]).stacks.forEach(stack => {
				pool.addItem(stack.id, 1)
			})
			Ingredient.of([
				'botania:bellethorn_chibi',
				'botania:agricarnation_chibi',
				'botania:hopperhock_chibi',
				'botania:rannuncarpus_chibi',
				'botania:clayconia_chibi',
				'botania:solegnolia_chibi'
			]).stacks.forEach(stack => {
				pool.addItem(stack.id, 1).addCondition(cond_entity_advancement('botania:main/functional_flower'))
			})
			pool.addItem('naturesaura:pet_reviver', 1).addCondition(cond_entity_advancement('naturesaura:offering'))
			pool.addItem('naturesaura:break_prevention', 1).addCondition(cond_entity_advancement('naturesaura:offering'))
			Ingredient.of([
				'naturesaura:token_euphoria',
				'naturesaura:token_terror',
				'naturesaura:token_rage',
				'naturesaura:token_grief'
			]).stacks.forEach(stack => {
				pool.addItem(stack.id, 1, [1, 2]).addCondition(cond_entity_advancement('naturesaura:offering'))
			})
			Ingredient.of([
				'naturesaura:token_joy',
				'naturesaura:token_fear',
				'naturesaura:token_anger',
				'naturesaura:token_sorrow'
			]).stacks.forEach(stack => {
				pool.addItem(stack.id, 3, [1, 2]).addCondition(cond_entity_advancement('naturesaura:wood_stand'))
			})

			Ingredient.of([
				'@botania'
			]).and(Ingredient.of([
				'/botania:rune_.+/'
			])).stacks.forEach(stack => {
				pool.addItem(stack.id, 3, [1, 3]).addCondition(cond_entity_advancement('botania:main/rune_pickup'))
			})

			Ingredient.of([
				'@mythicbotany'
			]).and(Ingredient.of([
				'/mythicbotany:.+_rune/'
			])).stacks.forEach(stack => {
				pool.addItem(stack.id, 1, [1, 3]).addCondition(cond_entity_advancement('botania:main/gaia_guardian_kill'))
			})
		})
	})
})