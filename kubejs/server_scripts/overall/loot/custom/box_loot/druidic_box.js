ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/druidic', table => {
		table.addPool(pool => {
			pool.rolls = [1, 2];
			pool.addItem('minecraft:book', 16).addFunction(func_enchant_levels(30, true))
			pool.addItem('minecraft:book', 20).addFunction(func_enchant_levels(45, true)).addCondition(cond_entity_advancement('apotheosis:enchanting/30ench'))
			pool.addItem('minecraft:book', 28).addFunction(func_enchant_levels(80, true)).addCondition(cond_entity_advancement('apotheosis:enchanting/60ench'))
			pool.addItem('minecraft:book', 36).addFunction(func_enchant_levels(100, true)).addCondition(cond_entity_advancement('apotheosis:enchanting/80ench'))
			Ingredient.of(['/apotheosis:.+_tome/']).stacks.forEach(item => {
				pool.addItem(item.id, 1)
			})
		})
		table.addPool(pool => {
			pool.rolls = 3;
			//BLOOD MAGIC
			Ingredient.of(['/bloodmagic:.+_charge$/']).stacks.forEach(item => {
				pool.addItem(item.id, 2, [1, 4]).addCondition(cond_entity_advancement('rogue:rogue/unlock_hellforge'))
			})
			Ingredient.of(['/bloodmagic:.+_catalyst$/']).stacks.forEach(item => {
				pool.addItem(item.id, 1).addCondition(cond_entity_advancement('rogue:rogue/unlock_crystallized_will'))
			})
			pool.addItem('tomeofblood:mint_tea', 5).addCondition(cond_entity_advancement('rogue:rogue/unlock_alchemy_table'))
			pool.addItem('bloodmagic:throwing_dagger_syringe', 8, [4, 8]).addCondition(cond_entity_advancement('rogue:rogue/unlock_hellforge'))
			pool.addItem('bloodmagic:throwing_dagger', 9, [4, 8]).addCondition(cond_entity_advancement('rogue:rogue/unlock_hellforge'))
			pool.addItem('bloodmagic:amethystthrowingdagger', 6, [4, 8]).addCondition(cond_entity_advancement('rogue:rogue/unlock_hellforge'))
			//THEURGY
			pool.addItem('theurgy:mercury_shard', 8, [2, 6]).addCondition(cond_entity_advancement('rogue:rogue/unlock_theurgy'))
			pool.addItem('theurgy:mercury_crystal', 2, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_theurgy'))
			pool.addItem('theurgy:sal_ammoniac_crystal', 8, [4, 16]).addCondition(cond_entity_advancement('rogue:rogue/unlock_theurgy'))
			//EMBERS
			pool.addItem('embers:ember_grit', 9, [2, 8]).addCondition(cond_entity_advancement('rogue:rogue/unlock_ember_bore'))
			pool.addItem('embers:ember_shard', 6, [1, 6]).addCondition(cond_entity_advancement('rogue:rogue/unlock_ember_bore'))
			pool.addItem('embers:ember_crystal', 2, [1, 2]).addCondition(cond_entity_advancement('rogue:rogue/unlock_ember_bore'))
			pool.addItem('embers:glimmer_crystal', 2).addFunction(func_set_dmg(0.45, 0.95)).addCondition(cond_entity_advancement('rogue:rogue/unlock_exchange_tablet'))
			pool.addItem('embers:glimmer_lamp', 1).addFunction(func_set_dmg(0.45, 0.95)).addCondition(cond_entity_advancement('rogue:rogue/unlock_exchange_tablet'))
			//BASE
			pool.addItem('eidolon:warped_sprouts', 6, [1, 3])
			pool.addItem('eidolon:tallow', 9, [2, 5])
			pool.addItem('eidolon:soul_shard', 5, [1, 6])
			pool.addItem('eidolon:pewter_blend', 6, [1, 4])
			pool.addItem('eidolon:tattered_cloth', 6, [1, 3])
			pool.addItem('occultism:datura', 9, [2, 3])
			pool.addItem('forbidden_arcanus:arcane_bone_meal', 8, [2, 8])
			pool.addItem('forbidden_arcanus:arcane_crystal', 6, [1, 2])
			pool.addItem('apotheosis:sigil_of_unnaming', 9, [1, 2])
			pool.addItem('apotheosis:sigil_of_socketing', 5).addCondition(cond_entity_advancement('apotheotic_additions:affix/simple_reforging_table'))
			pool.addItem('apotheosis:sigil_of_withdrawal', 5).addCondition(cond_entity_advancement('apotheotic_additions:affix/simple_reforging_table'))
			pool.addItem('apotheosis:sigil_of_rebirth', 3).addCondition(cond_entity_advancement('apotheotic_additions:affix/simple_reforging_table'))
			pool.addItem('apotheosis:sigil_of_enhancement', 2).addCondition(cond_entity_advancement('apotheotic_additions:affix/simple_reforging_table'))
		})
	})
})