// priority: 120

function bulkRemove(event, pairs) {
	pairs.forEach(pair => {
		event.remove(pair[0], pair[1])
	})
}

function bulkRemoveAllTags(event, items) {
	items.forEach(item => {
		event.removeAllTagsFrom(item)
	})
}

ServerEvents.tags('item', event => {
  
	bulkRemove(event, [
		['forge:leather', 'forbidden_arcanus:rotten_leather'],
		['forge:feathers', 'forbidden_arcanus:golden_feather'],
		['minecraft:music_discs', 'supplementaries:pancake'],
		['forge:rods/blaze', 'miniutilities:flame_lily'],
		['forge:rods', 'miniutilities:flame_lily'],
		['forge:gems', 'goety:magic_emerald'],
		['forge:gems/emerald', 'goety:magic_emerald'],
		['forge:gears/iron', 'enderio:iron_gear'],
		['forge:storage_blocks/emerald', 'goety:awakened_emerald_block'],
		['forge:storage_blocks/uranium', 'alexscaves:block_of_uranium']
	])

	bulkRemoveAllTags(event, [
		'alexscaves:uranium_shard',
		'alexscaves:uranium'
	])

	global.oreTagsRemove.forEach(o => {
		event.removeAllTagsFrom(o)
	})
})

ServerEvents.tags('block', event => {
	
	bulkRemove(event, [
		['forge:storage_blocks/emerald', 'goety:awakened_emerald_block'],
		['forge:storage_blocks/uranium', 'alexscaves:block_of_uranium']
	])
	
	global.oreTagsRemove.forEach(o => {
		if (Item.of(o).isBlock()) {
			event.removeAllTagsFrom(o)
		}
	})
})