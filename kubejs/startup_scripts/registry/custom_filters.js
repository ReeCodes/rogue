const $ItemFiltersAPI = Java.loadClass('dev.latvian.mods.itemfilters.api.ItemFiltersAPI');
const $ToolItem = Java.loadClass('net.minecraft.world.item.TieredItem');
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem');

const itemFilters = {
	'no_nbt': item => !item.hasNBT(),
	'only_damage': item => !item.nbt?.AttributeModifiers,
	'brew_key': item => !!item.nbt?.brewKey,
	'ec_jewel': item => !!item.nbt?.elementalcraft?.jewel,
	'apothic_sockets': item => !!item.nbt?.gem,
	'aw_gem': item => !!item.nbt?.CustomPotionEffects,
	'aw_crown': item => !!(item.nbt?.gem?.tag?.CustomPotionEffects && item.nbt?.gem?.tag?.CustomPotionEffects[0]["forge:id"]),
	'aw_moonsnares': item => !(item.nbt?.ForgeCaps && item.nbt.ForgeCaps["embers:ember"]),
	'bound_treat': item => !!item.nbt?.CaveBiome,
	'coating': item => !!item.nbt?.anointment_holder?.anointments,
	'has_recipe': item => !!item.nbt?.recipe,
	'is_plotted': item => !!item.nbt?.plot_id,
	'has_lex_item': item => !!item.nbt?.lexicon_item?.id,
	'am_is_frame': item => !!item.nbt?.frame,
	'am_is_engine': item => !!item.nbt?.engine,
	'am_is_wheel': item => !!item.nbt?.wheel,
	'has_biomancy_despoil': item => !!(Array.isArray(item?.nbt?.Enchantments) && item.nbt?.Enchantments?.some(enchant => enchant.id === "biomancy:despoil")),
	'has_biomancy_s_precision': item => !!(Array.isArray(item?.nbt?.Enchantments) && item.nbt?.Enchantments?.some(enchant => enchant.id === "biomancy:surgical_precision")),
	'biomancy_player_essence': item => !!(item.nbt?.essence_data?.entity_type === "minecraft:player"),
	'biomancy_mob_essence': item => !!(item.nbt?.essence_data?.entity_type && item.nbt?.essence_data?.entity_type !== "minecraft:player"),
	'ss_tier_pickaxe': item => !!(item.nbt?.mana >= 2147483646),
	'high_tier_anointed': item => !!(Array.isArray(item?.nbt?.anointment_holder?.anointments) && item.nbt?.anointment_holder?.anointments?.some(d => d.max_damage >= 4096)),
	'living_armor_upgraded': item => !!(item.nbt?.livingStats?.maxPoints >= 300),
	'bread_tower': item => !!(item.nbt?.BlockEntityTag?.Sandwich?.length >= 32),
	'transmogged': item => !!(!!item.nbt && !!item.nbt['transmog:transmogItem']),
	'identified_artifact': item => !!(Array.isArray(item?.nbt?.StoredEnchantments) && item.nbt?.StoredEnchantments.some(e => (/.*betterarcheology.*/.test(e.id)))),
	'augmented_item': item => !!(/.*name:"embers(?!:core).*"/).test(item.nbt),
	'has_heat': item => !!(item.nbt && item.nbt['embers:heat_tag']?.heat >= 0),
	'finish_heat': item => !!(item.nbt && item.nbt['embers:heat_tag']?.heat >= 500),
	'is_waste': item => !!(/.+embers:alchemical_waste.+/.test(item.nbt)),
	'is_armor': item => !!(item.item instanceof $ArmorItem),
	'is_tool': item => !!(item.item instanceof $ToolItem),
	'has_potion': item => !!item.nbt?.Potion,
	'is_enchanted': item => !!(Array.isArray(item?.nbt?.Enchantments))
};

for (let [name, filter] of Object.entries(itemFilters)) {
	$ItemFiltersAPI.registerCustomFilter(name, filter);
}