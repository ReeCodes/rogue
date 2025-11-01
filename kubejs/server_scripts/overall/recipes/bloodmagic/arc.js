const bm_arc = (event, addedOutputs, consume, inputs, inputSize, outputChance, result, outFluid, tool, id) => {
    addedOutputs = Array.isArray(addedOutputs) ? addedOutputs : [];
    consume = consume ?? true;
    inputSize = inputSize || 1;
    outputChance = outputChance || 0.0;

    let recipe = {
        addedoutput: addedOutputs.length ? addedOutputs.map(a => ({
            type: Item.of(a.type).toJson(),
            chance: (a.chance !== undefined) ? a.chance : 1.0,
            mainchance: (a.mainchance !== undefined) ? a.mainchance : 0.0
        })) : [],
        consumeingredient: consume,
        input: inputs.map(i => Ingredient.of(i).toJson()),
        inputsize: inputSize,
        mainoutputchance: outputChance,
        output: Item.of(result).toJson(),
        tool: Ingredient.of(tool)
    };

    if (outFluid) recipe.outputFluid = outFluid.toJson();

    event.recipes.bloodmagic.arc(recipe).id('bloodmagic:arc/' + id);
};

ServerEvents.recipes(event => {

	// SULFUR-LAVA
	bm_arc(event, false, false, ['#forge:netherrack'], 1, 0.0, '#forge:dusts/sulfur', Fluid.of('minecraft:lava', 50), '#bloodmagic:arc/explosive', 'netherrack_to_sulfer');
	
	//METALS
	oreData.forEach(i => {
		if (i.has_gravel) {
			//DUSTS-FROM-GRAVELS
			bm_arc(event, false, false, ['#bloodmagic:gravels/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'dusts_from_gravel_' + i.name)
		}
	})
})