ServerEvents.recipes(event => {
	const eio_smelting = (energy, xp, inputs, result, id) => {
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
	
	eio_smelting(1500, 0.1, [
		{ item: 'bloodmagic:plantoil' }
	], '#forge:dusts/niter', 'saltpeter_from_smelting');
	
	eio_smelting(1500, 0.1, [
		{ item: 'minecraft:gravel' }
	], '#forge:slag', 'slag_from_smelting');
	
	eio_smelting(1500, 0.1, [
		{ tag: 'forge:slag' }
	], 'thermal:white_rockwool', 'white_rockwool_from_smelting');
	
	eio_smelting(1500, 0.3, [
		{ tag: 'forge:storage_blocks/slag' }
	], 'immersiveengineering:slag_glass', 'slag_glass_from_smelting');
	
	eio_smelting(1500, 0.3, [
		{ item: 'caupona:litharge_cake' }
	], '#forge:ingots/lead', 'caupona/lead_ingot_from_smelting');

	eio_smelting(3150, 0.3, [
		{ tag: 'forge:ingots/gold' },
		{ count: 2,	tag: 'forge:dusts/mundabitur' },
		{ count: 2,	tag: 'forge:dusts/arcane_crystal' }
	], '#forge:ingots/deorum', 'deorum');

	eio_smelting(3150, 0.3, [
		{ tag: 'forge:ingots/nickel' },
		{ count: 2,	tag: 'forge:ingots/iron' }
	], '3x #forge:ingots/invar', 'invar');

	eio_smelting(3150, 0.3, [
		{ tag: 'forge:dusts/nickel' },
		{ count: 2,	tag: 'forge:dusts/iron'	}
	], '3x #forge:ingots/invar', 'dust_invar');

	eio_smelting(4200, 0.6, [
		{ count: 2,	tag: 'forge:ingots/pulsating_alloy' },
		{ count: 2,	tag: 'forge:dusts/ender_pearl' },
		{ tag: 'forge:ingots/gobber' }
	], '2x miniutilities:unstable_ingot', 'semi_stable_ingot');
	
	oreData.forEach(i => {
		if (i.has_crushed_raw) {
			eio_smelting(1500, 0.3, [
			{ item: 'create:crushed_raw_' + i.name }
			], '#forge:ingots/' + i.name, 'create/smelting/ingot_' + i.name);
		}
		if (i.has_node) {
			eio_smelting(1500, 0.3, [
			{ item: 'malum:' + i.name + '_node' }
			], '6x #forge:nuggets/' + i.name, 'malum/' + i.name + '_from_node_smelting');
		}
		if ((!i.type || ['alloy', 'special_alloy'].includes(i.type)) && i.dust_able) {
			
			eio_smelting(1500, 0.3, [
				{ tag: 'forge:dusts/' + i.name }
			], '#forge:ingots/' + i.name, i.name + '_ingot_from_dust');
			
			if (i.has_ore) {
				eio_smelting(1500, 0.3, [
					{ tag: 'forge:ores/' + i.name }
				], '#forge:ingots/' + i.name, i.name + '_ingot');
			}
		}
	})
})