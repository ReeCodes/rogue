let lt_dc = [
	'food',
	'forge',
	'library',
	'secret_room',
	'stage_1',
	'stage_2',
	'stage_3',
	'stage_4',
	'stage_5',
	'supply',
	'treasure'
];

ServerEvents.chestLootTables(event => {
	for (let i of lt_dc) {
		event.modify('dungeoncrawl:' + i, table => {
			/*
			if (['food'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 6;
					pool.addItem('minecraft:rotten_flesh', 12, [1, 4])
					pool.addItem('minecraft:spider_eye', 8, [1, 4])
					pool.addItem('inspirations:heartbeet', 3, [1, 2])
					pool.addItem('minecraft:poisonous_potato', 2, [1, 2])
					pool.addItem('pamhc2foodcore:stockitem', 4, [1, 4])
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anyfood",
						"weight": 5
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anystews",
						"weight": 6
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "minecraft:chests/village/village_butcher",
						"weight": 2
					})
				})
			}
			if (['forge'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = [1, 2];
					pool.addItem('#forge:gems/coal_coke', 2, [2, 6])
					pool.addItem('#forge:storage_blocks/charcoal', 4)
					pool.addItem('#forge:storage_blocks/coal', 4)
					pool.addItem('#minecraft:coals/charcoal', 12)
					pool.addItem('#minecraft:coals/coal', 12)
				})
				table.addPool(pool => {
					pool.rolls = [2, 4];
					pool.addItem('#forge:storage_blocks/iron', 1)
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/more_metals",
						"weight": 1
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anyarmor/anyarmor2",
						"weight": 1
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anytools/anytools2",
						"weight": 1
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/affixgear2",
						"weight": 1
					})
				})
			}
			if (['library'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = [8, 14];
					pool.addItem('minecraft:book', 3, [3, 6])
					pool.addItem('minecraft:ink_sac', 2, [1, 5])
					pool.addItem('mysticalworld:ink_bottle', 1, [1, 3])
					pool.addItem('minecraft:writable_book', 1, [3, 6])
					pool.addItem('minecraft:feather', 2)
					pool.addItem('minecraft:cobweb', 2)
					pool.addItem('minecraft:book', 5).addFunction(enchant_levels(30, true))
					pool.addItem('minecraft:book', 5).addFunction(enchant_levels(45, true)).addCondition(entity_advancement('apotheosis:enchanting/30ench'))
					pool.addItem('minecraft:book', 5).addFunction(enchant_levels(60, true)).addCondition(entity_advancement('apotheosis:enchanting/45ench'))
					pool.addItem('minecraft:book', 5).addFunction(enchant_levels(80, true)).addCondition(entity_advancement('apotheosis:enchanting/60ench'))
					pool.addItem('minecraft:book', 5).addFunction(enchant_levels(100, true)).addCondition(entity_advancement('apotheosis:enchanting/80ench'))
					pool.addItem('minecraft:paper', 5, [1, 3])
				})
			}
			if (['secret_room'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 8;
					pool.addItem('minecraft:book', 3, [1, 12])
					pool.addItem('minecraft:map', 3)
					pool.addItem('charm:atlas', 2)
					pool.addItem('minecraft:cobweb', 9, [4, 8])
					Ingredient.of(['#minecraft:music_discs']).filter(Ingredient.of(['@minecraft'])).stacks.forEach(item => {
						pool.addItem(item, 1)
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anyrares_useables",
						"weight": 2
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anyrares_curio",
						"weight": 1
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/more_gems",
						"weight": 8
					})
				})
			}
			if (['supply'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
							"type": "minecraft:loot_table",
							"name": "kubejs:chests/loot_randomizer/anytools/anytools1",
							"weight": 3
					})
					pool.addEntry({
							"type": "minecraft:loot_table",
							"name": "kubejs:chests/loot_randomizer/anyarmor/anyarmor1",
							"weight": 3
					})
					pool.addEntry({
							"type": "minecraft:loot_table",
							"name": "kubejs:chests/loot_randomizer/affixgear1",
							"weight": 1
					})
				})
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
							"type": "minecraft:loot_table",
							"name": "kubejs:chests/loot_randomizer/anypotion"
					})
				})
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addItem('minecraft:torch', 1, [8, 24])
					pool.addItem('tconstruct:glow_ball', 1, [8, 24])
				})
				table.addPool(pool => {
					pool.rolls = [3, 5];
					pool.addItem('#minecraft:coals/coal', 3, [1, 3])
					pool.addItem('minecraft:apple', 5, [1, 4])
					pool.addItem('minecraft:bone', 5, [4, 6])
					pool.addItem('minecraft:rotten_flesh', 5, [2, 4])
					pool.addItem('minecraft:gunpowder', 5, [1, 8])
					pool.addItem('minecraft:string', 4, [2, 8])
					pool.addItem('minecraft:glass_bottle', 2, [1, 5])
					pool.addItem('minecraft:egg', 2, [2, 8])
					pool.addItem('minecraft:brick', 2, [2, 9])
					pool.addItem('minecraft:clock', 1)
					pool.addItem('minecraft:map', 1)
					pool.addItem('minecraft:compass', 1)
					pool.addItem('minecraft:lead', 1)
					pool.addItem('minecraft:spider_eye', 1, [1, 7])
					pool.addItem('minecraft:fermented_spider_eye', 1)
					pool.addItem('xreliquary:zombie_heart', 1)
					pool.addItem('xreliquary:rib_bone', 1)
					pool.addItem('xreliquary:catalyzing_gland', 1)
					pool.addItem('xreliquary:chelicerae', 1)
					pool.addItem('xreliquary:slime_pearl', 1)
					pool.addItem('xreliquary:nebulous_heart', 1)
					pool.addItem('xreliquary:withered_rib', 1)
					pool.addItem('minecraft:ink_sac', 1, [1, 3])
					pool.addItem('minecraft:rabbit_hide', 1)
					pool.addItem('minecraft:book', 1).addFunction(enchant_levels(10, true))
					pool.addItem('minecraft:leather_horse_armor', 2)
					pool.addEntry({
							"type": "minecraft:loot_table",
							"name": "kubejs:chests/loot_randomizer/anyapple",
							"weight": 1
					})
					pool.addEntry({
							"type": "minecraft:loot_table",
							"name": "kubejs:chests/loot_randomizer/anycrops",
							"weight": 12
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "minecraft:chests/village/village_butcher",
						"weight": 5
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/more_metals",
						"weight": 1
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anyarrows",
						"weight": 4
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anyblock",
						"weight": 5
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "kubejs:chests/loot_randomizer/anystews",
						"weight": 1
					})
				})
			}
			*/
			if (['stage_1'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 20
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 2
					})
					pool.addEmpty(45)
				})
			}
			if (['stage_2'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 20
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 2
					})
					pool.addEmpty(40)
				})
			}
			if (['stage_3'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 20
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 9
					})
					pool.addEntry({
						"type": "apotheosis:random_affix_item",
						"quality": 5,
						"min_rarity": "uncommon",
						"max_rarity": "rare",
						"weight": 11
					})
					.addFunction(func_ench(10, 30, true)).addFunction(func_set_dmg(0.3, 0.8))
					.addFunction({
					  "function": "supplementaries:curse_loot",
					  "chance": 1.0
					})
					pool.addEmpty(26)
				})
			}
			if (['stage_4'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 20
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 10
					})
					pool.addEntry({
						"type": "apotheosis:random_affix_item",
						"quality": 5,
						"min_rarity": "uncommon",
						"max_rarity": "rare",
						"weight": 10
					})
					.addFunction(func_ench(24, 52, true))
					.addFunction({
					  "function": "supplementaries:curse_loot",
					  "chance": 0.33
					})
					pool.addEmpty(22)
				})
			}
			if (['stage_5'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 12
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 10
					})
					pool.addEntry({
						"type": "apotheosis:random_affix_item",
						"quality": 5,
						"min_rarity": "rare",
						"max_rarity": "ancient",
						"weight": 6
					}).addFunction(func_ench(34, 91, true))
					pool.addEmpty(15)
				})
			}
			if (['treasure'].includes(i)) {
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities",
						"weight": 3
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios",
						"weight": 2
					})
					pool.addEntry({
						"type": "apotheosis:random_affix_item",
						"quality": 5,
						"min_rarity": "mythic",
						"max_rarity": "ancient",
						"weight": 1
					}).addFunction(func_ench(67, 99, true))
				})
			}
		})
	}
})