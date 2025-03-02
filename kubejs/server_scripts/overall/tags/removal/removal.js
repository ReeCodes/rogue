// priority: 1

ServerEvents.tags('item', event => {
	
	event.remove('forge:leather', 'forbidden_arcanus:rotten_leather')
	event.remove('forge:feathers', 'forbidden_arcanus:golden_feather')
	
	event.remove('minecraft:music_discs', 'supplementaries:pancake')
	
	event.remove('forge:rods/blaze', 'miniutilities:flame_lily')
	event.remove('forge:rods', 'miniutilities:flame_lily')
	
	event.remove('forge:gems', 'goety:magic_emerald')
	event.remove('forge:gems/emerald', 'goety:magic_emerald')
	
	event.remove('forge:leather', 'forbidden_arcanus:rotten_leather')
	
	event.remove('forge:gears/iron', 'enderio:iron_gear')
	
	event.remove('forge:storage_blocks/emerald', 'goety:awakened_emerald_block')
	
	//AC-URANIUM
	event.removeAllTagsFrom('alexscaves:uranium_shard')
	event.removeAllTagsFrom('alexscaves:uranium')
	event.removeAllTagsFrom('alexscaves:block_of_uranium')
	
	//PARTS
	global.partDuplicates.forEach(p => {
		event.removeAllTagsFrom(p)
	})
})

ServerEvents.tags('block', event => {
	
	event.remove('forge:storage_blocks/emerald', 'goety:awakened_emerald_block')
	
	event.removeAllTagsFrom('alexscaves:block_of_uranium')
})