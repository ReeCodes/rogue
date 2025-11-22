ServerEvents.recipes(event => {
	const { create } = event.recipes;

	event.recipes.createMechanicalCrafting('orbital_railgun:orbital_railgun', [
		'GBB      ',
		'BHDB F   ',
		'BCLDBEF  ',
		' BCLDBEF ',
		' EBCLDB  ',
		'  EICJAB ',
		'   EBAMDB',
		'    ABCKB',
		'     ABB '
	], {
		A: 'gobber2:gobber2_block',
		B: '#forge:ingots/gobber',
		C: 'alexscaves:azure_neodymium_ingot',
		D: 'alexscaves:scarlet_neodymium_ingot',
		E: 'cataclysm:black_steel_ingot',
		F: 'gobber2:gobber2_glass',
		G: 'dungeonnowloading:combustion_cell',
		H: 'dungeonnowloading:redstone_suppressor',
		I: 'dungeonnowloading:redstone_circuit',
		J: 'dungeonnowloading:redstone_core',
		K: 'species:kinetic_core',
		L: 'thermalendergy:vibrating_core',
		M: 'miniutilities:netherite_opinium_core'
	}).id('create:mechanical_crafting/orbital_railgun')
})