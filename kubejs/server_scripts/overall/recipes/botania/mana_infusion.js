ServerEvents.recipes(event => {
	event.recipes.botania.mana_infusion('botania:spark', [
	'thermal:blitz_powder', 
	'thermal:blizz_powder', 
	'thermal:basalz_powder'
	], 1300).id('botania:mana_infusion/spark')
})