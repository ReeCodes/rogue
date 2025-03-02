let supp_urns = [
	'common',
	'uncommon',
	'rare',
	'epic'
];

ServerEvents.genericLootTables(event => {
	for (let i of supp_urns) {
		if (['common'].includes(i)) {
			event.addGeneric('supplementaries:blocks/urn_loot/' + i, table => {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addItem('supplementaries:ash', 15, [2, 8])
					pool.addItem('caupona:asses', 15, [4, 12])
					pool.addItem('minecraft:bone', 15, [2, 6])
					pool.addItem('minecraft:torch', 15, [2, 6])
					pool.addItem('supplementaries:flax_seeds', 7, [1, 2])
					pool.addItem('caupona:lateres', 20, [2, 6])
				})
			})
		}
		if (['uncommon'].includes(i)) {
			event.addGeneric('supplementaries:blocks/urn_loot/' + i, table => {
				table.addPool(pool => {
					pool.rolls = 1;
					[
					'#forge:nuggets/gold', 
					'#forge:nuggets/tin', 
					'#forge:nuggets/silver', 
					'#forge:nuggets/lead', 
					'#forge:nuggets/nickel', 
					'#forge:nuggets/copper', 
					'#forge:nuggets/zinc'
					].forEach(item => {
						pool.addEntry({
							"type": "minecraft:tag",
							"expand": false,
							"weight": 10,
							"name": item.replace('#', '')
						}).addFunction(func_set_count(8, 32))
					})
					pool.addItem('supplementaries:ash', 10, [2, 6])
					pool.addItem('minecraft:emerald', 15, [2, 6])
					pool.addItem('minecraft:skeleton_skull', 2)
					pool.addItem('minecraft:zombie_head', 2)
					pool.addItem('supplementaries:antique_ink', 10, [1, 3])
					pool.addItem('irons_spellbooks:arcane_essence', 8, [2, 5])
					pool.addItem('irons_rpg_tweaks:identification_scroll', 2, [1, 2])
					pool.addItem('irons_spellbooks:frozen_bone', 9, [1, 3])
					pool.addItem('supplementaries:flax_seeds', 7, [1, 2])
					pool.addItem('cardiac:life_bottle', 10, [1, 2])
					pool.addItem('dustrial_decor:rusty_iron_nugget', 10, [8, 32])
					
				})
			})
		}
		if (['rare'].includes(i)) {
			event.addGeneric('supplementaries:blocks/urn_loot/' + i, table => {
				table.addPool(pool => {
					pool.rolls = 1;
					[
					'#forge:raw_materials/iron',
					'#forge:raw_materials/gold',
					'#forge:raw_materials/tin',
					'#forge:raw_materials/silver',
					'#forge:raw_materials/lead',
					'#forge:raw_materials/nickel',
					'#forge:raw_materials/copper',
					'#forge:raw_materials/zinc',
					'#forge:raw_materials/aluminum', 
					'#forge:raw_materials/uranium'
					].forEach(item => {
						pool.addEntry({
							"type": "minecraft:tag",
							"expand": false,
							"weight": 10,
							"name": item.replace('#', '')
						}).addFunction(func_set_count(3, 8))
					})
					pool.addItem('minecraft:diamond', 5, [1, 4])
					pool.addItem('minecraft:emerald', 15, [2, 8])
					pool.addItem('minecraft:bundle', 5)
					pool.addItem('supplementaries:bomb', 7, [2, 5])
					pool.addItem('minecraft:lapis_lazuli', 10, [4, 12])
					pool.addItem('minecraft:amethyst_shard', 12, [4, 16])
					pool.addItem('galosphere:silver_bomb', 11, [2, 6])
					pool.addItem('reliquary:holy_hand_grenade', 5, [1, 2])
					pool.addItem('botania:keep_ivy', 6)
					pool.addItem('botania:overgrowth_seed', 5)
					pool.addEntry({
						"type": "apotheosis:random_affix_item",
						"quality": 5,
						"min_rarity": "uncommon",
						"max_rarity": "rare",
						"weight": 10
					}).addFunction({
					  "function": "supplementaries:curse_loot",
					  "chance": 1.0
					}).addFunction(func_ench(15, 35, true))
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 6
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 3
					})
					Ingredient.of([
					'reliquary:fertile_potion', 
					'reliquary:aphrodite_potion', 
					'reliquary:glowing_water', 
					'botania:world_seed']).stacks.forEach(item => {
						pool.addItem(item, 6, [1, 2])
					})
				})
			})
		}
		if (['epic'].includes(i)) {
			event.addGeneric('supplementaries:blocks/urn_loot/' + i, table => {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addItem('minecraft:diamond', 10, [5, 8])
					pool.addItem('minecraft:emerald', 10, [10, 64])
					pool.addItem('supplementaries:bomb_blue', 10)
					pool.addItem('reliquary:holy_hand_grenade', 10, [1, 2])
					pool.addEntry({
						"type": "apotheosis:random_affix_item",
						"quality": 5,
						"min_rarity": "rare",
						"max_rarity": "epic",
						"weight": 8
					}).addFunction({
					  "function": "supplementaries:curse_loot",
					  "chance": 1.0
					}).addFunction(func_ench(34, 91, true)).addFunction(func_set_dmg(0.3, 0.8))
					Ingredient.of([
					'tetra:geode', 
					'tetra:pristine_amethyst', 
					'tetra:pristine_diamond', 
					'tetra:pristine_emerald', 
					'tetra:pristine_lapis']).stacks.forEach(item => {
						pool.addItem(item, 10)
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 8
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 6
					})
					//drops
					pool.addItem('minecraft:ender_pearl', 10, [1, 4])
					pool.addItem('minecraft:slime_ball', 10, [4, 12])
					//special_drops
					pool.addItem('reliquary:zombie_heart', 9)
					pool.addItem('reliquary:rib_bone', 9)
					pool.addItem('reliquary:catalyzing_gland', 9)
					pool.addItem('reliquary:chelicerae', 9)
					pool.addItem('reliquary:slime_pearl', 9)
					pool.addItem('reliquary:nebulous_heart', 9)
					pool.addItem('reliquary:withered_rib', 9)
				})
			})
		}
	}
})