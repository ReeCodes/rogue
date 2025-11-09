function depot_application(event, output, inputInHand, inputOnDepot, hasDurability, sound) {
    const { block, hand, server, player } = event;
    if (hand === 'OFF_HAND') return;
	
	if (!hasDurability) hasDurability = false;

    let depotItem = block.entityData?.HeldItem?.Item?.id;
    let depotData = block.entityData;
    let handItem = player.mainHandItem;

    if (!depotItem) return;

    let inputOnDepotItem = Item.of(inputOnDepot);
    let inputInHandItem = Item.of(inputInHand);

    if (depotItem == inputOnDepotItem.id && handItem.id == inputInHandItem.id) {
        if (hasDurability) {
            player.damageHeldItem(hand, 1);
        } else {
            handItem.count--;
        }

        let depotCount = depotData.HeldItem.Item.Count;
        if (depotCount > 1) {
            server.runCommandSilent(`data modify block ${block.x} ${block.y} ${block.z} HeldItem.Item.Count set value ${depotCount - 1}`);
        } else {
            server.runCommandSilent(`data remove block ${block.x} ${block.y} ${block.z} HeldItem`);
        }

        player.give(output);
        server.runCommandSilent(`playsound ${sound} master ${player.username} ${player.x} ${player.y} ${player.z} 1`);
        event.cancel();
    }
}

BlockEvents.rightClicked('create:depot', event => {
    let player = event.player;
    if (!player) return;

    for (let recipe of global.assistedCrafting) {
        let requiredStage = 'ac_' + recipe.tool.split(':')[1];
        if (player.stages.has(requiredStage)) {
            depot_application(
                event,
                recipe.output,
                recipe.input1,
                recipe.input2,
				recipe.hasDurability,
                recipe.sound
            );
        }
    }
});