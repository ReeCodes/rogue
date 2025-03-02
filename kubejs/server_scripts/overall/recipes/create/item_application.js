ServerEvents.recipes(event => {

	let c_apply = (inputs, results, id) => {
		event.recipes.create.item_application({
			ingredients: inputs.map(i => Ingredient.of(i).toJson()),
			results: results.map(i => Item.of(i))
		}).id('create:item_application/' + id)
	}
	
	c_apply(['#forge:stripped_logs', '#forge:gears/wood'], ['toms_storage:ts.trim'], 'trim')
	
	c_apply(['toms_storage:ts.trim', '#forge:plates/brass'], ['toms_storage:ts.inventory_proxy'], 'inventory_proxy')
	
	c_apply(['toms_storage:ts.trim', '#minecraft:wooden_trapdoors'], ['toms_storage:ts.open_crate'], 'open_crate')
	
	c_apply(['toms_storage:ts.trim', '#forge:gears/quartz'], ['toms_storage:ts.inventory_connector'], 'inventory_connector')
})