ServerEvents.chestLootTables(event => {
	event.addChest('rogue:loot/stews', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('forbidden_arcanus:bat_soup', 1)
			pool.addItem('minecraft:suspicious_stew', 4).addFunction(func_set_stew([{
					type: 'minecraft:jump_boost',
					minD: 7.0,
					maxD: 10.0
				},
				{
					type: 'minecraft:night_vision',
					minD: 7.0,
					maxD: 10.0
				},
				{
					type: 'minecraft:blindness',
					minD: 5.0,
					maxD: 7.0
				},
				{
					type: 'minecraft:poison',
					minD: 8.0,
					maxD: 20.0
				},
				{
					type: 'minecraft:weakness',
					minD: 6.0,
					maxD: 8.0
				},
				{
					type: 'immersiveengineering:sticky',
					minD: 6.0,
					maxD: 8.0
				},
				{
					type: 'irons_spellbooks:rend',
					minD: 6.0,
					maxD: 12.0
				},
				{
					type: 'attributeslib:grievous',
					minD: 4.0,
					maxD: 12.0
				},
				{
					type: 'attributeslib:sundering',
					minD: 4.0,
					maxD: 20.0
				},
				{
					type: 'twilightdelight:temporal_sadness',
					minD: 6.0,
					maxD: 20.0
				},
				{
					type: 'tetra:steeled',
					minD: 12.0,
					maxD: 24.0
				},
				{
					type: 'tetra:small_strength',
					minD: 12.0,
					maxD: 24.0
				},
				{
					type: 'tetra:unwavering',
					minD: 12.0,
					maxD: 24.0
				},
				{
					type: 'tetra:small_health',
					minD: 12.0,
					maxD: 24.0
				},
				{
					type: 'tetra:small_absorb',
					minD: 12.0,
					maxD: 24.0
				},
				{
					type: 'eidolon:reinforced',
					minD: 12.0,
					maxD: 24.0
				}
			]))
		})
	})
})