ServerEvents.recipes(event => {

	const salvaging = (input, results, id) => {
		event.recipes.apotheosis.salvaging({
			conditions: [{
				type: "apotheosis:module",
				module: "adventure"
			}],
			input: { item: input },
			outputs: results.map(i => ({
				min_count: i.min,
				max_count: i.max,
				stack: {
					item: Item.of(i.item).id
				}
			}))
		}).id('apotheosis:salvaging/' + id)
	}

	//ACCESSORY BOOSTERS
	Ingredient.of([
	'majruszsaccessories:owl_feather',
	'majruszsaccessories:dice',
	'majruszsaccessories:onyx',
	'majruszsaccessories:horseshoe',
	'majruszsaccessories:jadeite'
	]).subtract(Ingredient.of([
		'majruszsaccessories:golden_dice',
		'majruszsaccessories:golden_horseshoe'
	])).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 1,
			max: 3,
			item: 'apotheosis:common_material'
		}], a.id.split(':')[1])
	})
	
	Ingredient.of(['majruszsaccessories:golden_dice', 'majruszsaccessories:golden_horseshoe']).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 3,
			max: 5,
			item: 'apotheosis:uncommon_material'
		}], a.id.split(':')[1])
	})
	
	Ingredient.of(['eidolon:basic_amulet', 'eidolon:basic_ring', 'eidolon:basic_belt']).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 1,
			max: 3,
			item: 'apotheosis:common_material'
		}], a.id.split(':')[1])
	})
	
	//ACCESSORIES
	Ingredient.of(['@majruszsaccessories']).and(Ingredient.of([
		'#curios:pocket_right', '#curios:pocket_left'
	])).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 2,
			max: 4,
			item: 'apotheosis:uncommon_material'
		}], a.id.split(':')[1])
	})
	
	//ARTIFACTS
	Ingredient.of(['@artifacts']).subtract(Ingredient.of([
		'artifacts:mimic_spawn_egg',
		'artifacts:everlasting_beef',
		'artifacts:eternal_steak'
	])).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 2,
			max: 5,
			item: 'apotheosis:uncommon_material'
		}], a.id.split(':')[1])
	})
	
	//RELICS
	Ingredient.of(['@relics']).subtract(Ingredient.of([
		'relics:researching_table',
		'relics:relic_experience_bottle',
		'relics:solid_snowball'
	])).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 1,
			max: 3,
			item: 'apotheosis:rare_material'
		}], a.id.split(':')[1])
	})
	
	Ingredient.of(['@raccompat', '@ramcompat']).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 2,
			max: 5,
			item: 'apotheosis:epic_material'
		}], a.id.split(':')[1])
	})
	
	//ANCIENT CLOCK
	salvaging('fossil:ancient_clock', [{
		min: 1,
		max: 3,
		item: 'apotheotic_additions:heirloom_material'
	}], 'ancient_clock')
	
	//CARDS
	Ingredient.of(['#tarotcards:tarot_cards']).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 1,
			max: 5,
			item: 'apotheosis:rare_material'
		}], a.id.split(':')[1])
	})
	
	//MUSIC-DISCS
	Ingredient.of(['#minecraft:music_discs']).subtract(Ingredient.of([
		'supplementaries:pancake'
	])).stacks.forEach(a => {
		salvaging(a.id, [{
			min: 1,
			max: 2,
			item: 'apotheosis:common_material'
		}], a.id.split(':')[1])
	})
})