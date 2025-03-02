ServerEvents.recipes(event => {
	
	event.shaped('integratedterminals:part_terminal_storage',
		[
			'ABA',
			'CDE',
			'AFA'
		], {
			A: '#forge:dusts/glowstone',
			B: 'integratedterminals:menril_glass',
			C: 'integrateddynamics:variable_transformer_output',
			D: 'integrateddynamics:part_display_panel',
			E: 'integrateddynamics:variable_transformer_input',
			F: 'toms_storage:ts.crafting_terminal'
		}
	).id('integratedterminals:crafting/part_terminal_storage')

	event.shaped('4x #forge:rods/treated_wood',
		[
			'A  ',
			'A  ',
			'   '
		], {
			A: '#forge:treated_wood'
		}
	).id('minecraft:recipes/crafting/stick_treated')
	
	event.shaped('scannable:scanner',
		[
			'A A',
			'BCB',
			'DED'
		], {
			A: '#forge:nuggets/steel',
			B: '#forge:gears/lead',
			C: 'ae2:charged_certus_quartz_crystal',
			D: '#forge:ingots/invar',
			E: 'thermal:rf_coil'
		}
	).id('minecraft:recipes/shaped/scanner')

	var missingNuggetToIngot = ['lead', 'silver', 'nickel', 'constantan', 'electrum', 'steel'];

	missingNuggetToIngot.forEach(m => {
		event.shaped('#forge:ingots/' + m,
			[
				'AAA',
				'AAA',
				'AAA'
			], {
				A: '#forge:nuggets/' + m
			}
		).id('minecraft:recipes/shaped/' + m + '_nugget_to_ingot')
	})

	event.shaped('#forge:storage_blocks/coal_coke',
		[
			'AAA',
			'AAA',
			'AAA'
		], {
			A: '#forge:coal_coke'
		}
	).id('minecraft:recipes/shaped/coke_to_coke_block')

	event.shaped('ad_astra:compressor',
		[
			'ABA',
			'A A',
			'ACA'
		], {
			A: '#forge:plates/iron',
			B: 'minecraft:piston',
			C: '#forge:storage_blocks/iron'
		}
	).id('ad_astra:compressor')

	//AIRCRAFT
	event.shaped('immersive_aircraft:improved_landing_gear',
		[
			' A ',
			'B  ',
			'   '
		], {
			A: '#forge:rods/iron',
			B: 'ad_astra:wheel'
		}
	).noMirror().id('minecraft:recipes/shaped/improved_landing_gear')

	event.shaped('immersive_aircraft:industrial_gears',
		[
			' A ',
			'B  ',
			'   '
		], {
			A: '#forge:gears/copper',
			B: '#forge:gears/iron'
		}
	).noMirror().id('minecraft:recipes/shaped/industrial_gears')

	event.shaped('immersive_aircraft:eco_engine',
		[
			'ABA',
			'ACA',
			'DDD'
		], {
			A: 'minecraft:prismarine_shard',
			B: '#forge:ingots/zinc',
			C: 'immersive_aircraft:engine',
			D: '#forge:plates/tin'
		}
	).id('minecraft:recipes/shaped/eco_engine')

	event.shaped('immersive_aircraft:sturdy_pipes',
		[
			'  A',
			'BAB',
			'A  '
		], {
			A: '#forge:plates/iron',
			B: 'create:fluid_pipe'
		}
	).noMirror().id('minecraft:recipes/shaped/sturdy_pipes')

	//DRAWERS
	var drawerWoodTypes = [
		'oak',
		'spruce',
		'birch',
		'jungle',
		'acacia',
		'dark_oak',
		'mangrove',
		'cherry',
		'crimson',
		'warped'
	];
	
	var drawerTypes = ['1', '2', '4'];
	
	drawerWoodTypes.forEach(w => {
		event.shaped('4x functionalstorage:'+w+'_1' ,
			[
				'ABA',
				'BBB',
				'ABA'
			], {
				A: '#forge:chests/wooden',
				B: 'minecraft:'+w+'_planks'
			}
		).id('functionalstorage:'+w+'_1')
	})

	drawerTypes.forEach(d => {
		event.shaped('functionalstorage:framed_' + d,
			[
				' B ',
				'BAB',
				' B '
			], {
				A: `/functionalstorage:(?!framed|fluid).+${d}/`,
				B: 'minecraft:iron_bars'
			}
		).id('functionalstorage:framed_' + d)
	})

	event.shaped('functionalstorage:compacting_framed_drawer',
		[
			' B ',
			'BAB',
			' B '
		], {
			A: 'functionalstorage:compacting_drawer',
			B: 'minecraft:iron_bars'
		}
	).id('functionalstorage:compacting_framed_drawer')

	event.shaped('functionalstorage:framed_storage_controller',
		[
			' B ',
			'BAB',
			' B '
		], {
			A: 'functionalstorage:storage_controller',
			B: 'minecraft:iron_bars'
		}
	).id('functionalstorage:framed_storage_controller')

	event.shaped('functionalstorage:framed_controller_extension',
		[
			' B ',
			'BAB',
			' B '
		], {
			A: 'functionalstorage:controller_extension',
			B: 'minecraft:iron_bars'
		}
	).id('functionalstorage:framed_controller_extension')

	event.shaped('functionalstorage:framed_simple_compacting_drawer',
		[
			' B ',
			'BAB',
			' B '
		], {
			A: 'functionalstorage:simple_compacting_drawer',
			B: 'minecraft:iron_bars'
		}
	).id('functionalstorage:framed_simple_compacting_drawer')

	//CHEST
	event.shaped('minecraft:chest',
		[
			'AAA',
			'A A',
			'AAA'
		], {
			A: '#minecraft:planks'
		}
	).id('minecraft:recipes/shaped/wooden_chest')

	//CONFLICT-FIX
	event.shaped('supplementaries:timber_frame',
		[
			'AAA',
			'A A',
			'AAA'
		], {
			A: '#forge:rods/wooden'
		}
	).id('supplementaries:timber_frame')

	event.shaped('handcrafted:wood_plate',
		[
			' A ',
			'AAA',
			' A '
		], {
			A: '#minecraft:wooden_slabs'
		}
	).id('handcrafted:wood_plate')

	event.shaped('luphieclutteredmod:small_shelf',
		[
			'   ',
			'AAA',
			'A A'
		], {
			A: '#minecraft:wooden_slabs'
		}
	).id('luphieclutteredmod:small_shelf_recipe')

	event.shaped('netherchested:nether_chest',
		[
			'ADA',
			'DBD',
			'ACA'
		], {
			A: 'enderio:nethercotta',
			B: 'minecraft:ender_chest',
			C: '#forge:ingots/netherite',
			D: '#forge:ingots/nether_brick'
		}
	).id('netherchested:nether_chest')
	
	event.shaped('tesseract:tesseract',
		[
			'ABA',
			'BCB',
			'ABA'
		], {
			A: '#forge:ingots/enderium',
			B: 'botania:ender_air_bottle',
			C: '#forge:dusts/grains_of_the_end'
		}
	).id('tesseract:tesseract')

	//WOODEN-VARIANT-CUPBOARDS
	var woodTypes = [
		'oak',
		'spruce',
		'birch',
		'jungle',
		'acacia',
		'dark_oak',
		'mangrove',
		'cherry',
		'bamboo',
		'crimson',
		'warped'
	];

	woodTypes.forEach(w => {
		if (!['bamboo'].includes(w)) {
			event.shaped('handcrafted:' + w + '_cupboard',
				[
					'AAA',
					'ABA',
					'AAA'
				], {
					A: 'minecraft:' + w + '_planks',
					B: 'woodworks:' + w + '_chest'
				}
			).id('handcrafted:' + w + '_cupboard')
		} else {
			event.shaped('handcrafted:' + w + '_cupboard',
				[
					'AAA',
					'ABA',
					'AAA'
				], {
					A: 'minecraft:' + w + '_planks',
					B: 'woodworks:' + w + '_closet'
				}
			).id('handcrafted:' + w + '_cupboard')
		}
	})
})