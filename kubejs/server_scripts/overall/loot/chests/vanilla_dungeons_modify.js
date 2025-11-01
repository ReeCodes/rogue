//priority: 200

let lt_vanilla = [
	'simple_dungeon',
	'abandoned_mineshaft',
	'bastion_hoglin_stable',
	'bastion_bridge',
	'bastion_other',
	'bastion_treasure',
	'nether_bridge',
	'ruined_portal',
	'end_city_treasure',
	'pillager_outpost',
	'shipwreck_supply',
	'shipwreck_treasure',
	'shipwreck_map',
	'underwater_ruin_small',
	'underwater_ruin_big',
	'buried_treasure',
	'igloo_chest',
	'desert_pyramid',
	'jungle_temple',
	'woodland_mansion',
	'stronghold_corridor',
	'stronghold_crossing',
	'stronghold_library'
];

ServerEvents.chestLootTables(event => {
	for (let i of lt_vanilla) {
		event.addChest('minecraft:' + i, table => {
			if (['simple_dungeon'].includes(i)) {
				//MAIN
				table.addPool(pool => {
					pool.rolls = 3;
					//MOB DROPS
					pool.addItem('minecraft:string', 40, [1, 8])
					pool.addItem('minecraft:rotten_flesh', 40, [1, 8])
					pool.addItem('minecraft:gunpowder', 40, [1, 8])
					pool.addItem('minecraft:saddle', 9)
					pool.addItem('minecraft:name_tag', 7)
					pool.addItem('minecraft:ender_pearl', 10, [1, 2])
					pool.addItem('irons_spellbooks:frozen_bone', 16)
					//SPECIAL MOB DROPS
					pool.addItem('reliquary:zombie_heart', 6)
					pool.addItem('reliquary:rib_bone', 6)
					pool.addItem('reliquary:catalyzing_gland', 6)
					pool.addItem('reliquary:chelicerae', 6)
					pool.addItem('reliquary:slime_pearl', 6)
					pool.addItem('reliquary:nebulous_heart', 6)
					pool.addItem('reliquary:withered_rib', 6)
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/stews",
						"weight": 4
					})
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "evilcraft:chests/eternal_closure",
						"weight": 1
					})
				})
				table.addPool(pool => {
					pool.rolls = [1, 4];
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/rarities"
					})
				})
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addItem('enigmaticlegacy:unholy_grail', 3)
					pool.addItem('enigmaticlegacy:earth_heart', 5)
					pool.addItem('enigmaticlegacy:lore_inscriber', 1)
					pool.addEntry({
						"type": "minecraft:loot_table",
						"name": "rogue:chests/loot/curios"
					})
					pool.addEmpty(30)
				})
				table.addPool(pool => {
					pool.rolls = 1;
					pool.addItem('enigmaticlegacy:tattered_tome', 1).addFunction({
					  "function": "enigmaticlegacy:revelation",
					  "randomPoints": {
						"type": "minecraft:uniform",
						"min": 1.0,
						"max": 3.0
					  },
					  "randomXP": {
						"type": "minecraft:uniform",
						"min": 50.0,
						"max": 500.0
					  }
					})
					pool.addEmpty(33)
				})
			}
		})
	}
})