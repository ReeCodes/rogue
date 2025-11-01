// priority: -200

ServerEvents.recipes(event => {
    const { naturesaura } = event.recipes;
	const { thermal } = event.recipes;
	const { occultism } = event.recipes;
	
	oreData.forEach(i => {
		
		if (i.dust_able) {
			event.remove(['occultism:crushing', 'ars_nouveau:crush', 'naturesaura:altar', 'bloodmagic:alchemytable', 'bloodmagic:arc', 'enderio:sag_milling'].map(t => ({type: t , output: '#forge:dusts/' + i.name})));
			
			if (!i.type) {
				//ORES-TO-DUST
				occultism.crushing('2x #forge:dusts/' + i.name, '#forge:ores/' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust');
				glyph_crush(event, '#forge:ores/' + i.name, [{	count: 2, item: '#forge:dusts/' + i.name, maxItems: 2 }], i.name + '_dust');
				naturesaura.altar('3x #forge:dusts/' + i.name, '#forge:ores/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ore_crushing');
				bm_alchemy_table(event, ['#forge:ores/'+i.name, '#bloodmagic:arc/cuttingfluid'], '2x #forge:dusts/'+i.name, 300, 50, 3, 'sand_'+i.name);
				bm_arc(event, false, false, ['#forge:ores/' + i.name], 1, 0.0, '3x #forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'ore/dust' + i.name);
				if (!['gold', 'quartz', 'draconium'].includes(i.name)) {
					eio_sag_mill(event, 2400, '#forge:ores/' + i.name, [
						'#forge:dusts/' + i.name,
						{chance: 0.33, item: '#forge:dusts/' + i.name},
						{chance: 0.15, item: 'minecraft:cobblestone'}
					], i.name + '_ore');
				} else {
					eio_sag_mill(event, 2400, '#forge:ores/' + i.name, [
						'#forge:dusts/' + i.name,
						{chance: 0.33, item: '#forge:dusts/' + i.name}
					], i.name + '_ore');
				}
				if (!['lead', 'silver', 'tin', 'lapis', 'quartz', 'uranium', 'gold', 'diamond', 'coal', 'redstone', 'aluminum'].includes(i.name)) {
					if (!['draconium'].includes(i.name)) {
						pulverize(event, '#forge:ores/' + i.name, [
							{ chance: 3.5, item: '#forge:dusts/'+ i.name },
							{ chance: 0.1, item: '#forge:dusts/'+ i.name },
							{ chance: 0.2, item: 'minecraft:gravel' }
						], 0.5, i.name + '_ore')
					} else {
						pulverize(event, '#forge:ores/' + i.name, [
							{ chance: 3.5, item: '#forge:dusts/'+ i.name },
							{ chance: 0.1, item: '#forge:dusts/'+ i.name }
						], 0.5, i.name + '_ore')
					}
				}
				//INGOTS-TO-DUST
				occultism.crushing('#forge:dusts/' + i.name, '#forge:ingots/' + i.name).ignoreCrushingMultiplier(true).id('occultism:crushing/' + i.name + '_dust_from_ingot');
				glyph_crush(event, '#forge:ingots/' + i.name, [{ count: 1, item: '#forge:dusts/' + i.name,	maxItems: 1	}], i.name + '_dust_from_ingot');
				naturesaura.altar('#forge:dusts/' + i.name, '#forge:ingots/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ingot_crushing');
				bm_alchemy_table(event, ['#forge:ingots/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_ingot_'+i.name);
				bm_arc(event, false, false, ['#forge:ingots/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'ingot/dust' + i.name);
				eio_sag_mill(event, 2400, '#forge:ingots/' + i.name, ['#forge:dusts/' + i.name], i.name);
				if (i.has_raw) {
					//RAW-TO-DUST
					occultism.crushing('2x #forge:dusts/' + i.name, '#forge:raw_materials/' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust_from_raw');
					occultism.crushing('18x #forge:dusts/' + i.name, '#forge:storage_blocks/raw_' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust_from_raw_block');
					glyph_crush(event, '#forge:raw_materials/' + i.name, [{ item: '#forge:dusts/' + i.name }, { chance: 0.67, item: '#forge:dusts/' + i.name }], i.name + '_dust_from_raw');
					naturesaura.altar('2x #forge:dusts/' + i.name, '#forge:raw_materials/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/raw_' + i.name + '_crushing');
					bm_alchemy_table(event, ['#forge:raw_materials/'+i.name, '#bloodmagic:arc/cuttingfluid'], '2x #forge:dusts/'+i.name, 200, 200, 1, 'sand_'+i.name+'_from_raw');
					bm_arc(event, [{
						type: '#forge:dusts/' + i.name,
						chance: 0.17,
						mainchance: 0.33
					}], false, ['#forge:raw_materials/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'raw/dust' + i.name);
					eio_sag_mill(event, 2400, '#forge:raw_materials/' + i.name, [
						'#forge:dusts/' + i.name,
						{chance: 0.25, item: '#forge:dusts/' + i.name}
					], i.name + '_raw_materials');
					if (!['gold', 'silver', 'tin', 'lead', 'copper', 'zinc'].includes(i.name)) {
						pulverize(event, '#forge:raw_materials/' + i.name, [
							{ chance: 1.25, item: '#forge:dusts/'+ i.name },
							{ chance: 0.05, item: '#forge:dusts/'+ i.name }
						], 0.5, 'raw_' + i.name)
					}
					multiSqueeze(event, 'squeezer', '#forge:raw_materials/'+i.name, [
						'#forge:dusts/' + i.name,
						{ item: '#forge:dusts/' + i.name, chance: 0.5 }
					], 40, 'raw_' + i.name + '_to_dust');
					multiSqueeze(event, 'mechanical_squeezer', '#forge:raw_materials/'+i.name, [
						'#forge:dusts/' + i.name,
						{ item: '#forge:dusts/' + i.name, chance: 0.2 }
					], 40, 'raw_' + i.name + '_to_dust');
				}
			}
		}
		
		// SQUEEZERS (ORE-TO-RAW)
		if (i.has_raw) {
			if (!['uranium', 'copper', 'cobalt', 'aluminum', 'silver', 'nickel', 'iron', 'gold', 'lead', 'tin', 'zinc'].includes(i.name)) {
				multiSqueeze(event, 'squeezer', '#forge:ores/' + i.name, [
					'3x #forge:raw_materials/' + i.name,
					{ item: '#forge:raw_materials/' + i.name, chance: 0.5 },
					{ item: '#forge:raw_materials/' + i.name, chance: 0.5 }
				], 40, i.name + '_ore_to_raw');
				multiSqueeze(event, 'mechanical_squeezer', '#forge:ores/'+i.name, [
					'2x #forge:raw_materials/' + i.name,
					{ item: '#forge:raw_materials/' + i.name, chance: 0.75 }
				], 40, i.name + '_ore_to_raw');
			}
		}
		
		if (['alloy', 'special_alloy'].includes(i.type) && i.dust_able) {
			//ALLOY_INGOT-TO-DUST
			occultism.crushing('#forge:dusts/' + i.name, '#forge:ingots/' + i.name).ignoreCrushingMultiplier(true).id('occultism:crushing/' + i.name + '_dust_from_ingot');
			glyph_crush(event, '#forge:ingots/' + i.name, [{ count: 1,	item: '#forge:dusts/' + i.name,	maxItems: 1 }], i.name + '_dust_from_ingot');
			naturesaura.altar('#forge:dusts/' + i.name, '#forge:ingots/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ingot_crushing');
			bm_alchemy_table(event, ['#forge:ingots/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_ingot_'+i.name);
			bm_arc(event, false, false, ['#forge:ingots/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'ingot/dust' + i.name);
			eio_sag_mill(event, 2400, '#forge:ingots/' + i.name, ['#forge:dusts/' + i.name], i.name)
			pulverize(event, '#forge:ingots/' + i.name, ['#forge:dusts/' + i.name], 0.0, i.name)
			multiSqueeze(event, 'squeezer', '#forge:ingots/' + i.name, [
				'#forge:dusts/' + i.name
			], 40, i.name + '_ingot_to_dust');
			multiSqueeze(event, 'mechanical_squeezer', '#forge:ingots/' + i.name, [
				'#forge:dusts/' + i.name
			], 40, i.name + '_ingot_to_dust');
		}
		
		if (i.type == 'gem') {
			if (i.dust_able) {
				//GEMS-TO-DUST
				occultism.crushing('#forge:dusts/' + i.name, '#forge:gems/' + i.name).ignoreCrushingMultiplier(true).id('occultism:crushing/' + i.name + '_dust_from_gem');
				if (i.has_ore) occultism.crushing('4x #forge:dusts/' + i.name, '#forge:ores/' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust');
				glyph_crush(event, '#forge:gems/' + i.name, [{	count: 1, item: '#forge:dusts/' + i.name, maxItems: 1 }], i.name + '_to_dust');
				naturesaura.altar('#forge:dusts/' + i.name, '#forge:gems/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_crushing');
				bm_alchemy_table(event, ['#forge:gems/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_gem_'+i.name)
				bm_arc(event, false, false, ['#forge:gems/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'gem/dust' + i.name);
				eio_sag_mill(event, 2400, '#forge:gems/' + i.name, ['#forge:dusts/' + i.name], i.name);
				pulverize(event, '#forge:gems/' + i.name, ['#forge:dusts/' + i.name], 0.0, i.name);
				if (!['dark'].includes(i.name)) {
					multiSqueeze(event, 'squeezer', '#forge:gems/' + i.name, [
						'#forge:dusts/' + i.name
					], 40, i.name + '_to_dust');
					multiSqueeze(event, 'mechanical_squeezer', '#forge:gems/' + i.name, [
						'#forge:dusts/' + i.name
					], 40, i.name + '_to_dust');
				}
			}
			if (i.has_ore) {
				//ORES-TO-GEMS
				glyph_crush(event, '#forge:ores/' + i.name, [{	count: 2, item: '#forge:gems/' + i.name, maxItems: 2 }], i.name + '_to_gem');
				naturesaura.altar('3x #forge:gems/' + i.name, '#forge:ores/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ore_crushing');
				bm_alchemy_table(event, ['#forge:ores/'+i.name, '#bloodmagic:arc/cuttingfluid'], '3x #forge:gems/'+i.name, 200, 200, 1, 'sand_'+i.name);
				bm_arc(event, false, false, ['#forge:ores/' + i.name], 1, 0.0, '3x #forge:gems/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'ore/gem_' + i.name);
				if (!['diamond'].includes(i.name)) {
						eio_sag_mill(event, 2400, '#forge:ores/' + i.name, [
						'2x #forge:gems/' + i.name,
						{chance: 0.25, item: '#forge:gems/' + i.name},
						{chance: 0.15, item: 'minecraft:cobblestone'}
					], i.name + '_ore')
					pulverize(event, '#forge:ores/' + i.name, [
						{ chance: 6.5, item: '#forge:gems/'+ i.name },
						{ chance: 0.2, item: 'minecraft:gravel' }
					], 0.5, i.name + '_ore')
				}
				if (!['diamond', 'quartz', 'dark'].includes(i.name)) {
					multiSqueeze(event, 'squeezer', '#forge:ores/' + i.name, [
						'2x #forge:gems/' + i.name,
						{ item: '#forge:gems/' + i.name, chance: 0.5 }
					], 40, i.name + '_ore_to_' + i.name);
					multiSqueeze(event, 'mechanical_squeezer', '#forge:ores/' + i.name, [
						'#forge:gems/' + i.name,
						{ item: '#forge:gems/' + i.name, chance: 0.75 }
					], 40, i.name + '_ore_to_' + i.name);
				}
			}
		}
		
		if (i.type == 'abundant_gem') {
			if (i.dust_able) {
				//GEMS-TO-DUST
				occultism.crushing('#forge:dusts/' + i.name, '#forge:gems/' + i.name).ignoreCrushingMultiplier(true).id('occultism:crushing/' + i.name + '_dust_from_gem');
				if (i.has_ore) occultism.crushing('4x #forge:dusts/' + i.name, '#forge:ores/' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust');
				glyph_crush(event, '#forge:gems/' + i.name, [{	count: 1, item: '#forge:dusts/' + i.name, maxItems: 1 }], i.name + '_to_dust');
				naturesaura.altar('#forge:dusts/' + i.name, '#forge:gems/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_crushing');
				bm_alchemy_table(event, ['#forge:gems/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_gem_'+i.name);
				bm_arc(event, false, false, ['#forge:gems/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'gem/dust' + i.name);
				eio_sag_mill(event, 2400, '#forge:gems/' + i.name, ['#forge:dusts/' + i.name], i.name);
				pulverize(event, '#forge:gems/' + i.name, ['#forge:dusts/' + i.name], 0.0, i.name);
			}
			if (i.has_ore) {
				//ORES-TO-GEMS
				glyph_crush(event, '#forge:ores/' + i.name, [{	count: 6, item: '#forge:gems/' + i.name, maxItems: 6 }], i.name + '_to_gem');
				naturesaura.altar('8x #forge:gems/' + i.name, '#forge:ores/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ore_crushing');
				bm_alchemy_table(event, ['#forge:ores/'+i.name, '#bloodmagic:arc/cuttingfluid'], '8x #forge:gems/'+i.name, 200, 200, 1, 'sand_'+i.name);
				bm_arc(event, false, false, ['#forge:ores/' + i.name], 1, 0.0, '9x #forge:gems/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'ore/gem' + i.name);
				eio_sag_mill(event, 2400, '#forge:ores/' + i.name, [
					'8x #forge:gems/' + i.name,
					{chance: 0.2, item: '#forge:gems/' + i.name},
					{chance: 0.15, item: 'minecraft:cobblestone'}
				], i.name + '_ore');
				pulverize(event, '#forge:ores/' + i.name, [
					{ chance: 6.5, item: '#forge:gems/'+ i.name }
				], 0.5, i.name + '_ore')
			}
		}
		
		if (i.type == 'coals') {
			if (i.dust_able) {
				//COALS-TO-DUST
				occultism.crushing('#forge:dusts/' + i.name, '#minecraft:coals/' + i.name).ignoreCrushingMultiplier(true).id('occultism:crushing/' + i.name + '_dust_from_coals');
				if (i.has_ore) occultism.crushing('4x #forge:dusts/' + i.name, '#minecraft:coals/' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust');
				glyph_crush(event, '#minecraft:coals/' + i.name, [{ count: 1, item: '#forge:dusts/' + i.name, maxItems: 1 }], i.name + '_to_dust');
				naturesaura.altar('#forge:dusts/' + i.name, '#minecraft:coals/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_crushing');
				bm_alchemy_table(event, ['#minecraft:coals/'+i.name, '#bloodmagic:arc/cuttingfluid'], '1x #forge:dusts/'+i.name, 100, 200, 1, 'sand_coal_'+i.name)
				bm_arc(event, false, false, ['#minecraft:coals/' + i.name], 1, 0.0, '#forge:dusts/' + i.name, false, '#bloodmagic:arc/cuttingfluid', 'coal/dust' + i.name);
				if (!['coal'].includes(i.name)) {
					eio_sag_mill(event, 2400, '#minecraft:coals/' + i.name, ['#forge:dusts/' + i.name], i.name);
				} else {
					eio_sag_mill(event, 2400, '#minecraft:coals/' + i.name, [
						'#forge:dusts/' + i.name,
						{chance: 0.1, item: '#forge:dusts/' + i.name},
						{chance: 0.1, item: '#forge:dusts/sulfur'}
					], i.name);
				}
				pulverize(event, '#minecraft:coals/' + i.name, ['#forge:dusts/' + i.name], 0.0, i.name);
			}
			if (i.has_ore) {
				//ORES-TO-COALS
				glyph_crush(event, '#forge:ores/' + i.name, [{ count: 4, item: '#minecraft:coals/' + i.name, maxItems: 4 }], 'ore_to_' + i.name);
				naturesaura.altar('5x #minecraft:coals/' + i.name, '#forge:ores/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ore_crushing');
				if (!['coal'].includes(i.name)) bm_alchemy_table(event, ['#forge:ores/' + i.name, '#bloodmagic:arc/cuttingfluid'], '4x #minecraft:coals/' + i.name, 200, 200, 1, 'sand_' + i.name);
				bm_arc(event, false, false, ['#forge:ores/' + i.name], 1, 0.0, '6x #minecraft:coals/' + i.name, false, '#bloodmagic:arc/explosive', 'ore/coal' + i.name);
				if (!['coal'].includes(i.name)) {
					eio_sag_mill(event, 2400, '#forge:ores/' + i.name, ['4x #minecraft:coals/' + i.name], i.name + '_ore');
					pulverize(event, '#forge:ores/' + i.name, [
						{ chance: 2.5, item: '#minecraft:coals/'+ i.name },
						{ chance: 0.15, item: '#minecraft:coals/'+ i.name },
						{ chance: 0.2, item: 'minecraft:gravel' }
					], 0.5, i.name + '_ore')
				}
			}
		}
		
		if (i.type == 'dusts') {
			let amount = 3;
			
			//ORES-TO-DUST
			if (['redstone'].includes(i.name)) amount *= 2;
			occultism.crushing('4x #forge:dusts/' + i.name, '#forge:ores/' + i.name).ignoreCrushingMultiplier(false).id('occultism:crushing/' + i.name + '_dust');
			glyph_crush(event, '#forge:ores/' + i.name, [{	count: amount, item: '#forge:dusts/' + i.name, maxItems: amount }], i.name);
			if (!['redstone'].includes(i.name)) {
				eio_sag_mill(event, 2400, '#forge:ores/' + i.name, [
					amount + 'x #forge:dusts/' + i.name,
					{chance: 0.2, item: '#forge:dusts/' + i.name},
					{chance: 0.15, item: 'minecraft:cobblestone'}
				], i.name + '_dust');
				pulverize(event, '#forge:ores/' + i.name, [
					{ chance: 6.5, item: '#forge:dusts/'+ i.name },
					{ chance: 0.25, item: '#forge:dusts/'+ i.name },
					{ chance: 0.2, item: 'minecraft:gravel' }
				], 0.5, i.name + '_ore')
			}
			
			if (['redstone'].includes(i.name)) amount *= 2;
			naturesaura.altar(amount + 'x #forge:dusts/' + i.name, '#forge:ores/' + i.name, 1000, 20, 'naturesaura:crushing_catalyst').id('naturesaura:altar/' + i.name + '_ore_crushing');
			
			if (['redstone'].includes(i.name)) amount += 2;
			bm_alchemy_table(event, ['#forge:ores/'+i.name, '#bloodmagic:arc/explosive'], amount + 'x #forge:dusts/' + i.name, 200, 200, 1, 'sand_'+i.name);
			bm_arc(event, false, false, ['#forge:ores/' + i.name], 1, 0.0, amount + 'x #forge:dusts/' + i.name, false, '#bloodmagic:arc/explosive', 'ore/dust' + i.name);
		}
		
		if (i.gear_able) {
			event.remove(['thermal:press', 'immersiveengineering:metal_press'].map(t => ({type: t , output: '#forge:gears/' + i.name})));
			
			if (!['gem', 'abundant_gem'].includes(i.type)) {
				ie_metal_pressing(event, 2400, '#forge:ingots/' + i.name, 4, 'immersiveengineering:mold_gear', '#forge:gears/' + i.name, 'gear_' + i.name);
				thermal.press('#forge:gears/' + i.name, ['4x #forge:ingots/' + i.name, 'thermal:press_gear_die']).id('thermal:machines/press/press_' + i.name + '_ingot_to_gear');
			} else {
				ie_metal_pressing(event, 2400, '#forge:gems/' + i.name, 4, 'immersiveengineering:mold_gear', '#forge:gears/' + i.name, 'gear_' + i.name);
				thermal.press('#forge:gears/' + i.name, ['4x #forge:gems/' + i.name, 'thermal:press_gear_die']).id('thermal:machines/press/press_' + i.name + '_to_gear');
			}
		}
		
		if (i.plate_able) {
			event.remove(['ad_astra:compressing', 'immersiveengineering:metal_press'].map(t => ({type: t , output: '#forge:plates/' + i.name})));
			
			if (!['gem', 'abundant_gem'].includes(i.type)) {
				aa_compressing(event, 100, 20, '#forge:ingots/'+i.name, {id: '#forge:plates/'+i.name}, i.name+'_plate_from_compressing_'+i.name+'_ingots');
				aa_compressing(event, 800, 20, '#forge:storage_blocks/'+i.name, {id: '#forge:plates/'+i.name, count: 9}, i.name+'_plate_from_compressing_'+i.name+'_blocks');
				ie_metal_pressing(event, 2400, '#forge:ingots/' + i.name, 1, 'immersiveengineering:mold_plate', '#forge:plates/' + i.name, 'plate_' + i.name);
			}
		}
		
		if (i.rod_able) {
			event.remove(['createaddition:rolling', 'immersiveengineering:metal_press', 'thermal:chiller'].map(t => ({type: t , output: '#forge:rods/' + i.name})));
			
			rolling(event, '#forge:ingots/' + i.name, '2x #forge:rods/' + i.name, i.name + '_ingot');
			ie_metal_pressing(event, 2400, '#forge:ingots/' + i.name, 1, 'immersiveengineering:mold_rod', '2x #forge:rods/' + i.name, 'rod_' + i.name);
			//thermal.chiller('#forge:rods/' + i.name, [Fluid.of('#forge:molten_' + i.name, 45), 'thermal:chiller_rod_cast']).xp(0.3).id('thermal:machines/chiller/' + i.name + '_rod');
		}
		
		if (i.wire_able) {
			event.remove(['createaddition:rolling', 'immersiveengineering:metal_press'].map(t => ({type: t , output: '#forge:wires/' + i.name})));
			
			rolling(event, '#forge:plates/' + i.name, '2x #forge:wires/' + i.name, i.name + '_plate');
			ie_metal_pressing(event, 2400, '#forge:ingots/' + i.name, 1, 'immersiveengineering:mold_wire', '2x #forge:wires/' + i.name, 'wire_' + i.name);
		}
	})
})