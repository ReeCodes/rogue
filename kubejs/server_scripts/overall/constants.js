//priority: 999

// CLASSES
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier");
const $Player = Java.loadClass("net.minecraft.world.entity.player.Player");
const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer");
const $FakePlayer = Java.loadClass("net.minecraftforge.common.util.FakePlayer");
const $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");
const $ScaleTypes = Java.loadClass("virtuoel.pehkui.api.ScaleTypes");
const $EquipmentSlot = Java.loadClass("net.minecraft.world.entity.EquipmentSlot");
const $PotionUtils = Java.loadClass("net.minecraft.world.item.alchemy.PotionUtils");
const $Potions = Java.loadClass("net.minecraft.world.item.alchemy.Potions");
const $MobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance");

// DONT CHANGE THESE
// ALL CONSTANTS

const VALID_SERVER_MODES = ['HARD', 'BALANCED', 'MAYHEM'];

global.SERVER_MODE = VALID_SERVER_MODES.includes(SET_SERVER_MODE)
    ? SET_SERVER_MODE
    : 'BALANCED';
	
const IS_HARD_OR_MAYHEM = global.SERVER_MODE === 'HARD' || global.SERVER_MODE === 'MAYHEM';

// RANGES

const maxPlayerSearchRange = 128;
const assistedCraftingRange = 6;

// COEF

const COEF_CHECK_INTERVAL = 600;
const COEF_TOLERANCE = global.SERVER_MODE === 'MAYHEM' ? 1.5 : 1.33;
const COEF_DIVISOR = global.SERVER_MODE === 'MAYHEM' ? 7 : 9;

const BASE_MAX_COEF = global.SERVER_MODE === 'MAYHEM' ? 80 : 20;
const ABSOLUTE_MAX_COEF = global.SERVER_MODE === 'MAYHEM' ? 100 : 50;
const ABSOLUTE_MAX_EXTRA_COEF = 20;

// MOBS

const MIN_SPECIAL_ARROW_CHANCE = IS_HARD_OR_MAYHEM ? 0.05 : 0.02;
const MAX_SPECIAL_ARROW_CHANCE = IS_HARD_OR_MAYHEM ? 0.8 : 0.63;

const BOSS_MIN_HEALTH = 200;
const TOTAL_MOB_MAX_HEALTH = 20000;

const MAX_EXTRA_SPEED = global.SERVER_MODE === 'MAYHEM' ? 0.104 : 0.085;

const NON_HOSTILE_DEBUFF = global.SERVER_MODE === 'MAYHEM' ? 0.5 : 0.67;

// PETS

const ABSOLUTE_MAX_ABILITY_CD = 0.95;
const ABSOLUTE_MAX_PET_CD = 0.95;

const PET_HEAL_PERCENTAGE = IS_HARD_OR_MAYHEM ? 0.15 : 0.25;
const PET_SYNC_ABSOLUTE_CD = 80;

// MISC

const COLOR_ROGUE = '#f76628';

const allBowEntities = entityRegex([
    'minecraft:skeleton',
    'variantsandventures:verdant',
    'variantsandventures:murk',
    'goety:mossy_skeleton_servant',
    'goety:skeleton_servant',
    'goety:sunken_skeleton_servant',
    'specialmobs:.*skeleton.*',
    'specialmobs:.*skeleton$',
    'specialmobs:.*zombie$'
]);

const allSpecialMobs = new RegExp(
	'specialmobs:(?!creeper$|zombie$|drowned$|zombifiedpiglin$|skeleton$|witherskeleton$|slime$|magmacube$|spider$|cavespider$|silverfish$|enderman$|witch$|ghast$|blaze$).*'
);

const blacklistedPickup = [
	'minecraft:wither',
	'minecraft:ender_dragon',
	'minecraft:evoker',
	'irons_spellbooks:citadel_keeper',
	'irons_spellbooks:necromancer'
];

const allGateways = [
	'gateways:basic/blaze', 
	'gateways:basic/enderman',
	'gateways:basic/slime',
	'gateways:hellish_fortress',
	'gateways:overworldian_nights',
	'apotheotic_additions:aether_gate',
	'apotheotic_additions:caves_gate',
	'apotheotic_additions:dark_garden',
	'apotheotic_additions:time_lost_gate'
];

const emptyJSON = {
	"type": "empty"
};

const replaceJSON = {
	"replace": true,
	"type": "empty"
};

const SKILL_TREES = [
	'puffish_skills:brawler',
	'puffish_skills:sorcery',
	'puffish_skills:adventure'
];