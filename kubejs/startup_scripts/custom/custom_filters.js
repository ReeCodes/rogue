const $ItemFiltersAPI = Java.loadClass('dev.latvian.mods.itemfilters.api.ItemFiltersAPI');

let filters = {
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
  'am_is_wheel': item => !!item.nbt?.wheel
};

for (let [name, filter] of Object.entries(filters)) {
  $ItemFiltersAPI.registerCustomFilter(name, filter);
}