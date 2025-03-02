ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/jewelled', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addEntry({
				"type": "apotheosis:random_gem",
				"weight": 60,
				"quality": 5
			})
			pool.addEntry({
				"type": "minecraft:loot_table",
				"name": "rogue:chests/loot/curios",
				"weight": 140
			})
			pool.addEntry({
				"type": "minecraft:loot_table",
				"name": "artifacts:artifact",
				"weight": 60
			})
			//RELICS
			Ingredient.of(['@relics']).subtract(Ingredient.of([
				'relics:researching_table',
				'relics:relic_experience_bottle',
				'relics:solid_snowball'
			])).stacks.forEach(a => {
				pool.addItem(a.id, 1)
			})
			//GEODES
			Ingredient.of([
				'tetra:geode', 
				'tetra:pristine_amethyst', 
				'tetra:pristine_diamond', 
				'tetra:pristine_emerald', 
				'tetra:pristine_lapis'
				]).stacks.forEach(a => {
				pool.addItem(a.id, 25)
			})
			Ingredient.of([
				'witheringboon:meldedgeode', 
				'witheringboon:chalcanthite', 
				'witheringboon:citrine', 
				'witheringboon:dumortieritequartz',
				'witheringboon:jasper', 
				'witheringboon:kyanite', 
				'witheringboon:malachite', 
				'witheringboon:peridot', 
				'witheringboon:prase', 
				'witheringboon:rosequartz', 
				'witheringboon:tanzanite'
				]).stacks.forEach(a => {
				pool.addItem(a.id, 1)
			})
			//AFFIX-ITEM (LOW TIER)
			pool.addEntry({
				"type": "apotheosis:random_affix_item",
				"quality": 10,
				"min_rarity": "common",
				"max_rarity": "rare",
				"weight": 35
			})
			//AFFIX-ITEM (HIGH TIER)
			pool.addEntry({
				"type": "apotheosis:random_affix_item",
				"quality": 20,
				"min_rarity": "rare",
				"max_rarity": "mythic",
				"weight": 20
			}).addCondition(cond_entity_advancement('apotheosis:affix/mythic'))
			//AFFIX-ITEM (ANCIENT)
			pool.addEntry({
				"type": "apotheosis:random_affix_item",
				"quality": 50,
				"min_rarity": "ancient",
				"max_rarity": "ancient",
				"weight": 8
			}).addCondition(cond_entity_advancement('apotheosis:affix/ancient'))
		})
	})
})