ItemEvents.entityInteracted(event => {
	const {player, target} = event
    if (target.type == 'the_bumblezone:beehemoth' && player.isHoldingInAnyHand(Ingredient.of('#forge:hoes'))) {
        if (target.nbt.friendship < 1000) {
			player.setStatusMessage(Text.of(`Friendship status: ${event.target.nbt.friendship}/1000`).gold())
			event.cancel()
		}
        else player.setStatusMessage(Text.of(`Friendship status: Maxed!`).gold())
	}
})