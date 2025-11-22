ServerEvents.tags('entity_type', event => {

	//BLACKLISTED PICKUP MOBS
	blacklistedPickup.forEach(mob => {
		event.add('industrialforegoing:mob_duplicator_blacklist', mob)
		event.add('industrialforegoing:mob_imprisonment_tool_blacklist', mob)
		event.add('forbidden_arcanus:quantum_catcher_blacklisted', mob)
	})
})