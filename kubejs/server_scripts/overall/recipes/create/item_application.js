ServerEvents.recipes(event => {

	const create_application = (inputs, results, id) => {
		event.recipes.create.item_application({
			ingredients: inputs.map(i => Ingredient.of(i).toJson()),
			results: results.map(i => Item.of(i))
		}).id('create:item_application/' + id)
	}
	
	create_application(['#forge:stripped_logs', '#forge:gears/wood'], ['toms_storage:ts.trim'], 'trim')
	
	create_application(['toms_storage:ts.trim', '#forge:plates/brass'], ['toms_storage:ts.inventory_proxy'], 'inventory_proxy')
	
	create_application(['toms_storage:ts.trim', '#minecraft:wooden_trapdoors'], ['toms_storage:ts.open_crate'], 'open_crate')
	
	create_application(['toms_storage:ts.trim', '#forge:gears/quartz'], ['toms_storage:ts.inventory_connector'], 'inventory_connector')
})