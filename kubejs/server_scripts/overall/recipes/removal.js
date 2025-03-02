// priority: 100

ServerEvents.recipes(event => {
	
//DISABLED-UNIFY
	global.oreTagsRemove.forEach(o => {
			event.remove({output: o})
		if (Item.of(o).isBlock()) {
			event.remove({input: o, id: '/ae2:facade.+/'})
		}
	})
	
	global.partDuplicates.forEach(p => {
		event.remove({output: p})
	})
	
	global.assistedCrafting.forEach(r => {
		event.remove({output: r.name})
	})
	
//ID-REMOVAL
	let removeById = [
	//C-DECO
	'createdeco:pressing/coins/netherite_coin',
	//BREAD
	'quark:tweaks/crafting/utility/bent/bread',
	'minecraft:bread',
	//OCC
	'/occultism:(smelting|blasting)/(copper|gold)_.+/',
	//IE
	'/immersiveengineering:smelting/(copper|iron|gold)_.+/',
	'immersiveengineering:crafting/nugget_copper_to_copper_ingot',
	'/immersiveengineering:crafting/nugget_.+_to_ingot_.+/',
	'/immersiveengineering:crafting/stick_.+/',
	'/immersiveengineering:crafting/plate_.+/',
	//THERMAL
	'redstone_arsenal:materials/flux_gem',
	'thermal:storage/coal_coke_block',
	'/thermal:rubber_from_(vine|dandelion)/',
	'thermal:gunpowder_4',
	'/thermal:smelting/(gold|copper|iron)_ingot_from_dust.+/',
	'/thermal:smelting/.+_ingot_from_raw.+/',
	'/thermal:storage/.+_nugget_from_ingot/',
	'/thermal:machines/press/unpacking/press_.+_nugget_unpacking/',
	//AD-ASTRA
	'ad_astra:steel_rod',
	'/ad_astra:alloying.+/',
	'/ad_astra:compressing.+/',
	//BM
	'/bloodmagic:arc/dustsfrom_.+(?!netherite|hellforged).+/',
	//MINI-U
	'miniutilities:angel_ring_crafting',
	'miniutilities:ender_dust_to_ender_pearl',
	'miniutilities:unstable_ingot',
	//EIO
	'enderio:wood_gear_corner',
	'enderio:enchanting/soulbound',
	'/enderio:.+_ingot_from.+/',
	//MISC
	'createdeco:netherite_ingot',
	'createdeco:netherite_nugget_from_netherite_ingot',
	'bhc:god_apple',
	'/createaddition:pressing.+/',
	'/functionalstorage:oak_drawer_alternate_x.+/',
	'shieldexp:griefer_shield',
	'pneumaticcraft:copper_ingot_from_nugget',
	'create:crafting/materials/copper_ingot',
	'forbidden_arcanus:deorum_ingot',
	'productivebees:quartz_dust_to_quartz',
	'/embers:.+_nugget_to_ingot/',
	'/gateways:.+/',
	'ars_nouveau:apprentice_spell_book_upgrade',
	'ars_nouveau:archmage_spell_book_upgrade',
	'ars_instrumentum:archmage_spell_book_upgrade_alternate'
	];
	
	removeById.forEach(id => {
		event.remove({id: id})
	})
	
//MOD-REMOVAL
	event.remove({mod: 'itemfilters'})
	
//DISABLED-REMOVAL
	global.disabledItems.forEach(i => {
		event.remove({output: i})
	})
	
//CLEARED-REMOVAL
	global.clearedItems.forEach(i => {
		event.remove({output: i})
	})
	
//DISABLED-REMOVAL-TOOLTIP
	global.disabledTooltip.forEach(i => {
		event.remove({output: i})
	})
})