ServerEvents.recipes(event => {
	
	const { powah } = event.recipes;
	
	powah.energizing([
	'alexscaves:ferrouslime_ball',
	'#forge:storage_blocks/iron'
	], '2x miniutilities:iron_opinium_core', 10000).id('miniutilities:iron_opinium_core')
	
	powah.energizing([
	'4x miniutilities:iron_opinium_core',
	'#forge:storage_blocks/gold'
	], '2x miniutilities:gold_opinium_core', 100000).id('miniutilities:gold_opinium_core')
	
	powah.energizing([
	'4x miniutilities:gold_opinium_core',
	'#forge:storage_blocks/diamond'
	], '2x miniutilities:diamond_opinium_core', 500000).id('miniutilities:diamond_opinium_core')
	
	powah.energizing([
	'4x miniutilities:diamond_opinium_core',
	'#forge:storage_blocks/netherite',
	'elementalcraft:fireite_ingot'
	], '2x miniutilities:netherite_opinium_core', 1000000).id('miniutilities:netherite_opinium_core')
	
	powah.energizing([
	'4x miniutilities:netherite_opinium_core',
	'#forge:storage_blocks/emerald',
	'#forge:ingots/terrasteel'
	], '2x miniutilities:emerald_opinium_core', 4000000).id('miniutilities:emerald_opinium_core')
	
	powah.energizing([
	'4x miniutilities:emerald_opinium_core',
	'minecraft:chorus_flower',
	'alexsmobs:mimicream'
	], '2x miniutilities:chorus_opinium_core', 8000000).id('miniutilities:chorus_opinium_core')
	
	powah.energizing([
	'4x miniutilities:chorus_opinium_core',
	'miniutilities:experience_pearl_8x',
	'buddycards:true_perfect_buddysteel_ingot'
	], '2x miniutilities:experience_opinium_core', 16000000).id('miniutilities:experience_opinium_core')
	
	powah.energizing([
	'4x miniutilities:experience_opinium_core',
	'minecraft:nether_star',
	'deep_aether:stratus_ingot'
	], '2x miniutilities:nether_star_opinium_core', 32000000).id('miniutilities:nether_star_opinium_core')
	
	powah.energizing([
	'4x miniutilities:nether_star_opinium_core',
	'#forge:storage_blocks/unstable',
	'botania:gaia_ingot'
	], 'miniutilities:the_final_opinium_core', 1000000000).id('miniutilities:the_final_opinium_core')
})