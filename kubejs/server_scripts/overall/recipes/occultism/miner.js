ServerEvents.recipes(event => {
	
	let occ_miner = (dataLocation, result, weight, id) => {
	  event.recipes.occultism.miner({
		ingredient: { tag: dataLocation },
		result: Item.of(result).toJson(),
		weight: weight
	  }).id('occultism:miner/' + id)
	}
	
	//SILVER-FIX
	occ_miner('occultism:miners/deeps', 'embers:deepslate_silver_ore', 381, 'deeps/deepslate_silver_ore')
	//LEAD-FIX
	occ_miner('occultism:miners/deeps', 'embers:deepslate_lead_ore', 500, 'deeps/deepslate_lead_ore')
})