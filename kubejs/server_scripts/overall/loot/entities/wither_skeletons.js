LootJS.modifiers((event) => {
    event.addEntityLootModifier("minecraft:wither_skeleton").removeLoot('bhc:wither_bone');
});