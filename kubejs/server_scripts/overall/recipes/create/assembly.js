ServerEvents.recipes(event => {
	
	let tItem_trim = 'toms_storage:ts.trim';
	
	event.recipes.createSequencedAssembly([
	  'toms_storage:ts.storage_terminal',
	], tItem_trim, [
		event.recipes.createDeploying(tItem_trim, [tItem_trim, 'minecraft:comparator']),
		event.recipes.createDeploying(tItem_trim, [tItem_trim, '#forge:chests/wooden']),
		event.recipes.createCutting(tItem_trim, tItem_trim)
	]).transitionalItem(tItem_trim).loops(1).id('create:sequenced_assembly/ts/storage_terminal')
	
	let tItem_sterminal = 'toms_storage:ts.storage_terminal';
	
	event.recipes.createSequencedAssembly([
	  'toms_storage:ts.crafting_terminal',
	], tItem_sterminal, [
		event.recipes.createDeploying(tItem_sterminal, [tItem_sterminal, '#forge:gears/diamond']),
		event.recipes.createDeploying(tItem_sterminal, [tItem_sterminal, 'minecraft:crafting_table']),
		event.recipes.createCutting(tItem_sterminal, tItem_sterminal)
	]).transitionalItem(tItem_sterminal).loops(1).id('create:sequenced_assembly/ts/crafting_terminal')
	
	let tItem_wterminal = 'toms_storage:ts.crafting_terminal';
	
	event.recipes.createSequencedAssembly([
	  'toms_storage:ts.wireless_terminal',
	], tItem_wterminal, [
		event.recipes.createDeploying(tItem_wterminal, [tItem_wterminal, 'minecraft:ender_pearl']),
		event.recipes.createDeploying(tItem_wterminal, [tItem_wterminal, 'minecraft:spyglass']),
	]).transitionalItem(tItem_wterminal).loops(1).id('create:sequenced_assembly/ts/wireless_terminal')
	
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
