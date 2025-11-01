ServerEvents.recipes(event => {
	const { smelting, blasting } = event;

	let multiSmelt = (output, input, includeBlasting, xp, id) => {
		smelting(output, input).xp(xp).id('minecraft:smelting/' + id)
		if (includeBlasting) {
			blasting(output, input).xp(xp).id('minecraft:blasting/' + id)
		}
	}
	
	multiSmelt('#forge:ingots/tin', '#forge:raw_materials/tin', true, 0.7, 'tin_ingot_from_raw_ore')

	multiSmelt('#forge:ingots/lead', 'caupona:litharge_cake', true, 0.7, 'litharge_cake')
	
	multiSmelt('#forge:ingots/lead', 'create:crushed_raw_lead', true, 0.1, 'ingot_lead')
	multiSmelt('#forge:ingots/silver', 'create:crushed_raw_silver', true, 0.1, 'ingot_silver')
	
	multiSmelt('#forge:ingots/lead', '#forge:dusts/lead', true, 0.7, 'lead_ingot_from_dust')
	multiSmelt('#forge:ingots/silver', '#forge:dusts/silver', true, 0.7, 'silver_ingot_from_dust')

	blasting('#forge:ingots/iron', 'dustrial_decor:rusty_iron_ingot').xp(0.1).id('minecraft:blasting/rusty_iron_ingot')
	
	smelting('thermal:white_rockwool', '#forge:slag').xp(0.1).id('thermal:furnace/white_rockwool_from_smelting')
	smelting('immersiveengineering:slag_glass', '#forge:storage_blocks/slag').xp(0.1).id('thermal:furnace/slag_glass_from_smelting')
	
	smelting('embers:ash', 'caupona:soot').xp(0.1).id('minecraft:smelting/soot_to_ash')
})