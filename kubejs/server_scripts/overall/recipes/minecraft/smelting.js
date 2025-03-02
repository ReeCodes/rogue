ServerEvents.recipes(event => {

	let multiSmelt = (output, input, includeBlasting, xp, id) => {
		event.smelting(output, input).xp(xp).id('minecraft:smelting/' + id)

		if (includeBlasting) {
			event.blasting(output, input).xp(xp).id('minecraft:blasting/' + id)
		}

	}
	
	multiSmelt('#forge:ingots/tin', '#forge:raw_materials/tin', true, 0.7, 'tin_ingot_from_raw_ore')

	multiSmelt('#forge:ingots/lead', 'caupona:litharge_cake', true, 0.7, 'litharge_cake')
	
	multiSmelt('#forge:ingots/lead', 'create:crushed_raw_lead', true, 0.1, 'ingot_lead')
	multiSmelt('#forge:ingots/silver', 'create:crushed_raw_silver', true, 0.1, 'ingot_silver')
	
	multiSmelt('#forge:ingots/lead', '#forge:dusts/lead', true, 0.7, 'lead_ingot_from_dust')
	multiSmelt('#forge:ingots/silver', '#forge:dusts/silver', true, 0.7, 'silver_ingot_from_dust')
	
	event.blasting('thermal:white_rockwool', '#forge:slag').xp(0.1).id('thermal:rockwool/white_rockwool_from_blasting')
	event.smelting('thermal:white_rockwool', '#forge:slag').xp(0.1).id('thermal:rockwool/white_rockwool_from_smelting')
	
	event.smelting('embers:ash', 'caupona:soot').xp(0.2).id('minecraft:smelting/soot_to_ash')
	
	event.blasting('#forge:ingots/iron', 'dustrial_decor:rusty_iron_ingot').xp(0.2).id('minecraft:blasting/rusty_iron_ingot')
})