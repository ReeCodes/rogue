let foodConditions = (ingArray, weight, min, max) => {
	var children = [];

	ingArray.stacks.forEach(s => {
		if (s.id.includes('twilightdelight')) {
			children.push({
				"type": 'minecraft:item',
				"name": s.id,
				"weight": weight,
				"functions": [{
					"function": "minecraft:set_count",
					"count": {
						"min": min,
						"max": max
					}
				}],
				"conditions": [cond_location([{
					predicateType: 'dimension',
					ids: ['twilightforest:twilight_forest']
				}])]
			})
		} else if (s.id.includes('endersdelight')) {
			children.push({
				"type": 'minecraft:item',
				"name": s.id,
				"weight": weight,
				"functions": [{
					"function": "minecraft:set_count",
					"count": {
						"min": min,
						"max": max
					}
				}],
				"conditions": [cond_location([{
					predicateType: 'dimension',
					ids: ['minecraft:the_end']
				}])]
			})
		} else if (s.id.includes('nethersdelight')) {
			children.push({
				"type": 'minecraft:item',
				"name": s.id,
				"weight": weight,
				"functions": [{
					"function": "minecraft:set_count",
					"count": {
						"min": min,
						"max": max
					}
				}],
				"conditions": [cond_location([{
					predicateType: 'dimension',
					ids: ['minecraft:the_nether']
				}])]
			})
		} else if (s.id.includes('oceansdelight')) {
			children.push({
				"type": 'minecraft:item',
				"name": s.id,
				"weight": weight,
				"functions": [{
					"function": "minecraft:set_count",
					"count": {
						"min": min,
						"max": max
					}
				}],
				"conditions": [cond_location([{
					predicateType: 'biome',
					ids: [
						'alexscaves:abyssal_chasm',
						'minecraft:cold_ocean',
						'minecraft:deep_cold_ocean',
						'minecraft:deep_frozen_ocean',
						'minecraft:deep_lukewarm_ocean',
						'minecraft:deep_ocean',
						'minecraft:frozen_ocean',
						'minecraft:lukewarm_ocean',
						'minecraft:ocean',
						'minecraft:warm_ocean',
						'minecraft:beach',
						'minecraft:river'
					]
				}])]
			})
		} else if (s.id.includes('farmersdelight', 'supplementaries')) {
			children.push({
				"type": 'minecraft:item',
				"name": s.id,
				"weight": weight,
				"functions": [{
					"function": "minecraft:set_count",
					"count": {
						"min": min,
						"max": max
					}
				}],
				"conditions": [{
					"condition": "minecraft:inverted",
					"term": {
						"condition": "minecraft:any_of",
						"terms": [{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "alexscaves:abyssal_chasm"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:cold_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:deep_cold_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:deep_frozen_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:deep_lukewarm_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:deep_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:frozen_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:lukewarm_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:warm_ocean"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:beach"
									}
								},
								"entity": "this"
							},
							{
								"condition": "minecraft:entity_properties",
								"predicate": {
									"location": {
										"biome": "minecraft:river"
									}
								},
								"entity": "this"
							}
						]
					}
				}]
			})
		}
	})
	return children;
}

ServerEvents.chestLootTables(event => {
	event.addChest('rogue:loot/food', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			
			//DRINKS
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:milk_bottle',
					'farmersdelight:hot_cocoa',
					'farmersdelight:apple_cider',
					'farmersdelight:melon_juice'
				]), 10, 1, 2)
			})
			
			//MEAT
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'oceansdelight:cooked_guardian_tail',
					'oceansdelight:cooked_elder_guardian_slice',
					'oceansdelight:cooked_stuffed_cod',
					'farmersdelight:cabbage_leaf',
					'farmersdelight:beef_patty',
					'farmersdelight:cooked_chicken_cuts',
					'farmersdelight:cooked_bacon',
					'farmersdelight:cooked_cod_slice',
					'farmersdelight:cooked_salmon_slice',
					'farmersdelight:cooked_mutton_chops',
					'farmersdelight:smoked_ham',
					'twilightdelight:cooked_venison_rib',
					'twilightdelight:cooked_meef_slice',
					'twilightdelight:cooked_tomahawk_smeak'
				]), 9, 1, 2)
			})

			//PIES
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:apple_pie',
					'farmersdelight:sweet_berry_cheesecake',
					'farmersdelight:chocolate_pie'
				]), 9, 1, 2)
			})

			//PIE-SLICES
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:cake_slice',
					'farmersdelight:apple_pie_slice',
					'farmersdelight:sweet_berry_cheesecake_slice',
					'farmersdelight:chocolate_pie_slice'
				]), 10, 1, 2)
			})

			//SWEETS
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'supplementaries:candy',
					'supplementaries:pancake',
					'twilightdelight:torchberry_cookie',
					'twilightdelight:chocolate_wafer',
					'twilightdelight:chocolate_113',
					'twilightdelight:milky_113',
					'twilightdelight:glow_113',
					'twilightdelight:honey_113',
					'farmersdelight:sweet_berry_cookie',
					'farmersdelight:honey_cookie',
					'twilightdelight:berry_stick'
				]), 13, 4, 8)
			})

			//SALADS
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:fruit_salad',
					'farmersdelight:mixed_salad',
					'farmersdelight:nether_salad',
					'oceansdelight:seagrass_salad'
				]), 10, 1, 2)
			})

			//SANDWICHES			
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:egg_sandwich',
					'farmersdelight:chicken_sandwich',
					'farmersdelight:hamburger',
					'farmersdelight:bacon_sandwich'
				]), 8, 1, 2)
			})

			//SPECIAL		
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'oceansdelight:squid_rings',
					'oceansdelight:baked_tentacle_on_a_stick',
					'oceansdelight:elder_guardian_roll',
					'oceansdelight:braised_sea_pickle',
					'oceansdelight:honey_fried_kelp',
					'farmersdelight:melon_popsicle',
					'farmersdelight:glow_berry_custard',
					'farmersdelight:barbecue_stick',
					'farmersdelight:dumplings',
					'farmersdelight:stuffed_potato',
					'farmersdelight:cabbage_rolls',
					'farmersdelight:cooked_rice',
					'farmersdelight:fried_rice',
					'farmersdelight:mutton_wrap',
					'twilightdelight:cooked_insect',
					'twilightdelight:glowstew',
					'twilightdelight:mushgloom_sauce',
					'twilightdelight:meef_wrap'
				]), 4, 1, 3)
			})

			//SUSHI		
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:salmon_roll',
					'farmersdelight:cod_roll',
					'farmersdelight:kelp_roll',
					'farmersdelight:kelp_roll_slice',
					'oceansdelight:fugu_roll'
				]), 6, 1, 3)
			})

			//STEWS-SOUPS	
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:bone_broth',
					'farmersdelight:beef_stew',
					'farmersdelight:chicken_soup',
					'farmersdelight:vegetable_soup',
					'farmersdelight:fish_stew',
					'farmersdelight:pumpkin_soup',
					'farmersdelight:baked_cod_stew',
					'farmersdelight:noodle_soup',
					'oceansdelight:bowl_of_guardian_soup'
				]), 8, 1, 3)
			})

			//FULL COURSE
			pool.addEntry({
				"type": "minecraft:alternatives",
				"children": foodConditions(Ingredient.of([
					'farmersdelight:squid_ink_pasta',
					'farmersdelight:ratatouille',
					'farmersdelight:steak_and_potatoes',
					'farmersdelight:vegetable_noodles',
					'farmersdelight:roasted_mutton_chops',
					'farmersdelight:mushroom_rice',
					'farmersdelight:pasta_with_mutton_chop',
					'farmersdelight:pasta_with_meatballs',
					'farmersdelight:bacon_and_eggs',
					'farmersdelight:grilled_salmon',
					'oceansdelight:cabbage_wrapped_elder_guardian',
					'twilightdelight:ghast_burger',
					'twilightdelight:hydra_burger',
					'twilightdelight:glow_venison_rib_with_pasta'
				]), 1, 1, 2)
			})
		})
	})
})

//NEEDS TO BE PUT IN PLACE
		/*
		//(TF)
		Ingredient.of([
			//LARGE MEALS
			,
			'twilightdelight:mushgloom_meef_pasta',
			'twilightdelight:fried_insect',
			'twilightdelight:thousand_plant_stew',
			'twilightdelight:grilled_ghast',
			'twilightdelight:grilled_tomahawk_smeak',
			'twilightdelight:borer_tear_soup',
			'twilightdelight:ghast_brain_salad',
			'twilightdelight:plate_of_lily_chicken',
			'twilightdelight:plate_of_fiery_snakes',
			'twilightdelight:plate_of_meef_wellington',
			'twilightdelight:thorn_rose_tea',
			'twilightdelight:torchberry_juice',
			'twilightdelight:phytochemical_juice',
			'twilightdelight:glacier_ice_tea',
			'twilightdelight:twilight_spring',
			'twilightdelight:tear_drink',
			'twilightdelight:torchberry_pie',
			'twilightdelight:aurora_pie',
			'twilightdelight:aurora_pie_slice',
			'twilightdelight:torchberry_pie_slice'
		]).stacks.forEach(s => {
			LootEntry.of(s.id).when((cond) => cond.anyDimension("twilightforest:twilight_forest").randomChance(0.1));
		}),
		//(END)
		Ingredient.of([
			'endersdelight:stuffed_shulker_bowl',
			'endersdelight:ender_paella',
			'endersdelight:ender_paella_wood',
			'endersdelight:pearl_pasta',
			'endersdelight:pearl_pasta_wood',
			'endersdelight:chorus_stew_wood',
			'endersdelight:chorus_stew',
			'endersdelight:endermite_stew_wood',
			'endersdelight:endermite_stew',
			'endersdelight:crispy_skewer',
			'endersdelight:twisted_cereal_wood',
			'endersdelight:twisted_cereal',
			'endersdelight:crawling_sandwich',
			'endersdelight:uncanny_cookies',
			'endersdelight:strange_eclair',
			'endersdelight:chorus_pie',
			'endersdelight:chorus_pie_slice'
		]).stacks.forEach(s => {
			LootEntry.of(s.id).when((cond) => cond.anyDimension("minecraft:the_end"));
		}),
		//(NETHER)
		Ingredient.of([
			'nethersdelight:hoglin_sirloin',
			'nethersdelight:hoglin_ear',
			'nethersdelight:strider_slice',
			'nethersdelight:ground_strider',
			'nethersdelight:grilled_strider',
			'nethersdelight:warped_moldy_meat',
			'nethersdelight:strider_moss_stew',
			'nethersdelight:plate_of_stuffed_hoglin_snout',
			'nethersdelight:plate_of_stuffed_hoglin_ham',
			'nethersdelight:plate_of_stuffed_hoglin_roast',
			'nethersdelight:nether_skewer'
		]).stacks.forEach(s => {
			LootEntry.of(s.id).when((cond) => cond.anyDimension("minecraft:the_nether"));
		})
		*/