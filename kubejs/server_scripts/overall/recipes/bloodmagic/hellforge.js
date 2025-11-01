ServerEvents.recipes(event => {

    let bm_hellforge = (drain, inputs, minDrain, result, id) => {
        let recipe = {
            drain: drain,
            minimumDrain: minDrain,
            output: Item.of(result)
        };

        if (inputs.length > 0) recipe.input0 = Ingredient.of(inputs[0]);
        if (inputs.length > 1) recipe.input1 = Ingredient.of(inputs[1]);
        if (inputs.length > 2) recipe.input2 = Ingredient.of(inputs[2]);
        if (inputs.length > 3) recipe.input3 = Ingredient.of(inputs[3]);

        event.recipes.bloodmagic.soulforge(recipe).id('bloodmagic:soulforge/' + id);
    }
})