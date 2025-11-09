let m_ec = [
	'inject_condensed_blood_chests',
	'inject_origins_of_darkness_chests',
	'inject_box_of_eternal_closure_chests',
	'inject_broom'
];

const ec_box_names = [
	{ playerName: 'kroeserr', pUUID: '068d4de0-3a75-4c6a-9f01-8c37e16a394c' },
	{ playerName: '_EeB_', pUUID: 'e1dc75c6-dcf9-4e0c-8fbf-9c6e5e44527c' },
	{ playerName: 'Davivs69', pUUID: '777e7aa3-9373-4511-8d75-f99d23ebe252' },
	{ playerName: 'Jona', pUUID: '3e13f558-fb72-4949-a842-07879924bc49' },
	{ playerName: 'dodo3231', pUUID: 'b5c31e33-8224-4f96-a4bf-73721be9d2ec' },
	{ playerName: '_KillaH229_', pUUID: 'b2faeaab-fc87-4f91-98d3-836024f268ae' },
	{ playerName: 'iChun', pUUID: '0b7509f0-2458-4160-9ce1-2772b9a45ac2' },
	{ playerName: 'ReeReeQ', pUUID: '8dd44b9b-a1d4-4a73-a8c9-ad186cc988f1' }
];

LootJS.modifiers(event => {
	m_ec.forEach(id => event.removeGlobalModifier(`evilcraft:${id}`));
});

ServerEvents.highPriorityData(event => {
	event.addJson('evilcraft:loot_tables/chests/eternal_closure', {})
})

ServerEvents.chestLootTables(event => {
	event.addChest('evilcraft:eternal_closure', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addEmpty(12 + ec_box_names.length);
			for (let i = 0; i < ec_box_names.length; i++) {
				let b = ec_box_names[i];
				let nbt = `{playerName:\"${b.playerName}\", playerId:\"${b.pUUID}\", spiritTag: { playerName:\"${b.playerName}\",	playerId:\"${b.pUUID}\", remainingLife:0, isSwarm:0b, swarmTier:0, buildupDuration:0, frozenDuration:0}}`;
				pool.addEntry({
					type: 'item',
					weight: 1,
					name: 'evilcraft:box_of_eternal_closure',
					functions: [{
						function: 'set_nbt',
						tag: nbt
					}]
				});
			}
		});
	});
});