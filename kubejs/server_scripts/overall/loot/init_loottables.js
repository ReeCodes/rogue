//priority: 200

let rogue_lt = [
	'rarities',
	'curios',
	'arrows',
	'food',
	'blocks',
	'upgrades',
	'fishes',
	'gems',
	'metals',
	'potions',
	'stews',
	'rails',
	'seeds',
	'crops',
	'gears'
	];

ServerEvents.highPriorityData(event => {
	for (let i of rogue_lt) {
		event.addJson('rogue:loot_tables/chests/loot/'+i+'.json', {})
	}
	for (let i of global.createBox) {
		let boxName = i.name.toLowerCase();
		event.addJson('rogue:loot_tables/suprise_boxes/'+boxName+'.json', {})
	}
})