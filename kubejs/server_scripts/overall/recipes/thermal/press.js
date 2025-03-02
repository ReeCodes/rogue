ServerEvents.recipes(event => {
	event.recipes.thermal.press('#forge:gears/compressed_iron',
		['4x #forge:ingots/compressed_iron', 'thermal:press_gear_die']).id('thermal:machines/press/press_compressed_iron_to_gear')
		
	var missingPressRecipes = ['lead', 'silver', 'nickel', 'constantan', 'electrum', 'steel'];
	
	missingPressRecipes.forEach(m => {
		
		event.recipes.thermal.press('9x #forge:ingots/'+m,
		['#forge:storage_blocks/'+m, 
		'thermal:press_unpacking_die']).id('thermal:machines/press/press_'+m+'_unpacking')
		
		event.recipes.thermal.press('#forge:storage_blocks/'+m,
		['9x #forge:ingots/'+m, 
		'thermal:press_packing_3x3_die']).id('thermal:machines/press/press_'+m+'_packing')
		
		event.recipes.thermal.press('#forge:ingots/'+m,
		['9x #forge:nuggets/'+m, 
		'thermal:press_packing_3x3_die']).id('thermal:machines/press/press_'+m+'_nugget_packing')
		
		event.recipes.thermal.press('9x #forge:nuggets/'+m,
		['#forge:ingots/'+m, 
		'thermal:press_unpacking_die']).id('thermal:machines/press/press_'+m+'_nugget_unpacking')
	})
	
	//slag
	event.recipes.thermal.press('4x #forge:slag',
	['#forge:storage_blocks/slag', 
	'thermal:press_unpacking_die']).id('thermal:machines/press/unpacking/press_slag_unpacking')
	
	event.recipes.thermal.press('#forge:storage_blocks/slag',
	['4x #forge:slag', 
	'thermal:press_packing_2x2_die']).id('thermal:machines/press/packing2x2/press_slag_packing')
	
	//tin
	event.recipes.thermal.press('9x #forge:nuggets/tin',
	['#forge:ingots/tin', 
	'thermal:press_unpacking_die']).id('thermal:machines/press/press_tin_nugget_unpacking')
	
	//netherite
	event.recipes.thermal.press('9x #forge:nuggets/netherite',
	['#forge:ingots/netherite', 
	'thermal:press_unpacking_die']).id('thermal:machines/press/press_netherite_nugget_unpacking')
})