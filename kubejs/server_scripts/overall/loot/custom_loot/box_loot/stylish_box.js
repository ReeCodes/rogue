ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/stylish', table => {
		table.addPool(pool => {
			//DECORATIONS
			pool.rolls = [2, 3];
			Ingredient.of([
				'luphieclutteredmod:luphie_art_academy_box_of_paint', 'luphieclutteredmod:luphie_antique_sewing_machine',
				'luphieclutteredmod:luphie_antique_library_books', 'luphieclutteredmod:luphie_antique_book_stand',
				'luphieclutteredmod:luphie_angry_bee_lamp', 'luphieclutteredmod:luphie_ancient_codex',
				'luphieclutteredmod:luphie_general_store_cabinet', 'luphieclutteredmod:luphie_mushroom_tv',
				'luphieclutteredmod:luphie_mushroom_bed', 'luphieclutteredmod:luphie_cardboard_box_open',
				'luphieclutteredmod:luphie_cardboard_box_filled', 'luphieclutteredmod:luphie_cardboard_box_closed',
				'luphieclutteredmod:luphie_bunny_book_ends', 'luphieclutteredmod:luphie_rovers_briefcase',
				'luphieclutteredmod:luphie_briefcase', 'luphieclutteredmod:luphie_empty_bulletin_board',
				'luphieclutteredmod:luphie_bulletin_board', 'luphieclutteredmod:luphie_mushroom_terrarium',
				'luphieclutteredmod:luphie_purple_glowshroom_terrarium', 'luphieclutteredmod:luphie_pink_glowshroom_terrarium',
				'luphieclutteredmod:luphie_yellow_glowshroom_terrarium', 'luphieclutteredmod:luphie_green_glowshroom_terrarium',
				'luphieclutteredmod:luphie_blue_glowshroom_terrarium', 'luphieclutteredmod:luphie_mermaid_dresser',
				'luphieclutteredmod:luphie_sweetheart_kitchen_sink', 'luphieclutteredmod:luphie_cat_kitchen_sink',
				'luphieclutteredmod:luphie_sweetheart_counter_b', 'luphieclutteredmod:luphie_sweetheart_counter_a',
				'luphieclutteredmod:luphie_cat_kitchen_counter_b', 'luphieclutteredmod:luphie_cat_counter_a',
				'luphieclutteredmod:luphie_sweetheart_kitchen_table', 'luphieclutteredmod:luphie_cat_kitchen_table',
				'luphieclutteredmod:luphie_blank_paper_pile', 'luphieclutteredmod:luphie_black_cat_plant_pot',
				'luphieclutteredmod:luphie_bee_lamp', 'luphieclutteredmod:luphie_assorted_jam_jars',
				'luphieclutteredmod:luphie_dorado_cabinet', 'luphieclutteredmod:luphie_confectionary_table_b',
				'luphieclutteredmod:luphie_confectionary_table_a', 'luphieclutteredmod:luphie_cluttered_seltzer_cans',
				'luphieclutteredmod:luphie_classic_radio', 'luphieclutteredmod:luphie_classic_mini_table',
				'luphieclutteredmod:luphie_china_cabinet', 'luphieclutteredmod:luphie_cauldron_poster',
				'luphieclutteredmod:luphie_card_index', 'handcrafted:terracotta_thick_pot', 'handcrafted:terracotta_wide_pot',
				'handcrafted:terracotta_medium_pot', 'handcrafted:terracotta_thin_pot', 'luphieclutteredmod:luphie_mini_jam_jar_cube',
				'luphieclutteredmod:luphie_mini_hanging_terrariums', 'luphieclutteredmod:luphie_mini_cactus_set',
				'luphieclutteredmod:luphie_lunar_observatory_table', 'luphieclutteredmod:luphie_lunar_observatory_small_table',
				'luphieclutteredmod:luphie_lunar_observatory_jars', 'luphieclutteredmod:luphie_lunar_observatory_globe',
				'luphieclutteredmod:luphie_lunar_observatory_basket_of_papers', 'luphieclutteredmod:luphie_key',
				'luphieclutteredmod:luphie_jam_jar_pyramid', 'luphieclutteredmod:luphie_honeycomb_lamp',
				'luphieclutteredmod:luphie_hanging_plant_b', 'luphieclutteredmod:luphie_hanging_plant_a',
				'luphieclutteredmod:luphie_hanging_dish_towel', 'luphieclutteredmod:luphie_glowing_moon',
				'luphieclutteredmod:luphie_envelope_stack', 'luphieclutteredmod:luphie_worn_dorado_cabinet',
				'luphieclutteredmod:luphie_dorado_cabinet_cluttered', '/luphieclutteredmod:luphie_.+_armchair/',
				'luphieclutteredmod:luphie_office_supplies_clutter', 'luphieclutteredmod:luphie_office_box',
				'luphieclutteredmod:luphie_nightstand', 'luphieclutteredmod:luphie_nightstand_knick_knacks',
				'luphieclutteredmod:luphie_mushroom_wardrobe', 'luphieclutteredmod:luphie_mushroom_table',
				'luphieclutteredmod:luphie_mushroom_lamp', 'luphieclutteredmod:luphie_mushroom_chest',
				'luphieclutteredmod:luphie_moon_string', 'luphieclutteredmod:luphie_tall_sketchbook_stack',
				'luphieclutteredmod:luphie_tall_paper_stack', 'luphieclutteredmod:luphie_table_with_cloth',
				'luphieclutteredmod:luphie_steampunk_globe', 'luphieclutteredmod:luphie_tall_bookstack',
				'luphieclutteredmod:luphie_small_cauldron_set', 'luphieclutteredmod:luphie_stack_of_small_books',
				'luphieclutteredmod:luphie_small_bookcase', 'luphieclutteredmod:luphie_sliced_bread',
				'luphieclutteredmod:luphie_sketchbook_stack', 'luphieclutteredmod:luphie_sketchbook',
				'luphieclutteredmod:luphie_short_book_stack', 'luphieclutteredmod:luphie_sewing_clutter',
				'luphieclutteredmod:luphie_scattered_papers', 'luphieclutteredmod:luphie_salt_and_pepper_shakers',
				'luphieclutteredmod:luphie_safe', 'luphieclutteredmod:luphie_gothic_rose_endtable',
				'luphieclutteredmod:luphie_rose_endtable', 'luphieclutteredmod:luphie_pink_and_gold_moon_decor',
				'luphieclutteredmod:luphie_picnic_basket', 'luphieclutteredmod:luphie_filled_picnic_basket',
				'luphieclutteredmod:luphie_pastel_table', 'luphieclutteredmod:luphiebunny_plushie',
				'luphieclutteredmod:luphie_pastel_chair', 'luphieclutteredmod:luphie_paper_stack',
				'luphieclutteredmod:luphie_open_book_stack', 'luphieclutteredmod:luphie_open_book',
				'luphieclutteredmod:luphie_cluttered_desk', 'luphieclutteredmod:luphie_green_desk', 'luphieclutteredmod:luphie_cluttered_green_desk',
				'luphieclutteredmod:luphie_greener_nightstand', 'luphieclutteredmod:luphie_yellow_notepad',
				'luphieclutteredmod:luphie_pastel_wall_bookshelf', 'luphieclutteredmod:luphie_wall_bookshelf',
				'luphieclutteredmod:luphie_vial_stand', 'luphieclutteredmod:luphie_unliving_chair',
				'luphieclutteredmod:luphie_rovers_mug', 'luphieclutteredmod:luphie_retro_cafe_shelf_stained_glass',
				'luphieclutteredmod:luphie_retro_cafe_shelf', 'luphieclutteredmod:luphie_heart_armchair',
				'luphieclutteredmod:luphie_coffee_grinder', 'luphieclutteredmod:luphie_berry_cake',
				'luphieclutteredmod:luphie_pastel_traditional_table', 'luphieclutteredmod:luphie_pastel_traditional_chair',
				'luphieclutteredmod:luphie_black_lovely_love_seat', 'luphieclutteredmod:luphie_basic_lovely_love_seat',
				'luphieclutteredmod:luphie_hoppin_park_lantern', 'luphieclutteredmod:luphie_heart_cake',
				'luphieclutteredmod:luphie_lemon_table', 'luphieclutteredmod:luphie_star_string',
				'luphieclutteredmod:luphie_baking_set_a', 'luphieclutteredmod:luphie_wedding_arch',
				'luphieclutteredmod:luphie_tea_kettle', 'luphieclutteredmod:luphie_orange_cat_plant_pot',
				'luphieclutteredmod:luphie_tall_stack_of_small_books', 'luphieclutteredmod:luphie_cluttered_cat_mugs',
				'luphieclutteredmod:luphie_imperial_table', 'luphieclutteredmod:luphie_imperial_chair',
				'luphieclutteredmod:luphie_lunar_observatory_books', 'luphieclutteredmod:luphie_pastel_block_bookshelf',
				'luphieclutteredmod:luphie_row_of_small_pastel_books', 'luphieclutteredmod:luphie_row_of_small_books',
				'luphieclutteredmod:luphie_brown_desk',
				'supplementaries:iron_gate', 'luphieclutteredmod:luphie_retro_pink_fridge', 'luphieclutteredmod:luphie_pastel_wardrobe',
				'luphieclutteredmod:luphie_rovers_stool',
				'/supplementaries:flag_.+/', '/handcrafted:.+_fancy_bed/', '/handcrafted:.+_trophy/',
				'luphieclutteredmod:luphie_green_spool_of_thread', 'luphieclutteredmod:luphie_yellow_spool_of_thread', 'luphieclutteredmod:luphie_pink_spool_of_thread',
				'luphieclutteredmod:luphie_purple_gumball_machine', 'luphieclutteredmod:luphie_green_gumball_machine',
				'luphieclutteredmod:luphie_glass_jars', 'luphieclutteredmod:luphie_button_stool',
				'luphieclutteredmod:luphie_apple_chair', 'luphieclutteredmod:luphie_analog_kitchen_scale',
				'luphieclutteredmod:luphie_ham_sandwich', 'luphieclutteredmod:luphie_pastry_display_case',
				'luphieclutteredmod:luphie_darkwood_decorative_shelves', 'luphieclutteredmod:luphie_darkwood_round_table',
				'luphieclutteredmod:luphie_darkwood_stool', 'luphieclutteredmod:luphie_darkwood_cabinet',
				'luphieclutteredmod:luphie_darkwood_clock', 'luphieclutteredmod:luphie_darkwood_quilted_decorative_shelves',
				'luphieclutteredmod:luphie_darkwood_quilted_sofa', 'luphieclutteredmod:luphie_darkwood_geometric_chair',
				'luphieclutteredmod:luphie_darkwood_quilted_chair', 'luphieclutteredmod:luphie_darkwood_quilted_bed',
				'luphieclutteredmod:luphie_darkwood_geometric_decorative_shelves',
				'luphieclutteredmod:luphie_darkwood_southern_flair_chair', 'luphieclutteredmod:luphie_darkwood_geometric_sofa',
				'luphieclutteredmod:luphie_darkwood_geometric_bed',
				'luphieclutteredmod:luphie_darkwood_southern_flair_decorative_shelves',
				'luphieclutteredmod:luphie_darkwood_southern_flair_sofa',
				'luphieclutteredmod:luphie_darkwood_souther_flair_bed',
				'luphieclutteredmod:luphie_sewing_table_with_tablecloth', 'luphieclutteredmod:luphie_sewing_table',
				'luphieclutteredmod:luphie_sewing_table_clutter', 'luphieclutteredmod:luphie_potion_shelf',
				'luphieclutteredmod:luphie_pancake_stack', 'luphieclutteredmod:luphie_paint_water_jar',
				'luphieclutteredmod:luphie_mermaid_pearl', 'luphieclutteredmod:luphie_lavender_spool_of_thread',
				'luphieclutteredmod:luphie_plated_blueberry_muffin', 'luphieclutteredmod:luphie_plated_croissant', 'luphieclutteredmod:luphie_plated_chocolate_croissant',
				'luphieclutteredmod:luphie_handheld_sea_gem_lantern', 'luphieclutteredmod:luphie_empty_small_jars',
				'luphieclutteredmod:luphie_plant_jar', 'luphieclutteredmod:luphie_wine_bottles',
				'luphieclutteredmod:luphie_drying_herbs', 'luphieclutteredmod:luphie_stack_of_ham_sandwiches',
				'luphieclutteredmod:luphie_cluttered_havana_cabinet', 'luphieclutteredmod:luphie_havana_cabinet',
				'luphieclutteredmod:luphie_flowering_carpet', 'luphieclutteredmod:luphie_hanging_plant_shelves',
				'luphieclutteredmod:luphie_hanging_pottery_shelves', 'luphieclutteredmod:luphie_drying_herb_garland',
				'luphieclutteredmod:luphie_retro_black_fridge', 'luphieclutteredmod:luphie_retro_white_fridge',
				'luphieclutteredmod:luphie_retro_green_fridge', 'luphieclutteredmod:luphie_retro_yellow_fridge',
				'luphieclutteredmod:luphie_brown_record_player', 'luphieclutteredmod:luphie_pink_record_player',
				'luphieclutteredmod:luphie_yellow_record_player', 'luphieclutteredmod:luphie_blue_record_player',
				'luphieclutteredmod:luphie_antique_map', 'luphieclutteredmod:luphie_blossom_garland',
				'luphieclutteredmod:luphie_sunflower_garland', 'luphieclutteredmod:luphie_heart_garland',
				'luphieclutteredmod:luphie_black_cat_garland', 'luphieclutteredmod:luphie_bunny_garland',
				'luphieclutteredmod:luphie_small_filled_jars_d', 'luphieclutteredmod:luphie_small_filled_jars_c',
				'luphieclutteredmod:luphie_small_filled_jars_b', 'luphieclutteredmod:luphie_small_filled_jars_a',
				'luphieclutteredmod:luphie_small_jars_of_tea_leaves', 'luphieclutteredmod:luphie_empty_plate',
				'luphieclutteredmod:luphie_plated_cinnamon_bun',
				'luphieclutteredmod:luphie_darkwood_endtable', 'luphieclutteredmod:luphie_polaroids_c', 'luphieclutteredmod:luphie_polaroids_b',
				'luphieclutteredmod:luphie_polaroids_a', 'luphieclutteredmod:luphie_polaroid_garland_b',
				'luphieclutteredmod:luphie_polaroid_garland_a', 'luphieclutteredmod:luphie_polaroid_camera',
				'luphieclutteredmod:luphie_steampunk_lamp', 'luphieclutteredmod:luphie_antique_lamp',
				'luphieclutteredmod:luphie_wood_endtable', 'luphieclutteredmod:luphie_amethyst_endtable',
				'luphieclutteredmod:luphie_periwinkle_endtable', 'luphieclutteredmod:luphie_green_endtable',
				'luphieclutteredmod:luphie_yellow_endtable', 'luphieclutteredmod:luphie_pink_endtable',
				'luphieclutteredmod:luphie_black_endtable', 'luphieclutteredmod:luphie_wine_bottle_rack',
				'luphieclutteredmod:yellow_bicycle', 'luphieclutteredmod:purple_bicycle', 'luphieclutteredmod:blue_bicycle', 'luphieclutteredmod:pink_bicycle',
				'luphieclutteredmod:bamboo_bookshelf', 'luphieclutteredmod:stainedglasslamp', 'luphieclutteredmod:plant_ladder',
				'luphieclutteredmod:luphie_flower_desk_lamp', 'luphieclutteredmod:luphie_caged_bulb',
				'luphieclutteredmod:rubiks_cube', 'luphieclutteredmod:small_shelf', 'luphieclutteredmod:small_pink_shelf',
				'luphieclutteredmod:rito_village_books', 'luphieclutteredmod:yellow_puzzle_piece_table',
				'luphieclutteredmod:red_puzzle_piece_table', 'luphieclutteredmod:pastel_yellow_puzzle_piece_table',
				'luphieclutteredmod:pastel_purple_puzzle_piece_table', 'luphieclutteredmod:pastel_pink_puzzle_piece_table',
				'luphieclutteredmod:pastel_blue_puzzle_piece_table', 'luphieclutteredmod:green_puzzle_piece_table',
				'luphieclutteredmod:blue_puzzle_piece_table', 'luphieclutteredmod:cluttered_purple_cabinet',
				'luphieclutteredmod:purple_cabinet', 'luphieclutteredmod:yellow_flower_shelf',
				'luphieclutteredmod:purple_flower_shelf', 'luphieclutteredmod:pink_flower_shelf',
				'luphieclutteredmod:pastel_yellow_flowershelf', 'luphieclutteredmod:green_flower_shelf',
				'luphieclutteredmod:blue_flower_shelf', 'luphieclutteredmod:unpainted_birdhouse',
				'luphieclutteredmod:red_birdhouse', 'luphieclutteredmod:blue_birdhouse',
				'luphieclutteredmod:cute_yellow_bicycle', 'luphieclutteredmod:cute_purple_bicycle',
				'luphieclutteredmod:cute_blue_bicycle', 'luphieclutteredmod:cute_pink_bicycle',
				'luphieclutteredmod:cluttered_tarrey_town_wood_stove', 'luphieclutteredmod:tarrey_town_stove', 'luphieclutteredmod:seaweed_planter',
				'luphieclutteredmod:green_sand_seal_plush', 'luphieclutteredmod:red_sand_seal_plush',
				'luphieclutteredmod:blue_sand_seal_plush', 'luphieclutteredmod:scrambled_pastel_rubiks_cube',
				'luphieclutteredmod:scrambled_rubiks_cube', 'luphieclutteredmod:pastel_rubiks_cube'
			]).stacks.forEach(item => {
				pool.addItem(item.id, 1, [1, 2])
			})
		})
		table.addPool(pool => {
			pool.rolls = 1;
			//MAIN BLOCKS (COMMON)
			Ingredient.of([
				'/rechiseled:.+planks?.+/'
			]).stacks.forEach(item => {
				pool.addItem(item.id, 20, [56, 64])
			})
			//SECONDARY BLOCKS (RARE)
			Ingredient.of([
				'supplementaries:timber_cross_brace', 
				'supplementaries:timber_brace', 
				'supplementaries:timber_frame', 
				'supplementaries:lapis_bricks', 
				'supplementaries:daub_cross_brace', 
				'supplementaries:daub_brace', 
				'supplementaries:daub_frame', 
				'supplementaries:daub', 
				'supplementaries:checker_block', 
				'luphieclutteredmod:checkeredstrawberrywallpaperlime', 
				'luphieclutteredmod:luphie_floral_striped_wallpaper', 
				'luphieclutteredmod:luphie_pastel_strawberry_wallpaper', 
				'luphieclutteredmod:luphie_purple_checkered_block', 
				'luphieclutteredmod:luphie_blue_checkered_block', 
				'luphieclutteredmod:luphie_green_checkered_block', 
				'luphieclutteredmod:luphie_yellow_checkered_block', 
				'luphieclutteredmod:luphie_red_checkered_block', 
				'luphieclutteredmod:luphie_mushroom_bookshelf', 
				'luphieclutteredmod:luphie_jack_o_lantern_bookshelf', 
				'luphieclutteredmod:checkeredwallpaperlime', 
				'luphieclutteredmod:luphie_blue_mushroom_bookshelf', 
				'luphieclutteredmod:luphie_halloween_wallpaper_b', 
				'luphieclutteredmod:luphie_halloween_wallpaper_a', 
				'luphieclutteredmod:luphie_choco_mint_wallpaper_b', 
				'luphieclutteredmod:luphie_choco_mint_wallpaper_1', 
				'luphieclutteredmod:luphie_confectionary_wallpaper_b', 
				'luphieclutteredmod:luphie_confectionary_wallpaper_a', 
				'suppsquared:metal_cross_brace', 
				'suppsquared:metal_brace', 
				'suppsquared:metal_frame',
				'luphieclutteredmod:pink_tarrey_town_planter', 
				'luphieclutteredmod:green_tarrey_town_planter', 
				'luphieclutteredmod:glow_tarrey_town_planter', 
				'luphieclutteredmod:blue_mushroom_tarrey_town_planter', 
				'luphieclutteredmod:blue_tarrey_town_planter', 
				'luphieclutteredmod:anchorwallpaperwainscot', 
				'luphieclutteredmod:anchorwallpaper', 
				'luphieclutteredmod:checkeredstrawberrywallpaperpink', 
				'luphieclutteredmod:checkeredwallpaperpink', 
				'luphieclutteredmod:lily_hills_flooring', 
				'luphieclutteredmod:hannish_tile_flooring', 
				'luphieclutteredmod:yellow_tarrey_town_planter', 
				'luphieclutteredmod:red_tarrey_town_planter', 
				'luphieclutteredmod:purple_tarrey_town_planter',
				'luphieclutteredmod:luphie_pink_log', 
				'luphieclutteredmod:stripped_luphie_flowering_pinklog', 
				'luphieclutteredmod:luphie_flowering_yellow_log', 
				'luphieclutteredmod:luphie_yellow_log', 
				'luphieclutteredmod:luphie_glow_log', 
				'luphieclutteredmod:luphie_purple_log', 
				'luphieclutteredmod:luphie_flowering_purple_log', 
				'luphieclutteredmod:luphie_flowering_pink_log', 
				'luphieclutteredmod:luphie_green_log',
				'luphieclutteredmod:luphie_blue_mushroom_planks',
				'/chipped:.+_dripstone$/',
				'/chipped:.+_carpet$/',
				'/chipped:.+_bars?$/',
				'/chipped:.+_booksheld$/',
				'/chipped:.+_ladder$/',
				'/chipped:.+_log$/',
				'/chipped:.+_wool$/'
			]).stacks.forEach(item => {
				pool.addItem(item.id, 5, [12, 24])
			})
		})
		table.addPool(pool => {
			pool.rolls = 2;
			//LIGHTS
			Ingredient.of([
				'suppsquared:brass_lantern', 
				'suppsquared:crimson_lantern', 
				'suppsquared:copper_lantern', 
				'suppsquared:gold_candle_holder', 
				'supplementaries:candle_holder', 
				'supplementaries:redstone_illuminator', 
				'supplementaries:deepslate_lamp', 
				'supplementaries:blackstone_lamp', 
				'supplementaries:stone_lamp',
				'luphieclutteredmod:yellow_flower_shelf_candle', 
				'luphieclutteredmod:purple_flower_shelf_candle', 
				'luphieclutteredmod:pink_flower_shelf_candle', 
				'luphieclutteredmod:pastel_yellow_flower_shelf_candle', 
				'luphieclutteredmod:green_flower_shelf_candle', 
				'luphieclutteredmod:blue_flower_shelf_candle',
				'supplementaries:sconce',
				'supplementaries:sconce_soul',
				'/chipped:.+_torch$/',
				'/chipped:.+_lantern$/',
				'/chipped:.+_glowstone?$/',
				'/chipped:.+_froglight?$/',
				'/chipped:.+_shroomlight?$/',
				'/chipped:.+_redstone_lamp$/'
			]).stacks.forEach(item => {
				pool.addItem(item.id, 8, [4, 12])
			})
			Ingredient.of(['/additionallanterns:.+_lantern$/']).stacks.forEach(item => {
				pool.addItem(item.id, 10, [4, 8])
			})
			Ingredient.of(['/additionallanterns:.+_chain$/']).stacks.forEach(item => {
				pool.addItem(item.id, 8, [4, 16])
			})
		})
	})
})