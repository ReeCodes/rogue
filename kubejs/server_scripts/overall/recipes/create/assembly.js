ServerEvents.recipes(event => {
	
	var transItem = 'toms_storage:ts.trim';
	
	event.recipes.createSequencedAssembly([
	  'toms_storage:ts.storage_terminal',
	], transItem, [
		event.recipes.createDeploying(transItem, [transItem, 'minecraft:comparator']),
		event.recipes.createDeploying(transItem, [transItem, '#forge:chests/wooden']),
		event.recipes.createCutting(transItem, transItem)
	]).transitionalItem(transItem).loops(1).id('create:sequenced_assembly/ts/storage_terminal')
	
	transItem = 'toms_storage:ts.storage_terminal';
	
	event.recipes.createSequencedAssembly([
	  'toms_storage:ts.crafting_terminal',
	], transItem, [
		event.recipes.createDeploying(transItem, [transItem, '#forge:gears/diamond']),
		event.recipes.createDeploying(transItem, [transItem, 'minecraft:crafting_table']),
		event.recipes.createCutting(transItem, transItem)
	]).transitionalItem(transItem).loops(1).id('create:sequenced_assembly/ts/crafting_terminal')
	
	transItem = 'toms_storage:ts.crafting_terminal';
	
	event.recipes.createSequencedAssembly([
	  'toms_storage:ts.wireless_terminal',
	], transItem, [
		event.recipes.createDeploying(transItem, [transItem, 'minecraft:ender_pearl']),
		event.recipes.createDeploying(transItem, [transItem, 'minecraft:spyglass']),
	]).transitionalItem(transItem).loops(1).id('create:sequenced_assembly/ts/wireless_terminal')
	
	//FIX PM
	let incompletePM = 'create:incomplete_precision_mechanism';
	
	event.recipes.createSequencedAssembly([
	Item.of('create:precision_mechanism').withChance(1.2),
	Item.of('#forge:plates/gold').withChance(0.08),
	Item.of('create:andesite_alloy').withChance(0.08),
	Item.of('create:cogwheel').withChance(0.05),
	Item.of('#forge:nuggets/gold').withChance(0.03),
	Item.of('create:shaft').withChance(0.02),
	Item.of('create:crushed_raw_gold').withChance(0.02),
	Item.of('#forge:nuggets/iron').withChance(0.08),
	Item.of('minecraft:clock').withChance(0.08),
	], '#forge:plates/gold', [
		event.recipes.createDeploying(incompletePM, [incompletePM, '#forge:gears/gold']),
		event.recipes.createDeploying(incompletePM, [incompletePM, 'create:large_cogwheel']),
		event.recipes.createDeploying(incompletePM, [incompletePM, '#forge:nuggets/iron']),
	]).transitionalItem(incompletePM).loops(5).id('create:sequenced_assembly/precision_mechanism')
})
