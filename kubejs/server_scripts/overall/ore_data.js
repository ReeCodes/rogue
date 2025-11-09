// priority: 150

const oreData = [
	// BASE
    {
        name: 'copper',
        dust_able: true,
        plate_able: true,
		wire_able: true,
		rod_able: true,
		gear_able: true,
		has_gravel: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'iron',
        dust_able: true,
        plate_able: true,
		wire_able: true,
		rod_able: true,
		gear_able: true,
		has_gravel: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'gold',
        dust_able: true,
        plate_able: true,
		wire_able: true,
		rod_able: true,
		gear_able: true,
		has_gravel: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'lead',
        dust_able: true,
        plate_able: true,
		wire_able: true,
		gear_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'silver',
        dust_able: true,
        plate_able: true,
		gear_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'aluminum',
        dust_able: true,
        plate_able: true,
		wire_able: true,
		rod_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'nickel',
        dust_able: true,
        plate_able: true,
		gear_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
	{
        name: 'tin',
        dust_able: true,
        plate_able: true,
		gear_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'zinc',
        dust_able: false,
        plate_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
    {
        name: 'uranium',
        dust_able: true,
        plate_able: true,
		has_raw: true,
		has_crushed_raw: true,
		has_node: true,
		has_ore: true
    },
	{
        name: 'cobalt',
        dust_able: true,
		has_raw: true,
		has_node: true,
		has_ore: true
    },
	{
        name: 'draconium',
        dust_able: true,
		has_ore: true
    },
	{
        name: 'hellforged',
        dust_able: true,
		has_gravel: true,
		no_nugget: true
    },
	{
        name: 'desh',
        dust_able: false,
        plate_able: true,
		has_raw: true,
		has_ore: true
    },
    {
        name: 'ostrum',
        dust_able: false,
        plate_able: true,
		has_raw: true,
		has_ore: true
    },
    {
        name: 'calorite',
        dust_able: false,
        plate_able: true,
		has_raw: true,
		has_ore: true
    },
	// ALLOYS
	{
		type: 'special_alloy',
        name: 'dawnstone',
        plate_able: true
    },
	{
		type: 'special_alloy',
        name: 'draconium_awakened',
        dust_able: true
    },
	{
		type: 'special_alloy',
        name: 'compressed_iron',
        gear_able: true,
		no_nugget: true
    },
	{
		type: 'alloy',
        name: 'brass',
		rod_able: true,
		plate_able: true
    },
    {
		type: 'alloy',
        name: 'electrum',
		wire_able: true,
		rod_able: true,
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'constantan',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'steel',
		wire_able: true,
		rod_able: true,
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'bronze',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'invar',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'rose_gold',
        dust_able: false
    },
    {
		type: 'alloy',
        name: 'netherite',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'prismalium',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'melodium',
        dust_able: true,
        plate_able: true,
		gear_able: true,
    },
    {
		type: 'alloy',
        name: 'stellarium',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'enderium',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'lumium',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
    {
		type: 'alloy',
        name: 'signalum',
        dust_able: true,
        plate_able: true,
		gear_able: true
    },
	{
		type: 'alloy',
        name: 'flux_infused',
        dust_able: true,
		gear_able: true
    },
	//GEMS-COALS
	{
        name: 'netherite_scrap',
        dust_able: true,
		has_gravel: true,
		has_ore: true
    },
    {
		type: 'abundant_gem',
        name: 'lapis',
        dust_able: true,
		gear_able: true,
		has_ore: true
    },
	{
		type: 'abundant_gem',
        name: 'apatite',
        dust_able: true,
		has_ore: true
    },
	{
		type: 'abundant_gem',
        name: 'sal_ammoniac',
		has_ore: true
    },
	{
		type: 'abundant_gem',
        name: 'niter',
        dust_able: true,
		has_ore: true
    },
    {
		type: 'abundant_gem',
        name: 'sulfur',
        dust_able: true,
		has_ore: true
    },
	{
		type: 'coals',
        name: 'coal',
        dust_able: true,
		has_ore: true
    },
	{
		type: 'coals',
        name: 'coal_coke',
        dust_able: true
    },
	{
		type: 'gem',
        name: 'uranium_crystal',
		has_ore: true
    },
	{
		type: 'gem',
        name: 'uraninite',
		has_ore: true
    },
	{
		type: 'gem',
        name: 'certus_quartz',
		dust_able: true,
		has_ore: false
    },
	{
		type: 'gem',
        name: 'fluix',
		dust_able: true,
		has_ore: false
    },
	{
		type: 'gem',
        name: 'quartz',
        dust_able: true,
		gear_able: true,
		has_ore: true
    },
	{
		type: 'gem',
        name: 'dark',
        dust_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'emerald',
        dust_able: true,
		gear_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'diamond',
        dust_able: true,
		gear_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'arcane_crystal',
        dust_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'cinnabar',
        dust_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'ruby',
        dust_able: true,
		gear_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'sapphire',
        dust_able: true,
		gear_able: true,
		has_ore: true
    },
    {
		type: 'gem',
        name: 'jade',
        dust_able: false,
		has_ore: true
    },
    {
		type: 'dusts',
        name: 'redstone',
        dust_able: true,
		has_ore: true
    },
    {
		type: 'dusts',
        name: 'ender',
        dust_able: true,
		has_ore: true
    }
];