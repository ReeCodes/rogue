ServerEvents.recipes(event => {
	
	// MISC
	event.replaceInput({ output: 'miniutilities:kikoku' }, 
		'minecraft:stick', 
		'elementalcraft:hardened_handle'
	)
	
	event.replaceInput({}, 
		'thermal:slag', 
		'#forge:slag'
	)
	
	event.replaceInput({ output: 'draconicevolution:disenchanter', type: 'minecraft:crafting_shaped' }, 
		'minecraft:enchanted_book', 
		'#forge:ingots/draconium_awakened'
	)
	
	event.replaceInput({ output: Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:f",id:"minecraft:water"}}'), type: 'minecraft:crafting_shaped' }, 
		'ae2:cell_component_16k', 
		'bigger_ae2:digital_singularity_cell_component'
	)
	
	event.replaceInput({ output: Item.of('expatternprovider:infinity_cell', '{record:{"#c":"ae2:i",id:"minecraft:cobblestone"}}'), type: 'minecraft:crafting_shaped' }, 
		'ae2:cell_component_16k', 
		'bigger_ae2:digital_singularity_cell_component'
	)
	
	event.replaceInput({ output: 'bigger_ae2:digital_singularity_cell_component', type: 'minecraft:crafting_shaped' }, 
		'ae2:quartz_block', 
		'ae2:singularity'
	)
	
	event.replaceInput({ output: 'integrateddynamics:mechanical_squeezer', type: 'minecraft:crafting_shaped' }, 
		'minecraft:diamond', 
		'#forge:gears/diamond'
	)
	
	event.replaceInput({ output: 'modularrouters:modular_router', type: 'minecraft:crafting_shaped' }, 
		'minecraft:iron_bars', 
		'#forge:gears/invar'
	)
	
	event.replaceInput({ output: 'cataclysm:meat_shredder', type: 'minecraft:crafting_shaped' }, 
		'minecraft:iron_block', 
		Item.of('immersiveengineering:sawblade', '{Damage:0}')
	)
		
	//IA
	event.replaceInput({ output: 'man_of_many_planes:economy_plane', type: 'minecraft:crafting_shaped' }, 
		'immersive_aircraft:engine', 
		'immersive_aircraft:biplane'
	)
		
	event.replaceInput({ output: 'immersive_aircraft:boiler', type: 'minecraft:crafting_shaped' }, 
		'minecraft:copper_ingot', 
		'#forge:plates/copper'
	)
	event.replaceInput({ output: 'immersive_aircraft:propeller', type: 'minecraft:crafting_shaped' }, 
		'minecraft:iron_ingot', 
		'#forge:plates/iron'
	)
		
	event.replaceInput({ output: 'immersive_aircraft:enhanced_propeller', type: 'minecraft:crafting_shaped' }, 
		'minecraft:copper_ingot', 
		'#forge:plates/bronze'
	)
	
	event.replaceInput({ output: 'immersive_aircraft:nether_engine', type: 'minecraft:crafting_shaped' }, 
		'minecraft:nether_brick', 
		'#forge:plates/obsidian'
	)
			
	event.replaceInput({ output: 'immersive_aircraft:hull_reinforcement', type: 'minecraft:crafting_shaped' }, 
		'minecraft:iron_ingot', 
		'#forge:ingots/invar'
	)
		
	event.replaceInput({ output: 'immersive_aircraft:steel_boiler', type: 'minecraft:crafting_shaped' }, 
		'minecraft:iron_ingot', 
		'#forge:plates/steel'
	)
	
	//SOLAR
	event.replaceInput({ output: 'powah:photoelectric_pane', type: 'minecraft:crafting_shaped' }, 
		'minecraft:lapis_lazuli', 
		'enderio:photovoltaic_plate'
	)
	
	event.replaceInput({type: 'minecraft:crafting_shaped' }, 
		'minecraft:chest', 
		'#forge:chests/wooden'
	)
		
	//ENDERIO
	event.replaceInput({}, 
		'enderio:powdered_ender_pearl', 
		'#forge:dusts/ender'
	)
		
	//EIO-ALLOY-UPGRADE
	event.replaceInput(
		{ output: 'enderio:alloy_smelter', type: 'minecraft:crafting_shaped' }, 
		'enderio:void_chassis', 
		'enderio:primitive_alloy_smelter'
	)
	
	//HOPPER-BOTANYPOTS
	event.replaceInput(
		{ id: '/botanypots:botanypots/crafting/.+_hopper_botany_pot/' }, 
		'minecraft:hopper',
		'botania:hopperhock_chibi'
	)
	
	event.replaceInput(
		{ id: '/botanypots:botanypots/crafting/.+_compact_hopper_botany_pot/' }, 
		'minecraft:hopper',
		'botania:hopperhock_chibi'
	)
		
	//AC-URANIUM
	event.replaceInput(
		{ output: 'alexscaves:nuclear_bomb', type: 'minecraft:crafting_shaped' }, 
		'#forge:storage_blocks/uranium', 
		'alexscaves:block_of_uranium'
	)
		
	event.replaceInput(
		{ output: 'alexscaves:nuclear_furnace_component', type: 'minecraft:crafting_shaped' }, 
		'#forge:raw_materials/uranium', 
		'alexscaves:uranium'
	)
		
	event.replaceInput({ output: 'alexscaves:uranium_rod', type: 'minecraft:crafting_shaped' }, 
		'#forge:raw_materials/uranium', 
		'alexscaves:uranium'
	)
		
	event.replaceInput({ output: 'alexscaves:nuclear_siren', type: 'minecraft:crafting_shaped' }, 
		'#forge:raw_materials/uranium', 
		'alexscaves:uranium'
	)
	
	//IE-SLABS	
	event.replaceInput({ output: 'immersiveengineering:slab_storage_lead', type: 'minecraft:crafting_shaped' }, 
		'immersiveengineering:storage_lead', 
		'#forge:storage_blocks/lead'
		)
	event.replaceInput({ output: 'immersiveengineering:slab_storage_silver', type: 'minecraft:crafting_shaped' }, 
		'immersiveengineering:storage_silver', 
		'#forge:storage_blocks/silver'
		)
		
	//CAUPONA-LEAD	
	event.replaceInput({ output: '/caupona:.+/', type: 'minecraft:crafting_shaped' }, 
		'caupona:lead_nugget', 
		'#forge:nuggets/lead'
		)
		
	event.replaceInput({ output: '/caupona:.+/', type: 'minecraft:crafting_shaped' }, 
		'caupona:lead_ingot', 
		'#forge:ingots/lead'
		)
		
	//CONVIVIUM-LEAD	
	event.replaceInput({ output: '/convivium:.+/', type: 'minecraft:crafting_shaped' }, 
		'caupona:lead_nugget', 
		'#forge:nuggets/lead'
		)
		
	event.replaceInput({ output: '/convivium:.+/', type: 'minecraft:crafting_shaped' }, 
		'caupona:lead_ingot', 
		'#forge:ingots/lead'
		)
		
	//SILVER-REPLACEMENTS
	event.replaceInput({}, 
		'galosphere:silver_block', 
		'#forge:storage_blocks/silver'
		)
		
	event.replaceInput({}, 
		'galosphere:silver_ingot', 
		'#forge:ingots/silver'
		)
		
	//ADASTRA - STEEL
	event.replaceInput({ output: 'ad_astra:cable_duct', type: 'minecraft:crafting_shaped' }, 
		'ad_astra:steel_plate', 
		'#forge:plates/steel'
		)
	
	event.replaceInput({}, 
		'ad_astra:steel_rod', 
		'#forge:rods/steel'
		)
	
	//AC-SULFUR
	event.replaceInput({}, 
		'alexscaves:sulfur_dust', 
		'#forge:dusts/sulfur'
		)
		
	//AC-SULFUR
	event.replaceInput({ output: 'eidolon:quicken_incense' }, 
		'eidolon:sulfur', 
		'#forge:dusts/sulfur'
		)
		
	//AA-STEEL
	event.replaceInput({ output: 'ad_astra:astrodux'}, 
		'ad_astra:steel_ingot', 
		'#forge:ingots/steel'
		)
		
	//BAT-WING
	event.replaceInput({}, 
		'forbidden_arcanus:bat_wing', 
		'reliquary:bat_wing'
		)
})