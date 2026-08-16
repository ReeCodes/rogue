ColdSweatEvents.registries(event => {
    event.addInsulator(insulator =>
        insulator.items('#thermal:rockwool')
                 .insulation(2, 0)
                 .adaptiveInsulation(1, 0.005)
                 .slot("item")
                 .itemPredicate(itemStack => {
                    return itemStack.getCount() < 10
                 })
                 .entityPredicate(entity => {
                    entity.getHealth() > 10
                 })
                 .fillSlots(true)
                 .hideIfUnmet(false))
				 
	event.addInsulator(insulator =>
        insulator.items('twilightforest:arctic_fur')
                 .insulation(3, 0)
                 .slot("item")
				 .itemPredicate(itemStack => {
                    return itemStack.getCount() < 10
                 })
                 .entityPredicate(entity => {
                    entity.getHealth() > 10
                 })
                 .fillSlots(true)
                 .hideIfUnmet(false))

    event.addInsulator(insulator =>
        insulator.items('immersiveengineering:ersatz_leather')
                 .insulation(0, 2)
                 .slot("item")
				 .itemPredicate(itemStack => {
                    return itemStack.getCount() < 10
                 })
                 .entityPredicate(entity => {
                    entity.getHealth() > 10
                 })
                 .fillSlots(true)
                 .hideIfUnmet(false))
})

ColdSweatEvents.registries(event => {
    event.addIceboxFuel(fuel =>
        fuel.items('powah:dry_ice')
            .fuel(-1000)
            .itemPredicate(itemStack => {
                return itemStack
            }))
})