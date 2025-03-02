let titleCase = (s) => {
	let a = s.split(" ");
	a.forEach((word, index) => {
		a[index] = word.charAt(0).toUpperCase() + word.slice(1);
	})
	return a.join(" ");
}

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

let boxesInfo = [
	{ 
		item: 'kubejs:makeshift_box', 
		info: 'Decrepit, Old, Moldy',
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
		info: 'All Sorts Of Things',
		color: '#EFF283',
		nyt: true
	}, 
	{ 
		item: 'kubejs:druidic_box', 
		info: 'Disfigured By Corruption',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:floral_box', 
		info: 'Scent Of Nature',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:rustic_box', 
		info: 'Aesthetically Pleasing',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:oxidized_box', 
		info: 'Subterranean Goods',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:jewelled_box', 
		info: 'Lavish Antiquities',
		color: '#EFF283'
	}, 
	{ 
		item: 'kubejs:bloated_box', 
		info: 'Not Enough Space',
		color: '#EFF283'
	}]

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
		warning: 'Not recommended to use with Shaders enabled'
	}
	]

ItemEvents.tooltip(tooltip => {
	
	global.disabledTooltip.forEach(t => {
		tooltip.add(t, [Text.of('Disabled!').color('#fa025d')])
	})
	
	tooltip.addAdvanced('kubejs:nothingness', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oA hole would be something').color('#c4a9fc')])
			text.add(2, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Teleports the user to a random location.').yellow()])
		}
	})
	
	tooltip.addAdvanced('kubejs:enlightened_petal', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oSkipping the hassle...').color('#c4a9fc')])
			text.add(2, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Grants +100XP to a random Skill Tree').yellow()])
		}
	})
	
	tooltip.addAdvanced('kubejs:purifying_rune', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oFull Reset').color('#c4a9fc')])
			text.add(2, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Resets and refunds all of your skill trees').yellow()])
			text.add(2, [Text.of('Also resets your abilities').yellow()])
		}
	})

	tooltip.addAdvanced('kubejs:torn_pocket', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oA hole in your pocket').color('#c4a9fc')])
			text.add(2, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Grants you +1 additional Pocket Slot.').yellow()])
			text.add(2, [Text.of('§oVersion: 1.0').gray()])
		}
	})
	
	tooltip.addAdvanced('kubejs:dust_size_down', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oMakes the user shrink').color('#c4a9fc')])
			text.add(2, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Use while sneaking to reset size.').yellow()])
		}
	})
	
	tooltip.addAdvanced('kubejs:dust_size_up', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('§oMakes the user expand').color('#c4a9fc')])
			text.add(2, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Use while sneaking to reset size.').yellow()])
		}
	})
	
	tooltip.addAdvanced('kubejs:gluttonous_chest', (item, advanced, text) => {
		if (!tooltip.isShift()) {
			text.add(1, [Text.of('\uE810 Shift').gray()])
		} else {
			text.add(1, [Text.of('Spews out food.').yellow()])
			text.add(2, [Text.of('The food is dependent on the user\s location.').yellow()])
		}
	})
	
	boxesInfo.forEach(a => {
		tooltip.addAdvanced(a.item, (item, advanced, text) => {
			if (!tooltip.isShift()) {
				text.add(1, [Text.of(a.info).color(a.color)])
				text.add(2, [Text.of('\uE810 Shift').gray()])
				//if (a.nyt) text.add(3, [Text.of('In need of a new texture.').color('#916106')])
			} else {
				text.add(1, [Text.of('Adapts to your overall progress, giving you better outcomes.').color('#EBCA60')])
				text.add(2, [Text.of('Grants 12% chance for extra rolls per level of luck, decreasing diminishly.').color('#97E072')])
				if (a.item == 'kubejs:glitched_box') text.add(3, [Text.of('<rainb>Glitched:<rainb>').append(Text.of(' Small chance to spawn a random Gateway').color('#EBCA60'))])
			}
		})
	})
	
	extraInfo.forEach(a => {
		tooltip.addAdvanced(a.item, (item, advanced, text) => {
			if (a.desc) {
				if (!tooltip.isShift()) {
					text.add(1, [Text.of(a.info).color('#737373')])
					text.add(2, [Text.of('\uE810 Shift').gray()])
				} else {
					text.add(1, [Text.of(a.desc).color('#737373').italic()])
				}
			} else {
				if (!a.warning) {
					text.add(1, [Text.of(a.info).color('#737373')])
				} else {
					text.add(1, [Text.of(a.warning).color('#FF0000').italic()])
				}
			} 
		})
	})

	global.assistedCrafting.forEach(a => {
		tooltip.addAdvanced(a.name, (item, advanced, text) => {
			let toolName = Utils.snakeCaseToTitleCase(a.tool.substring(a.tool.indexOf(':') + 1))
			if (!tooltip.isShift()) {
				text.add(1, [Text.of('Assisted Crafting Required').color('#e0e0e0')])
				text.add(2, [Text.of('\uE810 Shift')])
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
					text.add(2, [Text.of('\uE810 Shift')])
				} else {
					text.add(1, [Text.of('\uE811')])
					for (let j = 0; j < b.effects.length; j++) {
						let effects = b.effects[j]
						text.add(2 + j, [Text.of(`§e${titleCase(effects.effect.split(':')[1].replace(/_/g, ' '))} §6${romanize(effects.amp+1)}`)])
					}
				}
			})
		})
	}
})