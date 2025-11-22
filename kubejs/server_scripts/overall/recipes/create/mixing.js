ServerEvents.recipes(event => {
	// CORRUPTI-DUST
	event.recipes.createMixing('2x #forge:dusts/corrupti', [
		'#forge:dusts/ender_pearl',
		'#forge:dusts/arcane_crystal',
		'minecraft:nether_wart',
		'#forge:dusts/blaze',
		'#forge:dusts/obsidian'
	]).id('create:mixing/corrupti_dust')
	
	// COGN. FLUX
	event.recipes.createMixing('3x experienceobelisk:cognitive_flux', [
		'#minecraft:soul_fire_base_blocks',
		'#forge:gems/quartz',
		'#forge:gems/lapis'
	]).id('create:mixing/cognitive_flux')
})