const bm_alchemy_table = (event, inputs, result, syphon, time, lvl, id) => {
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

ServerEvents.recipes(event => {
	
	//SULFUR
	bm_alchemy_table(event, ['minecraft:lava_bucket', '#forge:cobblestone'], '4x #forge:dusts/sulfur', 200, 100, 0, 'sulfur_from_lava')
	bm_alchemy_table(event, ['bloodmagic:lavasigil', '#forge:cobblestone'], '4x #forge:dusts/sulfur', 1200, 100, 0, 'sulfur_from_sigil')
	
	//SALTPETER
	bm_alchemy_table(event, ['bloodmagic:plantoil', 'bloodmagic:plantoil', '#forge:dusts/coal'], '3x #forge:dusts/saltpeter', 200, 200, 1, 'saltpeter')
	
	//COAL
	bm_alchemy_table(event, ['#forge:dusts/coal', 'bloodmagic:corrupted_dust'], '3x #forge:dusts/coal', 50, 50, 3, 'corrupted_coal')
	bm_alchemy_table(event, ['#minecraft:coals/coal', '#minecraft:coals/coal', 'minecraft:flint'], '4x #forge:dusts/coal', 400, 200, 1, 'sand_coal')
	
	//CUTTING-FLUID-REPLACE
	bm_alchemy_table(event, [
		'bloodmagic:tauoil', 
		'#forge:dusts/hellforged', 
		'minecraft:glow_berries', 
		'#forge:dusts/saltpeter', 
		'#forge:dusts/sulfur', 
		{ type: "nbt", item: "minecraft:potion", nbt: "{Potion:\"minecraft:water\"}"}
	], 'bloodmagic:advancedcuttingfluid', 4000, 200, 4, 'advance_cutting_fluid')

	bm_alchemy_table(event, [
		'bloodmagic:tauoil', 
		'#forge:dusts/hellforged', 
		'minecraft:glow_berries', 
		'#forge:dusts/saltpeter', 
		'#forge:dusts/sulfur', 
		'bloodmagic:watersigil'
	], 'bloodmagic:advancedcuttingfluid', 4100, 200, 4, 'advance_cutting_fluid_sigil')

})