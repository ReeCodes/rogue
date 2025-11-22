ServerEvents.recipes(event => {

	const combining = (category, xp, inputs, output, time, id) => {
		event.recipes.deep_aether.combining({
			category: category,
			experience: xp,
			ingredients: inputs.map(r => Ingredient.of(r).toJson()),
			output: Item.of(output).toJson(),
			processing_time: time
		}).id('deep_aether:' + id)
	}
	
	combining('combinable_misc', 0.4, ['illagerinvasion:primal_essence', 'minecraft:ghast_tear', 'minecraft:rotten_flesh'], '4x caverns_and_chasms:living_flesh', 200, 'living_flesh_1');
	combining('combinable_misc', 0.2, ['eidolon:death_essence', 'minecraft:ghast_tear', 'minecraft:rotten_flesh'], '2x caverns_and_chasms:living_flesh', 200, 'living_flesh_2');
})