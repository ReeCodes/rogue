ServerEvents.recipes(event => {

	let eio_smelting = (energy, xp, inputs, result, id) => {
		event.recipes.enderio.alloy_smelting({
			energy: energy,
			experience: xp,
			inputs: inputs.map(input => {
				if (input.item) {
					return {
						count: input.count || 1,
						ingredient: [{
							item: input.item
						}]
					};
				} else if (input.tag) {
					return {
						count: input.count || 1,
						ingredient: [{
							tag: input.tag
						}]
					};
				}
			}),
			result: Item.of(result).toJson()
		}).id('enderio:smelting/' + id);
	}

	eio_smelting(3150, 0.6, [
		{ count: 3, tag: 'forge:ingots/uranium'	},
		{ item: 'ae2:charged_certus_quartz_crystal'	}
		], 'alexscaves:uranium', 'crystallized_uranium_from_charged_certus_quartz');
	
	eio_smelting(3150, 0.3, [
		{ tag: 'forge:ingots/gold' },
		{ count: 2, tag: 'forge:dusts/mundabitur' },
		{ count: 2, tag: 'forge:dusts/arcane_crystal' }
		], '#forge:ingots/deorum', 'deorum');
	
	eio_smelting(3150, 0.3, [
		{ tag: 'forge:ingots/nickel'},
		{ count: 2,	tag: 'forge:ingots/iron' }
		], '3x #forge:ingots/invar', 'invar');
	
	eio_smelting(3150, 0.3, [
		{ tag: 'forge:dusts/nickel' },
		{ count: 2,	tag: 'forge:dusts/iron' }
		], '3x #forge:ingots/invar', 'dust_invar');
	
	eio_smelting(4200, 0.6, [
		{ count: 2, tag: 'forge:ingots/pulsating_alloy' },
		{ count: 2,	tag: 'forge:dusts/ender_pearl' },
		{ tag: 'forge:ingots/gobber' }
		], '2x miniutilities:unstable_ingot', 'semi_stable_ingot');
		
	eio_smelting(1500, 0.3, [
		{ item: 'malum:copper_node'	}
		], '6x #forge:nuggets/copper', 'malum/copper_from_node_smelting');
})