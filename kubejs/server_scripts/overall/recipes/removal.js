// priority: 100

ServerEvents.recipes(event => {
	
	const removeOutput = items => items.forEach(i => event.remove({ output: i }))
	const removeInput = items => items.forEach(i => event.remove({ input: i }))
	const removeById = ids => ids.forEach(id => event.remove({ id: id }))
	const removeByMod = mods => mods.forEach(m => event.remove({ mod: m }))

	// DISABLED-UNIFY
	global.oreTagsRemove.forEach(o => {
		removeOutput([o])
		if (Item.of(o).isBlock()) {
			event.remove({ input: o, id: '/ae2:facade.+/' })
		}
	});

	removeOutput(global.assistedCrafting.map(r => r.output));

	removeById([
		
		'caverns_and_chasms:netherite_ingot_from_nuggets',
		'caverns_and_chasms:copper_ingot_from_nuggets',
		//BREAD
		'quark:tweaks/crafting/utility/bent/bread',
		'minecraft:bread',
		
		//CREATE
		'create:crafting/materials/copper_ingot',
		'createaddition:compat/immersiveengineering/crushing/coke_block',
		'create:crushing/compat/immersiveengineering/coke_block',
		'/createaddition:pressing.+/',
		
		//OCC
		'/occultism:(smelting|blasting)/(copper|gold)_.+/',
		
		//IE
		'/immersiveengineering:smelting/(copper|iron|gold)_.+/',
		'immersiveengineering:crafting/nugget_copper_to_copper_ingot',
		'/immersiveengineering:crafting/nugget_.+_to_ingot_.+/',
		'/immersiveengineering:crafting/stick_.+/',
		'/immersiveengineering:crafting/plate_.+/',
		'immersiveengineering:smelting/slag_glass',
		
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
		'/bloodmagic:arc/dustsfrom_.+(?!netherite).+/',
		
		//MINI-U
		'miniutilities:angel_ring_crafting',
		'miniutilities:ender_dust_to_ender_pearl',
		'miniutilities:unstable_ingot',
		
		//EIO
		'enderio:sag_milling/soularium',
		'enderio:wood_gear_corner',
		'enderio:enchanting/soulbound',
		'/enderio:smelting/eidolon/smelt_.*(dust|ore|raw).*/',
		'/enderio:smelting/.*(slag|rockwool).*/',
		'/enderio:smelting/.*(ingot|steel_recycle).*/',
		'/enderio:(iron|gold|copper)_ingot_from_(smelting|blasting)/',
		'/enderio:smelting/embers/(silver|lead)_.*_smelting/',
		'enderio:smelting/caupona/smelting/lead_nugget',
		'enderio:smelting/bloodmagic/smelting/saltpeter',
		'enderio:smelting/miniutilities/smelting/ender_ore',
		'enderio:alloy_smelting/ender_pearl',
		
		//PC
		'pneumaticcraft:copper_ingot_from_nugget',
		'pneumaticcraft:block_heat_properties/immersiveengineering/uranium',
		
		//MISC
		'redstone_arsenal:storage/flux_nugget_from_ingot',
		'tconstruct:common/materials/copper_ingot_from_nuggets',
		'tconstruct:common/materials/netherite_ingot_from_nuggets',
		'malum:copper_ingot_from_nugget',
		'thermal:storage/copper_ingot_from_nuggets',
		'bhc:god_apple',
		'/functionalstorage:oak_drawer_alternate_x.+/',
		'shieldexp:griefer_shield',
		'forbidden_arcanus:deorum_ingot',
		'productivebees:quartz_dust_to_quartz',
		'/embers:.+_nugget_to_ingot/',
		'/gateways:.+/',
		'ars_nouveau:apprentice_spell_book_upgrade',
		'ars_nouveau:archmage_spell_book_upgrade',
		'ars_instrumentum:archmage_spell_book_upgrade_alternate',
		'ae2:inscriber/ender_dust'
	]);

	// === MOD REMOVAL ===
	removeByMod(['itemfilters']);

	// === GLOBAL REMOVALS ===
	removeOutput(global.disabledItems);
	removeOutput(global.clearedItems);
	removeOutput(global.disabledTooltip);
})