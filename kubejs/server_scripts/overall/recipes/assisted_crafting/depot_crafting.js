BlockEvents.rightClicked('create:depot', event => {
	const { block, hand, server, player } = event

	if (hand == 'OFF_HAND') return;
	let depotItem = block.entityData.HeldItem?.Item?.id;
	let handItem = player.mainHandItem;
	let depotData = block.entityData

	let depot_application = (output, inputInHand, inputOnDepot, hasDurability, sound) => {
		inputOnDepot = Item.of(inputOnDepot);
		inputInHand = Item.of(inputInHand);
		if (depotItem != undefined && handItem.id == inputInHand) {
			if (inputOnDepot == depotItem && inputInHand == handItem.id) {
				if (hasDurability == false) {
					handItem.count--
				} else {
					player.damageHeldItem(event.hand, 1)
				}
				let depotItemCount = depotData.HeldItem.Item.Count
				if (depotItemCount > 1) {
					server.runCommandSilent(`data modify block ${block.x} ${block.y} ${block.z} HeldItem.Item.Count set value ${depotItemCount - 1}`)
				} else {
					server.runCommandSilent(`data remove block ${block.x} ${block.y} ${block.z} HeldItem`)
				}
				player.give(output)
				event.server.runCommandSilent(`playsound ${sound} master ${player.username} ${player.x} ${player.y} ${player.z} 1`)
				event.cancel()
			}
		}
	}
	
	if (player.stages.has('ac_yeta_wrench')) {
		depot_application('hyperbox:hyperbox', '#forge:gears/enderium', 'create:brass_casing', false, 'ad_astra:wrench')
		depot_application('javd:portal_block', 'enderio:ender_crystal_powder', 'minecraft:obsidian', false, 'ad_astra:wrench')
	}
	if (player.stages.has('ac_livingwood_twig')) {
		depot_application('naturescompass:naturescompass', 'twilightforest:liveroot', 'minecraft:compass', false, 'alexscaves:tectonic_shard_transform')
		depot_application('explorerscompass:explorerscompass', 'minecraft:cobweb', 'minecraft:compass', false, 'alexscaves:tectonic_shard_transform')
	}
})