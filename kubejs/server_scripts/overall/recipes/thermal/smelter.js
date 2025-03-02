ServerEvents.recipes(event => {
	event.recipes.thermal.smelter('2x miniutilities:unstable_ingot', [
	'2x #forge:ingots/pulsating_alloy', 
	'2x #forge:dusts/ender_pearl', 
	'#forge:ingots/gobber'
	]).xp(0.5).id('thermal:machines/smelter/smelter_semi_stable_ingot')
	
	event.recipes.thermal.smelter(['minecraft:flint', 
	'#forge:slag'], '#forge:gravel'
	).xp(0.2).id('thermal:machines/smelter/smelter_gravel')
	
	event.recipes.thermal.smelter('#forge:ingots/deorum', [
	'#forge:ingots/gold', 
	'2x #forge:dusts/mundabitur', 
	'2x #forge:dusts/arcane_crystal'
	]
	).xp(0.5).id('thermal:machines/smelter/deorum_ingot')
})