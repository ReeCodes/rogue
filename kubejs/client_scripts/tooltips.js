function romanize(num) {
	let lookup = {
			XL: 40,
			X: 10,
			IX: 9,
			V: 5,
			IV: 4,
			I: 1
		},
		roman = '',
		i;
	for (i in lookup) {
		while (num >= lookup[i]) {
			roman += i;
			num -= lookup[i];
		}
	}
	return roman;
}

function toTitleCase(string) {
	return string
		.replace(/[_-]+/g, ' ') 
		.replace(/\b\w/g, c => c.toUpperCase());
}

const BASE_COLOR = '#EBCA60';
const COLOR_ROGUE = '#f76628';
const COLOR_TOOLTIP = '#97E072';

let boxesInfo = [
	{ 
		item: 'kubejs:makeshift_box', 
		info: 'Decrepit, Moldy',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:stylish_box', 
		info: 'Designer\'s Choice',
		color: '#EFF283',
		nyt: true
	}, 
	{ 
		item: 'kubejs:glitched_box', 
		info: 'Corrupted Data',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:gear_box', 
		info: 'Inbuild Motor',
		color: '#EFF283',
		nyt: true
	}, 
	{ 
		item: 'kubejs:mischievous_box', 
		info: 'All Sorts of Things',
		color: '#EFF283',
		nyt: true
	}, 
	{ 
		item: 'kubejs:druidic_box', 
		info: 'Disfigured',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:floral_box', 
		info: 'Natural',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:rustic_box', 
		info: 'Aesthetically Pleasing',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:oxidized_box', 
		info: 'Subterranean',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:jewelled_box', 
		info: 'Lavish',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:bloated_box', 
		info: 'Pop',
		color: '#EFF283'
	}];

let extraInfo = [
	{ 
		item: 'cold_sweat:hearth', 
		info: 'Cools and heats the surrounding area', 
		desc: 'Requires a roof to function properly'
	}, 
	{
		item: 'cold_sweat:sewing_table', 
		info: 'Allows for insulation of any piece of armor', 
		desc: 'Gain temperature-resistance based on different materials'
	}, 
	{ 
		item: 'cold_sweat:thermolith', 
		info: 'Outputs a redstone signal based on the temperature of the nearby area', 
		desc: 'Cold: 0, Hot: 15'
	}, 
	{ 
		item: 'cold_sweat:soulspring_lamp', 
		info: 'Reduces local temperature while in the Nether'
	}, 
	{ 
		item: 'alexscaves:beholder', 
		warning: 'Not recommended to use with Shaders enabled!'
	}, 
	{ 
		item: 'enderio:broken_spawner', 
		info: 'Drops with a 15% chance'
	}
];

let shiftIndicator = [Text.of('\uE108\uE154').font("symbols_n_stuff:symbols").white()];

ItemEvents.tooltip(tooltip => {
	
	global.disabledTooltip.forEach(t => {
		tooltip.add(t, [Text.of('Disabled!').color('#fa025d')])
	})
	
	Ingredient.of(['@yoyos']).and(Ingredient.of(['/.*yoyo$/'])).stacks.forEach(i => {
		tooltip.add(i.id, [Text.of('Uses both Ranged Damage and Attack Damage').color(COLOR_TOOLTIP)])
	});
	
	tooltip.addAdvanced('kubejs:nothingness', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oA hole would be something').color(BASE_COLOR)])
			text.add(2, shiftIndicator)
		} else {
			text.add(1, [Text.of('Teleports the user to a random location.').color(COLOR_TOOLTIP)])
		}
	})
	
	tooltip.addAdvanced('kubejs:enlightened_petal', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oExtra XP').color(BASE_COLOR)])
			text.add(2, shiftIndicator)
		} else {
			text.add(1, [Text.of('Free Skill Tree points').color(COLOR_TOOLTIP)])
		}
	})
	
	tooltip.addAdvanced('kubejs:dust_size_down', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oMakes the user shrink').color(BASE_COLOR)])
			text.add(2, shiftIndicator)
		} else {
			text.add(1, [Text.of('Use while sneaking to reset size.').color(COLOR_TOOLTIP)])
		}
	})
	
	tooltip.addAdvanced('kubejs:dust_size_up', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oMakes the user expand').color(BASE_COLOR)])
			text.add(2, shiftIndicator)
		} else {
			text.add(1, [Text.of('Use while sneaking to reset size.').color(COLOR_TOOLTIP)])
		}
	})
	
	tooltip.addAdvanced('kubejs:gluttonous_chest', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oSpews out Food').color(BASE_COLOR)])
			text.add(2, shiftIndicator)
		} else {
			text.add(1, [Text.of('Biome dependent').color(COLOR_TOOLTIP)])
		}
	})
	
	boxesInfo.forEach(a => {
		tooltip.addAdvanced(a.item, (item, advanced, text) => {
			if (!tooltip.isShift()) {
				text.add(1, [Text.of(a.info).color(a.color)])
				text.add(2, shiftIndicator)
			} else {
				text.add(1, [Text.of('Adapts to your overall progress, giving you better outcomes.').color(BASE_COLOR)])
				text.add(2, [Text.of('Grants 12% chance for extra rolls per level of luck, decreasing diminishly.').color(COLOR_TOOLTIP)])
				if (a.item == 'kubejs:glitched_box') {
					text.add(3, [Text.of('<rainb><glitch>Glitched Events: ').append(Text.of('9% ').color(COLOR_ROGUE)).append(Text.of('chance for any of these ').color(BASE_COLOR)).append(Text.of('Rewards').color(COLOR_ROGUE))])
					text.add(4, [Text.of('Spawn a ').color(BASE_COLOR).append(Text.of('Random Gateway').color(COLOR_ROGUE))])
					text.add(5, [Text.of('Increase ').color(BASE_COLOR).append(Text.of('Personal Maximum Coefficient').color(COLOR_ROGUE)).append(Text.of(' by §a+2§f'))])
					text.add(6, [Text.of('Increase ').color(BASE_COLOR).append(Text.of('Personal Extra Coefficient').color(COLOR_ROGUE)).append(Text.of(' by §a+2§f'))])
				}
			}
		})
	})
	
	extraInfo.forEach(a => {
		tooltip.addAdvanced(a.item, (item, advanced, text) => {
			if (a.desc) {
				if (!tooltip.isShift()) {
					text.add(1, [Text.of(a.info).color(BASE_COLOR)])
					text.add(2, shiftIndicator)
				} else {
					text.add(1, [Text.of(a.desc).color(BASE_COLOR).italic()])
				}
			} else {
				if (!a.warning) {
					text.add(1, [Text.of(a.info).color(BASE_COLOR)])
				} else {
					text.add(1, [Text.of(a.warning).color('#FF0000').italic()])
				}
			} 
		})
	})

	global.assistedCrafting.forEach(a => {
		tooltip.addAdvanced(a.output, (item, advanced, text) => {
			let toolName = Utils.snakeCaseToTitleCase(a.tool.substring(a.tool.indexOf(':') + 1))
			if (!tooltip.isShift()) {
				text.add(1, [Text.of('Assisted Crafting Required').color(BASE_COLOR)])
				text.add(2, shiftIndicator)
			} else {
				text.add(1, [Text.of('Requires: ').color('#fcec03').append(Text.of('\uE814').white()).append(Text.of(' holding a ').color('#fcec03')).append(Text.of(`${toolName}`).color('#f1fa93')).append(Text.of(' nearby').color('#fcec03'))])
			}
		})
	})

	for (let i = 0; i < global.armorSets.length; i++) {
		let b = global.armorSets[i];
		['head', 'chestplate', 'leggings', 'boots', 'partial'].forEach((piece) => {
			tooltip.addAdvanced(b[piece], (item, advanced, text) => {
				if (!tooltip.isShift()) {
					if (!b.partial) {
						text.add(1, [Text.of('\uE808')])
					} else {
						text.add(1, [Text.of('\uE809')])
					}
					text.add(2, shiftIndicator)
				} else {
					text.add(1, [Text.of('\uE811')])
					for (let j = 0; j < b.effects.length; j++) {
						let effects = b.effects[j]
						text.add(2 + j, [Text.of(`§e${toTitleCase(effects.effect.split(':')[1].replace(/_/g, ' '))} §6${romanize(effects.amp+1)}`)])
					}
				}
			})
		})
	}
})