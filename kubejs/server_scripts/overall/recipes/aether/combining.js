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
	
	combining('combinable_misc', 2.4, ['illagerinvasion:primal_essence', 'malum:hallowed_gold_ingot', 'naturesaura:token_joy'], 'minecraft:totem_of_undying', 200, 'tou_1');
	combining('combinable_misc', 4.8, ['illagerinvasion:primal_essence', 'illagerinvasion:hallowed_gem', 'naturesaura:token_anger'], 'friendsandfoes:totem_of_freezing', 200, 'tof_1');
	combining('combinable_misc', 4.8, ['illagerinvasion:primal_essence', 'illagerinvasion:hallowed_gem', 'naturesaura:token_fear'], 'friendsandfoes:totem_of_illusion', 200, 'toi_1');
})