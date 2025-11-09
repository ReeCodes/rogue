const $CREATE_RECIPE_CATEGORY = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory');

const Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const Level = Java.loadClass('net.minecraft.world.level.Level');
const setLevelMethod = Entity.__javaObject__.getDeclaredMethod('m_284535_', Level);
setLevelMethod.setAccessible(true);

const $DEPLOYER_ANIMATION = Java.loadClass('com.simibubi.create.compat.jei.category.animations.AnimatedDeployer');
const $ALL_GUI_TEXTURES = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures');
const $AnimatedKinetics = Java.loadClass('com.simibubi.create.compat.jei.category.animations.AnimatedKinetics');

JEIAddedEvents.registerCategories(event => {
    event.custom('kubejs:depot_crafting', category => {
        const { jeiHelpers, jeiHelpers: { guiHelper } } = category
       // global.depotCraftingCategory = category;
        global.depotCraftingType = category
			.setWidth(176)
			.setHeight(68)
            .title(Text.translatable('category.kubejs.depot.crafting'))
            .background(guiHelper.createBlankDrawable(176, 68))
            .icon(guiHelper.createDrawableItemStack(Item.of('create:depot')))
            .isRecipeHandled((recipe) => {
                return global["verifyRecipe"](category.jeiHelpers, recipe);
            })
            .handleLookup((builder, recipe, focuses) => {
                global["handleLookup"](category.jeiHelpers, builder, recipe, focuses);
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                global["renderDepotBlocks"](category.jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY);
            })
            .recipeType;
    })
})

global["verifyRecipe"] = (jeiHelpers, recipe) => {
    return !!(
        recipe?.data?.input1 !== undefined &&
        recipe?.data?.input2 !== undefined &&
        recipe?.data?.output !== undefined
    );
};

global["handleLookup"] = (jeiHelpers, builder, recipe, focuses) => {
    builder.addSlot("INPUT", 27, 51)
		.setBackground($CREATE_RECIPE_CATEGORY.getRenderedSlot(), -1, -1)
		.addItemStack(Item.of(recipe.data.input1))
		.setSlotName("input");
    builder.addSlot("INPUT", 51, 5)
		.setBackground($CREATE_RECIPE_CATEGORY.getRenderedSlot(), -1, -1)
		.addItemStack(Item.of(recipe.data.input2))
		.setSlotName("input");
    builder.addSlot("OUTPUT", 131, 47)
		.setBackground($CREATE_RECIPE_CATEGORY.getRenderedSlot(), -1, -1)
        .addItemStack(Item.of(recipe.data.output))
        .setSlotName("output");
}

JEIAddedEvents.registerRecipes((event) => {
	
    let entity = Client.level.createEntity('minecraft:allay');
    entity.noCulling = true;
    global.depot_crafting = event.custom('kubejs:depot_crafting');

    global.assistedCrafting.forEach(recipe => {
        global.depot_crafting.add({
            input1: recipe.input1,
            input2: recipe.input2,
            output: recipe.output,
            entity: (level) => {
                if (entity.level != level) {
                    setLevelMethod.invoke(entity, level);
                }
                return entity;
            },
            offset: 1,
            renderScale: 25
        });
    });
});

global["renderDepotBlocks"] = (jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
	
    const drawGuiElements = () => {
        $ALL_GUI_TEXTURES.JEI_SHADOW.render(guiGraphics, 62, 57);
        $ALL_GUI_TEXTURES.JEI_DOWN_ARROW.render(guiGraphics, 126, 29);
        $ALL_GUI_TEXTURES.JEI_DOWN_ARROW.render(guiGraphics, 76, 22);
    };

    const renderDepotBlock = () => {
        let pose = guiGraphics.pose();
        pose.pushPose();
        pose.translate(89, 30, 50);
        pose.scale(1.05, 1.05, 1.05);
        pose.mulPose(new Quaternionf().rotationXYZ(KMath.PI / 1.2, KMath.PI / 4, KMath.PI));

        $AnimatedKinetics.defaultBlockElement(Utils.parseBlockState('create:depot'))
            .atLocal(0, 2, 0)
            .scale(20)
            .render(guiGraphics);

        pose.popPose();
    };

    const renderEntity = () => {
        let pose = guiGraphics.pose();
        pose.pushPose();

        let entity = recipe.data.entity(Client.level);
        pose.translate(112, 20, 50);
        pose.scale(recipe.data.renderScale, recipe.data.renderScale, recipe.data.renderScale);
        pose.mulPose(new Quaternionf().rotationZ(KMath.PI));
        pose.mulPose(new Quaternionf().rotationY(KMath.PI / 15));

        let dispatcher = Client.entityRenderDispatcher;
        dispatcher.setRenderShadow(false);
        dispatcher.render(entity, 0, 0, 0, 0, 1, pose, guiGraphics.bufferSource(), 0xF000F0);
        dispatcher.setRenderShadow(true);

        guiGraphics.bufferSource().endBatch();
        pose.popPose();
    };

    drawGuiElements();
    renderDepotBlock();
    renderEntity();
};

JEIAddedEvents.registerRecipeCatalysts(event => {
    event.data["addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])"](Item.of('create:depot'), [global.depotCraftingType])
})