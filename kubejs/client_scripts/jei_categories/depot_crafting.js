JEIAddedEvents.registerCategories(event => {
    event.custom('kubejs:depot_crafting', category => {
        const { jeiHelpers, jeiHelpers: { guiHelper } } = category
        global.depotCraftingCategory = category;
        global.depotCraftingType = category
            .title(Text.translatable('category.kubejs.depot.crafting'))
            .background(guiHelper.createBlankDrawable(176, 68))
            .icon(guiHelper.createDrawableItemStack('create:depot'))
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

const $CREATE_RECIPE_CATEGORY = Java.loadClass('com.simibubi.create.compat.jei.category.CreateRecipeCategory');

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

const Entity = Java.loadClass('net.minecraft.world.entity.Entity');
const Level = Java.loadClass('net.minecraft.world.level.Level');
const setLevelMethod = Entity.__javaObject__.getDeclaredMethod('m_284535_', Level);
setLevelMethod.setAccessible(true);

const $DEPLOYER_ANIMATION = Java.loadClass('com.simibubi.create.compat.jei.category.animations.AnimatedDeployer');
const $ALL_GUI_TEXTURES = Java.loadClass('com.simibubi.create.foundation.gui.AllGuiTextures');

JEIAddedEvents.registerRecipes((event) => {
		let entity = Client.level.createEntity('minecraft:allay');
		entity.noCulling = true;
		global.depot_crafting = event.custom('kubejs:depot_crafting')
        .add({
            input1: '#forge:gears/enderium',
            input2: 'create:brass_casing',
            output: 'hyperbox:hyperbox',
			entity: (level) => {
				if (entity.level != level) {
					setLevelMethod.invoke(entity, level);
				}
				return entity;
			},
			offset: 1,
			renderScale: 25
        })
		.add({
            input1: 'enderio:ender_crystal_powder',
            input2: 'minecraft:obsidian',
            output: 'javd:portal_block',
			entity: (level) => {
				if (entity.level != level) {
					setLevelMethod.invoke(entity, level);
				}
				return entity;
			},
			offset: 1,
			renderScale: 25
        })
		.add({
            input1: 'twilightforest:liveroot',
            input2: 'minecraft:compass',
            output: 'naturescompass:naturescompass',
			entity: (level) => {
				if (entity.level != level) {
					setLevelMethod.invoke(entity, level);
				}
				return entity;
			},
			offset: 1,
			renderScale: 25
        })
		.add({
            input1: 'minecraft:cobweb',
            input2: 'minecraft:compass',
            output: 'explorerscompass:explorerscompass',
			entity: (level) => {
				if (entity.level != level) {
					setLevelMethod.invoke(entity, level);
				}
				return entity;
			},
			offset: 1,
			renderScale: 25
        })
});

const DEPOT_ANIMATION = new $DEPLOYER_ANIMATION();
const AnimatedKinetics = Java.loadClass('com.simibubi.create.compat.jei.category.animations.AnimatedKinetics');

global["renderDepotBlocks"] = (jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
	$ALL_GUI_TEXTURES.JEI_SHADOW.render(guiGraphics, 62, 57);
	$ALL_GUI_TEXTURES.JEI_DOWN_ARROW.render(guiGraphics, 126, 29);
	$ALL_GUI_TEXTURES.JEI_DOWN_ARROW.render(guiGraphics, 76, 22);
	
	//BLOCK-RENDER
    let poseStack = guiGraphics.pose();
	let blockScale = 1.05;

	poseStack.pushPose();
	poseStack.translate(89, 30, 50);
    poseStack.scale(blockScale, blockScale, blockScale);
    poseStack.mulPose(new Quaternionf().rotationXYZ(KMath.PI / 1.2, KMath.PI / 4, KMath.PI));
	
    AnimatedKinetics.defaultBlockElement(Utils.parseBlockState('create:depot'))
        .atLocal(0, 2, 0)
        .scale(20)
        .render(guiGraphics);
	poseStack.popPose();
	
	//ENTITY-RENDER
	let poseStackEntity = guiGraphics.pose();
	poseStackEntity.pushPose();
	let entity = recipe.data.entity(Client.level);
	poseStackEntity.translate(112, 20, 50);
	let scale = recipe.data.renderScale;
	poseStackEntity.scale(scale, scale, scale)
	poseStackEntity.mulPose(new Quaternionf().rotationZ(KMath.PI));
	poseStackEntity.mulPose(new Quaternionf().rotationY(KMath.PI / 15));

	let entityRenderDispatcher = Client.entityRenderDispatcher;
	entityRenderDispatcher.setRenderShadow(false);
	entityRenderDispatcher.render(entity, 0, 0, 0, 0, 1, poseStackEntity, guiGraphics.bufferSource(), 0xF000F0);
	entityRenderDispatcher.setRenderShadow(true);

	guiGraphics.bufferSource().endBatch();
	poseStackEntity.popPose();
}