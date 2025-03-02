// priority: 100

ServerEvents.tags('item', event => {
	//SPECIFIC
	event.add('forge:dusts/ender', 'ae2:ender_dust')
	event.add('forge:dusts/saltpeter', 'thermal:niter_dust')
	event.add('kubejs:geodes', '/kubejs:.+_geode/')
	event.add('forge:ender_eyes', '/endrem:.+_eye/')
	
	event.add('convivium:camellia_seeds', 'convivium:camellia_seeds')
	
	event.add('forge:dusts', 'embers:ash')
	event.add('forge:ash', 'embers:ash')
	event.add('forge:gears/bimetal', 'enderio:iron_gear')
	
	event.add('forge:stripped_logs', '/beachparty:stripped_palm_.+/')
	
	event.add('minecraft:coals/coal', 'minecraft:coal')
	
	event.add('forge:gems', 'goety:jade')
		
	Ingredient.of(['@tools_complement']).subtract(Ingredient.of([
		'/.+helmet$/', 
		'/.+chestplate$/', 
		'/.+leggings$/', 
		'/.+boots$/'
	])).stacks.forEach(item => {
		event.add('forge:tools', item.id)
	})
	
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
	
	Ingredient.of(['#allayed:plasma_items']).subtract(Ingredient.of([
		'allayed:plasma_magnet'
	])).stacks.forEach(item => {
		event.add('forge:tools', item.id)
	})

	//UNBREAKABLE - BLACKLIST
	let stellaBlacklist = [
	'twilightforest:glass_sword',
	'kubejs:gluttonous_chest',
	'bloodmagic:arcaneashes',
	'/apotheosis:potion_charm/'
	];
	
	stellaBlacklist.forEach(item => {
		event.add('forbidden_arcanus:modifier/eternal_incompatible', item)
	})
})

ServerEvents.tags('block', event => {
	
	//CARRY ON - BLACKLIST	
	let carryBL = [
	'fastpaintings:painting'
	];
	
	carryBL.forEach(b => {
		event.add('forge:immovable', b)
	})
	
	//SPECTRAL HAMMER
	let spectralMineables = [
	'forbidden_arcanus:darkstone',
	'twigs:rhyolite'
	];
	
	spectralMineables.forEach(b => {
		event.add('irons_spellbooks:spectral_hammer_mineable', b)
	})
	
	//SPECTRAL HAMMER
	let brushBlocks = [
	'betterarcheology:fossiliferous_dirt', 
	'betterarcheology:suspicious_red_sand', 
	'minecraft:suspicious_sand', 
	'minecraft:suspicious_gravel'
	];
	
	brushBlocks.forEach(b => {
		event.add('forge:brushable_blocks', b)
	})
})