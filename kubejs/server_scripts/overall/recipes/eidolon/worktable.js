ServerEvents.recipes(event => {
	let eid_worktable = (patternInput, reagants, ingredients, result, id) => {
		var key = {};
		for (let k in ingredients) {
			key[k] = {
				item: ingredients[k].item || undefined,
				tag: ingredients[k].tag || undefined
			};
		}
		event.recipes.eidolon.worktable({
			pattern: patternInput,
			reagents: reagants,
			key: ingredients,
			result: Ingredient.of(result).toJson()
		}).id('eidolon:worktable/' + id)
	}

	eid_worktable(
		[
			' a ',
			'bcb',
			'db '
		],
		"feee", {
			a: {
				tag: 'forge:ingots/gold'
			},
			b: {
				tag: 'forge:ingots/dawnstone'
			},
			c: {
				item: 'eidolon:basic_amulet'
			},
			d: {
				item: 'eidolon:crimson_gem'
			},
			e: {
				tag: 'forge:dusts/corrupti'
			},
			f: {
				item: 'eidolon:unholy_symbol'
			}
		}, 'enigmaticlegacy:enigmatic_amulet',
		'enigmatic_amulet'
	)

	eid_worktable(
		[
			'aba',
			'bcb',
			' b '
		],
		"defe", {
			a: {
				tag: 'forge:nuggets/pewter'
			},
			b: {
				tag: 'forge:ingots/pewter'
			},
			c: {
				item: 'eidolon:crimson_gem'
			},
			d: {
				item: 'eidolon:unholy_symbol'
			},
			e: {
				tag: 'forge:dusts/corrupti'
			},
			f: {
				item: 'eidolon:pewter_inlay'
			}
		}, 'enigmaticlegacy:cursed_ring',
		'cursed_ring'
	)
	
	eid_worktable(
		[
			' a ',
			'bcb',
			' b '
		],
		"defe", {
			a: {
				item: 'minecraft:blaze_rod'
			},
			b: {
				tag: 'forge:gems/diamond'
			},
			c: {
				item: 'ars_nouveau:novice_spell_book'
			},
			d: {
				item: 'irons_spellbooks:divine_pearl'
			},
			e: {
				item: 'irons_spellbooks:magic_cloth'
			},
			f: {
				item: 'botania:manaweave_cloth'
			}
		}, 'ars_nouveau:apprentice_spell_book',
		'apprentice_spell_book'
	)
})