//priority: 500

// CLASSES
const $Player = Java.loadClass("net.minecraft.world.entity.player.Player");
const $ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer");
const $FakePlayer = Java.loadClass("net.minecraftforge.common.util.FakePlayer");
const $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");
const $TameEvent = Java.loadClass("net.minecraftforge.event.entity.living.AnimalTameEvent");
const $ScaleTypes = Java.loadClass('virtuoel.pehkui.api.ScaleTypes');

// ALL CONSTANTS
const allBowEntities = new RegExp([
    'minecraft:skeleton',
    'variantsandventures:verdant',
    'variantsandventures:murk',
    'goety:mossy_skeleton_servant',
    'goety:skeleton_servant',
    'goety:sunken_skeleton_servant',
    'specialmobs:.*skeleton.*',
    'specialmobs:.*skeleton$',
    'specialmobs:.*zombie$'
].join("|"));

const allSpecialMobs = new RegExp(
	'specialmobs:(?!creeper$|zombie$|drowned$|zombifiedpiglin$|skeleton$|witherskeleton$|slime$|magmacube$|spider$|cavespider$|silverfish$|enderman$|witch$|ghast$|blaze$).*'
);

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

const COLOR_ROGUE = '#f76628';

// ALL FUNCTIONS
function getScaleData(entity, scaleType) {
	if (scaleType == null) {
        scaleType = $ScaleTypes.BASE;
    }
	return scaleType.getScaleData(entity).getScale();
}

function setScaleData(entity, scale, scaleType) {
	if (scaleType == null) {
        scaleType = $ScaleTypes.BASE;
    }
	scaleType.getScaleData(entity).setScale(scale);
}

function randomize(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function toTitleCase(string) {
	return string
		.replace(/[_-]+/g, ' ') 
		.replace(/\b\w/g, c => c.toUpperCase());
}

function roundTo(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

function useItem(player, itemId) {
	if (player.isCreative()) return;
	
	const main = player.getHeldItem('main_hand');
	const off = player.getHeldItem('off_hand');

	if (main.id === itemId) main.count--;
	if (off.id === itemId) off.count--;
}

function addItemCooldown(player, itemId, ticks) {
	player.addItemCooldown(Item.of(itemId), ticks);
}

function isFakePlayer(player) {
    return (!player || !player.isPlayer() || !player.isAlive() || player instanceof $FakePlayer);
}

function simpleQuestComplete(player, id) {
	if (isFakePlayer(player)) return;
	if (!player.data.ftbquests.isCompleted(id)) player.data.ftbquests.addProgress(id, 1)
}

function isTamedBy(entity, player) {
    let hasOwner = entity?.owner === player;
    let hasOwnerUUID = !!entity?.ownerUUID;
	let isTrustedByPlayer = typeof entity?.isPlayerTrusted === "function" 
        ? !!entity.isPlayerTrusted(player.uuid) 
        : false;
    return {
        tamed: hasOwner || hasOwnerUUID || isTrustedByPlayer,
        hasOwner: hasOwner,
        hasOwnerUUID: hasOwnerUUID,
		isTrustedByPlayer: isTrustedByPlayer
    };
}

function isTamed(entity) {
	return (!!entity?.owner || !!entity?.ownerUUID || !!entity?.nbt?.TrustedPlayers);
}

//GLOBAL EXECUTIONS
global.spreadPlayer = entity => {
	
	if (isFakePlayer(entity)) return;	
	let off = entity.offHandItem;
	let main = entity.mainHandItem;
	let nothing = 'kubejs:nothingness';
	
	if (entity.isHoldingInAnyHand(Item.of(nothing))) {
		if (off.id == nothing) off.count--;
		if (main.id == nothing) main.count--;
		if (Utils.server.minecraftServer) Utils.server.tell(`§e${entity.username}§r used Nothingness`);
		entity.setStatusMessage(Text.of(`Finding a right stop...`).yellow());
		entity.addItemCooldown(nothing, 1000);
		Utils.server.runCommandSilent(`playsound minecraft:block.glass.break master ${entity.username} ${entity.x} ${entity.y} ${entity.z} 0.5 0.5`)
		Utils.server.scheduleInTicks(60, () => {
			Utils.server.runCommandSilent(`execute as ${entity.username} run spreadplayers ~ ~ 5000 10000 false ${entity.username}`)
		})
	}
}