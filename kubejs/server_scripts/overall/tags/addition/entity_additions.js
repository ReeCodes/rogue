// priority: 100

ServerEvents.tags('entity_type', event => {
	
	//BLACKLISTED PICKUP MOBS
	[
	'minecraft:wither',
	'minecraft:ender_dragon',
	'minecraft:evoker',
	'irons_spellbooks:citadel_keeper',
	'irons_spellbooks:necromancer'
	].forEach(mob => {
		event.add('industrialforegoing:mob_duplicator_blacklist', mob)
		event.add('industrialforegoing:mob_imprisonment_tool_blacklist', mob)
		event.add('forbidden_arcanus:quantum_catcher_blacklisted', mob)
	})
})