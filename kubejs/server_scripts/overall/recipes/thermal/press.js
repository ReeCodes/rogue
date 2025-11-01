ServerEvents.recipes(event => {
	const { thermal } = event.recipes;
		
	oreData.forEach(m => {
		if ((!m.type || ['alloy', 'special_alloy'].includes(m.type)) && !(['zinc', 'brass', 'aluminum'].includes(m.name))) {
			
			if (!(['netherite_scrap'].includes(m.name))) {
				thermal.press('9x #forge:ingots/'+m.name, [
					'#forge:storage_blocks/'+m.name, 'thermal:press_unpacking_die'
				]).id('thermal:machines/press/press_'+m.name+'_unpacking');
				
				thermal.press('#forge:storage_blocks/'+m.name, [
					'9x #forge:ingots/'+m.name, 'thermal:press_packing_3x3_die'
				]).id('thermal:machines/press/press_'+m.name+'_packing');
			}
			if (!m.no_nugget) {
				thermal.press('#forge:ingots/'+m.name, [
					'9x #forge:nuggets/'+m.name, 'thermal:press_packing_3x3_die'
				]).id('thermal:machines/press/press_'+m.name+'_nugget_packing')
				
				thermal.press('9x #forge:nuggets/'+m.name, [
					'#forge:ingots/'+m.name, 'thermal:press_unpacking_die'
				]).id('thermal:machines/press/press_'+m.name+'_nugget_unpacking')
			}
		}
	})
	
	// SLAG
	thermal.press('4x #forge:slag',
	['#forge:storage_blocks/slag', 
	'thermal:press_unpacking_die']).id('thermal:machines/press/unpacking/press_slag_unpacking')
	
	thermal.press('#forge:storage_blocks/slag',
	['4x #forge:slag', 
	'thermal:press_packing_2x2_die']).id('thermal:machines/press/packing2x2/press_slag_packing')
})