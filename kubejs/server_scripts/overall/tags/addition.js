// priority: 100

function bulkAdd(event, pairs) {
	pairs.forEach(([tag, item]) => event.add(tag, item))
}

function bulkAddFromList(event, tag, items) {
	items.forEach(i => {
		event.add(tag, i)
	})
}

ServerEvents.tags('item', event => {
	
	bulkAdd(event, [
		['forge:dusts/ender', 'ae2:ender_dust'],
		['forge:dusts/saltpeter', 'thermal:niter_dust'],
		['forge:dusts/dark', 'evilcraft:dark_gem_crushed'],
		['kubejs:geodes', '/kubejs:.+_geode/'],
		['forge:ender_eyes', '/endrem:.+_eye/'],
		['convivium:camellia_seeds', 'convivium:camellia_seeds'],
		['forge:ash', 'embers:ash'],
		['forge:gears/bimetal', 'enderio:iron_gear'],
		['forge:stripped_logs', '/beachparty:stripped_palm_.+/'],
		['minecraft:coals/coal', 'minecraft:coal'],
		['minecraft:coals/coal_coke', 'immersiveengineering:coal_coke'],
		['forge:gems', 'goety:jade'],
		['forge:gems', 'evilcraft:dark_gem'],
		['forge:gems/dark', 'evilcraft:dark_gem'],
		['forge:swords', 'species:spectralibur'],
		['minecraft:swords', 'species:spectralibur'],
		
		//FLUX-INFUSED
		['forge:ingots', 'redstone_arsenal:flux_ingot'],
		['forge:ingots/flux_infused', 'redstone_arsenal:flux_ingot'],
		['forge:gears', 'redstone_arsenal:flux_gear'],
		['forge:gears/flux_infused', 'redstone_arsenal:flux_gear'],
		['forge:nuggets', 'redstone_arsenal:flux_nugget'],
		['forge:nuggets/flux_infused', 'redstone_arsenal:flux_nugget'],
		['forge:dusts/flux_infused', 'redstone_arsenal:flux_dust'],
		
		//ORES
		['forge:ores', 'alexscaves:guanostone_redstone_ore'],
		['forge:ores/redstone', 'alexscaves:guanostone_redstone_ore'],
		['forge:ores', 'alexscaves:coprolith_coal_ore'],
		['forge:ores/coal', 'alexscaves:coprolith_coal_ore'],
		['forge:ores', 'alexscaves:radrock_uranium_ore'],
		['forge:ores/uranium_crystal', 'alexscaves:radrock_uranium_ore'],
		['forge:ores/dark', 'evilcraft:dark_ore'],
		['forge:ores/dark', 'evilcraft:dark_ore_deepslate']
	])
	
	// BLOCK-ITEM-TAGS
	bulkAdd(event, [
		['forge:storage_blocks', 'redstone_arsenal:flux_metal_block'],
		['forge:storage_blocks/flux_infused', 'redstone_arsenal:flux_metal_block'],
		['forge:storage_blocks', 'bloodmagic:dungeon_metal'],
		['forge:storage_blocks/hellforged', 'bloodmagic:dungeon_metal'],
		['forge:storage_blocks', 'alexscaves:block_of_uranium'],
		['forge:storage_blocks/uranium_crystal', 'alexscaves:block_of_uranium']
	])
	
	//URANIUM
	bulkAdd(event, [
		['forge:nuggets', 'alexscaves:uranium_shard'],
		['forge:nuggets/uranium_crystal', 'alexscaves:uranium_shard'],
		['forge:gems', 'alexscaves:uranium'],
		['forge:gems/uranium_crystal', 'alexscaves:uranium'],
		['forge:gems', 'alexscaves:uranium'],
		['forge:gems/uranium_crystal', 'alexscaves:uranium'],
		['forge:gems', 'powah:uraninite'],
		['forge:gems/uraninite', 'powah:uraninite'],
		['forge:gems', 'caverns_and_chasms:spinel'],
		['forge:gems/spinel', 'caverns_and_chasms:spinel']
	])
		
	Ingredient.of(['@tools_complement']).subtract(Ingredient.of([
		'/.+helmet$/', 
		'/.+chestplate$/', 
		'/.+leggings$/', 
		'/.+boots$/'
	])).stacks.forEach(item => {
		event.add('forge:tools', item.id)
	})
	
	// DUSTS
	bulkAddFromList(event, 'forge:dusts', [
		'embers:ash',
		'immersiveengineering:dust_coke',
		'bloodmagic:sand_netherite'
	])
	
	bulkAddFromList(event, 'forge:tools', [
		'species:spectralibur'
	])
	
	// GEARS
	bulkAddFromList(event, 'forge:gears', [
		'enderio:iron_gear',
		'thermalendergy:prismalium_gear', 
		'thermalendergy:melodium_gear', 
		'thermalendergy:stellarium_gear'
	])
	
	Ingredient.of(['@voidscape']).and(Ingredient.of([
		'/.+sword$/', 
		'/.+axe$/', 
		'/.+pickaxe$/', 
		'/.+shovel$/', 
		'/.+hammer$/', 
		'/.+shield$/', 
		'/.+bow$/'
	])).stacks.forEach(item => {
		event.add('forge:tools', item.id)
	})
	
	Ingredient.of(['/gobber2:.*(_sword|_axe|_shovel|_hoe|_hammer|_excavator|_paxel).*/']).stacks.forEach(item => {
		event.add('forge:tools', item.id)
	})

	// INDESTRUCTIBLE - BLACKLIST
	bulkAddFromList(event, 'forbidden_arcanus:modifier/eternal_incompatible', [
		'twilightforest:glass_sword',
		'kubejs:gluttonous_chest',
		'bloodmagic:arcaneashes',
		'/apotheosis:potion_charm/'
	])
	
	//HIDE DISABLED ITEMS
	bulkAddFromList(event, 'c:hidden_from_recipe_viewers', global.oreTagsRemove)
	bulkAddFromList(event, 'c:hidden_from_recipe_viewers', global.disabledItems)
	
	// ENCH REMOVAL	
	//console.log('[ENCHANTMENTS] Disabling unwanted enchantments...');
	global.disEnchantments.forEach(e => {
		//
	})
})

ServerEvents.tags('block', event => {
	
	//CARRY ON - BLACKLIST	
	bulkAddFromList(event, 'forge:immovable', [
		'fastpaintings:painting'
	])
	
	//SPECTRAL HAMMER
	bulkAddFromList(event, 'irons_spellbooks:spectral_hammer_mineable', [
		'forbidden_arcanus:darkstone',
		'twigs:rhyolite'
	])
	
	//BRUSHABLE BLOCKS
	bulkAddFromList(event, 'forge:brushable_blocks', [
		'betterarcheology:fossiliferous_dirt', 
		'betterarcheology:suspicious_red_sand', 
		'minecraft:suspicious_sand', 
		'minecraft:suspicious_gravel'
	])
	
	// BLOCK-TAGS
	bulkAdd(event, [
		['forge:storage_blocks', 'redstone_arsenal:flux_metal_block'],
		['forge:storage_blocks/flux_infused', 'redstone_arsenal:flux_metal_block'],
		['forge:storage_blocks', 'bloodmagic:dungeon_metal'],
		['forge:storage_blocks/hellforged', 'bloodmagic:dungeon_metal']
	])
	
	// ORE-TAGS
	bulkAdd(event, [
		['forge:ores', 'alexscaves:radrock_uranium_ore'],
		['forge:ores/uranium_crystal', 'alexscaves:radrock_uranium_ore']
	])
})