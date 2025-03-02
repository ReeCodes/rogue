// priority: 1

ServerEvents.tags('item', event => {
	global.oreTagsRemove.forEach(o => {
		event.removeAllTagsFrom(o)
	})
})

ServerEvents.tags('block', event => {
	global.oreTagsRemove.forEach(o => {
		if (Item.of(o).isBlock()) {
			event.removeAllTagsFrom(o)
		}
	})
})