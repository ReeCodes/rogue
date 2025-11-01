const multiSqueeze = (event, type, input, outputs, duration, id) => {
	event.recipes.integrateddynamics[type]({
		item: Ingredient.of(input).toJson(),
		result: {
			items: outputs.map(o => {
				if (o.chance) {
					return {
						item: Item.of(o.item).id,
						count: o.count || 1,
						chance: o.chance
					};
				} else {
					return Item.of(o).toJson();
				}
			})
		},
		duration: duration || 40
	}).id('integrateddynamics:' + type + '/' + id);
};