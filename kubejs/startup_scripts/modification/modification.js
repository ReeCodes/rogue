ItemEvents.modification(event => {
	
    let colors = [`white`, `light_gray`, `gray`, `black`, `red`, `orange`, `yellow`, `lime`, `green`, `light_blue`, `cyan`, `blue`, `purple`, `magenta`, `pink`, `brown`];

    function modifyStack(listOfItems, countPerStack) {
        listOfItems.forEach(item => {
            event.modify(item, item => item.maxStackSize = countPerStack)
        })
    }

    modifyStack([
        '/industrialforegoing:.*addon.*/',
        'minecraft:saddle',
        'minecraft:ender_pearl',
        'minecraft:egg',
        'minecraft:honey_bottle',
        'minecraft:snowball',
        'minecraft:armor_stand',
        'minecraft:bucket',
        'minecraft:cake',
        '/minecraft:.+horse_armor/',
		'/minecraft:suspicious_stew/',
		'deeperdarker:heart_of_the_deep'
    ], 64)
	
    modifyStack([
        'forbidden_arcanus:quantum_catcher',
        'aquaculture:worm',
        'immersiveengineering:graphite_electrode'
    ], 1)

    colors.forEach(color => {
        event.modify(`minecraft:${color}_banner`, item => item.maxStackSize = 64)
    })
})

  