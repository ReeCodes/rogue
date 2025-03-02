ServerEvents.recipes(event => {

	let bm_alchemy_table = (inputs, result, syphon, time, lvl, id) => {
		event.recipes.bloodmagic.alchemytable({
			input: inputs.map(i => {
            if (i.type == 'nbt') {
					return {
						type: "forge:partial_nbt",
						item: i.item,
						nbt: i.nbt
					};
				} else {
					return Ingredient.of(i).toJson();
				}
			}),
			output: Item.of(result).toJson(),
			syphon: syphon,
			ticks: time,
			upgradeLevel: lvl
		}).id('bloodmagic:alchemytable/' + id)
	}
	//SULFUR
	bm_alchemy_table(['minecraft:lava_bucket', '#forge:cobblestone'], '4x #forge:dusts/sulfur', 200, 100, 0, 'sulfur_from_lava')
	bm_alchemy_table(['bloodmagic:lavasigil', '#forge:cobblestone'], '4x #forge:dusts/sulfur', 1200, 100, 0, 'sulfur_from_sigil')
	//SALTPETER
	bm_alchemy_table(['bloodmagic:plantoil', 'bloodmagic:plantoil', '#forge:dusts/coal'], '3x #forge:dusts/saltpeter', 200, 200, 1, 'saltpeter')
	//COAL
	bm_alchemy_table(['#forge:dusts/coal', 'bloodmagic:corrupted_dust'], '3x #forge:dusts/coal', 50, 50, 3, 'corrupted_coal')
	
	//CUTTING-FLUID-REPLACE
	bm_alchemy_table([
		'bloodmagic:tauoil', 
		'#forge:dusts/hellforged', 
		'minecraft:glow_berries', 
		'#forge:dusts/saltpeter', 
		'#forge:dusts/sulfur', 
		{ type: "nbt", item: "minecraft:potion", nbt: "{Potion:\"minecraft:water\"}"}], 'bloodmagic:advancedcuttingfluid', 4000, 200, 4, 'advance_cutting_fluid')

	bm_alchemy_table([
		'bloodmagic:tauoil', 
		'#forge:dusts/hellforged', 
		'minecraft:glow_berries', 
		'#forge:dusts/saltpeter', 
		'#forge:dusts/sulfur', 
		'bloodmagic:watersigil'], 'bloodmagic:advancedcuttingfluid', 4100, 200, 4, 'advance_cutting_fluid_sigil')
	
	//METALS
	metalData.forEach(i => {
		if (i.dust_able && i.type == undefined) {
			//ORES-TO-DUST
			bm_alchemy_table(['#forge:ores/'+i.name, '#bloodmagic:arc/cuttingfluid'], '2x #forge:dusts/'+i.name, 200, 200, 1, 'sand_'+i.name)
			//INGOTS-TO-DUST
			bm_alchemy_table(['#forge:ingots/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_ingot_'+i.name)
			if (i.has_raw) {
				bm_alchemy_table(['#forge:raw_materials/'+i.name, '#bloodmagic:arc/cuttingfluid'], '2x #forge:dusts/'+i.name, 200, 200, 1, 'sand_'+i.name+'_from_raw')
			}
		}
		if (i.type == 'gem') {
			bm_alchemy_table(['#forge:ores/'+i.name, '#bloodmagic:arc/cuttingfluid'], '2x #forge:gems/'+i.name, 200, 200, 1, 'sand_'+i.name)
			if (i.dust_able) {
				bm_alchemy_table(['#forge:gems/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_gem_'+i.name)
			}
		}
	})
})