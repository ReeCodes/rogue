ServerEvents.recipes(event => {

	let ww_sawing = (count, input, result, id) => {
		event.recipes.woodworks.sawmill({
			count: count,
			ingredient: Ingredient.of(input).toJson(),
			result: Item.of(result).id
		}).id('woodworks:sawing/'+id)
	}
	
	//TOMS
	ww_sawing(6, 'toms_storage:ts.trim', 'toms_storage:ts.inventory_cable', 'inventory_cable')
	ww_sawing(6, 'toms_storage:ts.trim', 'toms_storage:ts.inventory_cable_framed', 'inventory_cable_framed')
	
	//CFB
	ww_sawing(1, '#minecraft:wooden_slabs', 'cookingforblockheads:spice_rack', 'spice_rack')
	
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
	
	var drawerTypes = ['2', '4'];
	
	drawerTypes.forEach(n => {
		drawerWoodTypes.forEach(w => {
			ww_sawing(1, 'functionalstorage:'+w+'_1', 'functionalstorage:'+w+'_'+n, 'drawer_'+w+'_'+n)
		})
	})
})