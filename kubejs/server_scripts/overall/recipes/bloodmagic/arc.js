ServerEvents.recipes(event => {

	let bm_arc = (addedOutputs, consumeB, inputs, iSize, outputChance, result, outFluid, toolUse, id) => {
		addedOutputs = addedOutputs || [];
		outFluid = (outFluid == false) ? undefined : outFluid;

		addedOutputs = addedOutputs.map(a => {
			return {
				type: Item.of(a.type),
				chance: a.chance,
				mainchance: a.mainchance
			}
		});

		var recipe = {
			addedoutput: addedOutputs,
			consumeingredient: consumeB,
			input: inputs.map(i => Ingredient.of(i).toJson()),
			inputsize: iSize,
			mainoutputchance: outputChance,
			output: Item.of(result).toJson(),
			tool: Ingredient.of(toolUse),
		};

		if (outFluid) {
			recipe.outputFluid = outFluid;
		}

		event.recipes.bloodmagic.arc(recipe).id('bloodmagic:arc/' + id);
	}

	//SULFUR-LAVA
	bm_arc(false, false, ['#forge:netherrack'], 1, 0.0, '#forge:dusts/sulfur', Fluid.of('minecraft:lava', 50).toJson(), '#bloodmagic:arc/explosive', 'netherrack_to_sulfer')

	//METALS
	metalData.forEach(i => {
		if (i.dust_able && i.type == undefined) {
			//ORES-TO-DUST
			bm_arc(false, false, ['#forge:ores/' + i.name], 1, 0.0, '3x #forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'ore/dust' + i.name)
			if (i.has_raw) {
				//RAW_MATERIALS
				bm_arc([{
					type: '#forge:dusts/' + i.name,
					chance: 0.17,
					mainchance: 0.33
				}], false, ['#forge:raw_materials/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'dusts_from_raw_' + i.name)
			}
			//DUSTS-FROM-INGOTS
			bm_arc(false, false, ['#forge:ingots/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/explosive', 'dusts_from_ingot_' + i.name)
			if (i.has_gravel) {
				//DUSTS-FROM-GRAVELS
				bm_arc(false, false, ['#bloodmagic:gravels/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'dusts_from_gravel_' + i.name)
			}
		} 
		if (i.dust_able && i.type == 'alloy') {
			bm_arc(false, false, ['#forge:ingots/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/explosive', 'dusts_from_ingot_' + i.name)
		}
	})
})