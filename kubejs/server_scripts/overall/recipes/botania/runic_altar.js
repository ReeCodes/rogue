ServerEvents.recipes(event => {
	event.recipes.botania.runic_altar('botania:spark', [
	'#forge:dusts/mana', 
	'#botania:petals', 
	'#forge:dusts/arcane_crystal', 
	'occultism:otherworld_ashes'
	], 1300).id('botania:runic_altar/spark')
})