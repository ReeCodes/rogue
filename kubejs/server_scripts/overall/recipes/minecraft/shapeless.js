ServerEvents.recipes(event => {

	event.shapeless('kubejs:dust_size_down', [
		'minecraft:bowl',
		'forbidden_arcanus:arcane_crystal_dust',
		'minecraft:brown_mushroom',
		'waystones:warp_dust'
	]).id('minecraft:shaped/dust_size_down')

	event.shapeless('kubejs:dust_size_up', [
		'minecraft:bowl',
		'forbidden_arcanus:arcane_crystal_dust',
		'minecraft:red_mushroom',
		'waystones:warp_dust'
	]).id('minecraft:shaped/dust_size_up')

	var missingIngotToNugget = ['lead', 'silver', 'nickel', 'constantan', 'electrum', 'steel', 'tin'];

	missingIngotToNugget.forEach(m => {
		event.shapeless('9x #forge:nuggets/' + m, '#forge:ingots/' + m).id('minecraft:recipes/shapeless/' + m + '_ingot_to_nugget')
	})

	//RUBBER-EXCHANGE
	event.shapeless('thermal:rubber', 'industrialforegoing:dryrubber').id('minecraft:recipes/shapeless/rubber_to_rubber')
	event.shapeless('industrialforegoing:dryrubber', 'thermal:rubber').id('minecraft:recipes/shapeless/rubber_to_rubber2')

	//ASSES-TO-COINS
	event.shapeless('5x #forge:coins/copper', 'caupona:asses').id('minecraft:recipes/shapeless/asses_to_coins')

	//ANY-WOODEN-TO-CHEST
	event.shapeless('minecraft:chest', '#forge:chests/wooden').id('minecraft:recipes/shapeless/wooden_chests_to_normal')

	//NUGGETS-TO-ORBS
	event.shapeless('miniutilities:experience_pearl', [
		'create:experience_nugget',
		'create:experience_nugget',
		'create:experience_nugget',
		'create:experience_nugget'
	]).id('minecraft:recipes/shapeless/nuggets_to_orbs')

	//TS
	event.shapeless('toms_storage:ts.inventory_hopper_basic', [
		'toms_storage:ts.inventory_cable',
		'minecraft:hopper'
	]).id('minecraft:recipes/shapeless/inventory_hopper_basic')

	event.shapeless('toms_storage:ts.level_emitter', [
		'toms_storage:ts.inventory_cable',
		'minecraft:comparator'
	]).id('minecraft:recipes/shapeless/level_emitter')
	
	event.shapeless('toms_storage:ts.inventory_cable_connector', [
		'toms_storage:ts.trim',
		'toms_storage:ts.inventory_cable',
		'#forge:ender_pearls'
	]).id('minecraft:recipes/shapeless/inventory_cable_connector')

	//WOODEN-VARIANT-CHESTS
	var woodTypes = [
		'oak',
		'spruce',
		'birch',
		'jungle',
		'acacia',
		'dark_oak',
		'mangrove',
		'cherry',
		'bamboo',
		'crimson',
		'warped'
	];

	woodTypes.forEach(w => {
		if (!['bamboo'].includes(w)) {
			event.shapeless('woodworks:' + w + '_chest', [
				'minecraft:chest',
				'minecraft:' + w + '_planks'
			]).id('woodworks:' + w + '_chest')
		} else {
			event.shapeless('woodworks:' + w + '_closet', [
				'minecraft:chest',
				'minecraft:' + w + '_planks'
			]).id('woodworks:' + w + '_closet')
		}
	})
	
	//ARS-NOVEAU
	event.shapeless('ars_nouveau:novice_spell_book', [
		'minecraft:writable_book',
		'#forge:gems/amethyst',
		'#forge:gears/gold',
		'#forge:dusts/amethyst',
		'#forge:gems/source'
	]).id('ars_nouveau:novice_spell_book')
	
	//APO-APPLE
	event.shapeless('minecraft:barrier', [
		'minecraft:barrier'
	]).id('apotheosis:enchanted_golden_apple')
})