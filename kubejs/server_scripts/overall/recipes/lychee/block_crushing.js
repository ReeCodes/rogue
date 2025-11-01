ServerEvents.recipes(event => {

	let block_crushing = (inputs, postActions, id) => {
		event.recipes.lychee.block_crushing({
			item_in: inputs.map(i => Ingredient.of(i).toJson()),
			post: postActions.map(action => {
				return {
					type: action.type,
					item: action.item,
					count: action.count
				};
			})
		}).id('lychee:block_crushing/' + id)
	}

	//SPAWNER-SCRAP
	block_crushing([
		'enderio:broken_spawner'
	], [{
		type: 'drop_item',
		item: 'forbidden_arcanus:spawner_scrap',
		count: 1
	}], 'broken_spawner')

	//NOTHINGNESS
	block_crushing([
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender',
		'#forge:dusts/ender'
	], [{
		type: 'drop_item',
		item: 'kubejs:nothingness',
		count: 1
	}], 'nothingness')
})