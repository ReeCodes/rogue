ServerEvents.genericLootTables(event => {
	event.addGeneric('rogue:suprise_boxes/oxidized', table => {
		//ORES-GEMS
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
					"weight": 15,
					"name": item.replace('#', '')
				}).addFunction(func_set_count(3, 16))
			})
			pool.addItem('minecraft:diamond', 5, [1, 4])
			pool.addItem('minecraft:emerald', 11, [2, 8])
			pool.addItem('minecraft:lapis_lazuli', 10, [4, 12])
			pool.addItem('minecraft:amethyst_shard', 10, [4, 16])
		})
		table.addPool(pool => {
			pool.rolls = 1;
			//TWIGS
			Ingredient.of(['twigs:rhyolite', 'twigs:schist', 'twigs:silt']).stacks.forEach(item => {
				pool.addItem(item.id, 20, [24, 64])
			})
			//VANILLA
			Ingredient.of(['minecraft:andesite', 'minecraft:granite', 'minecraft:diorite']).stacks.forEach(item => {
				pool.addItem(item.id, 20, [24, 64])
			})
			//QUARK
			Ingredient.of(['quark:limestone', 'quark:jasper', 'quark:shale', 'quark:permafrost']).stacks.forEach(item => {
				pool.addItem(item.id, 15, [24, 64])
			})
			//CREATE
			Ingredient.of(['create:limestone', 'create:ochrum', 'create:scoria', 'create:scorchia', 'create:veridium']).stacks.forEach(item => {
				pool.addItem(item.id, 15, [24, 64])
			})
			//RARE BLOCKS
			Ingredient.of(['minecraft:tuff', 'minecraft:calcite', 'forbidden_arcanus:darkstone']).stacks.forEach(item => {
				pool.addItem(item.id, 9, [24, 64])
			})
			//RARE BLOCKS
			Ingredient.of(['minecraft:tuff', 'minecraft:calcite', 'forbidden_arcanus:darkstone']).stacks.forEach(item => {
				pool.addItem(item.id, 9, [24, 64])
			})
			//RARE BLOCKS
			Ingredient.of(['create:asurine', 'create:crimsite', 'powah:dry_ice']).stacks.forEach(item => {
				pool.addItem(item.id, 3, [24, 64])
			})
			//NETHER BLOCKS
			Ingredient.of(['twigs:bloodstone', 'minecraft:basalt', 'minecraft:blackstone']).stacks.forEach(item => {
				pool.addItem(item.id, 15, [24, 64]).addCondition(cond_entity_advancement('minecraft:story/enter_the_nether'))
			})
			//END BLOCKS
			pool.addItem('quark:myalite', 8, [24, 64]).addCondition(cond_entity_advancement('minecraft:story/enter_the_end'))
		})
	})
})