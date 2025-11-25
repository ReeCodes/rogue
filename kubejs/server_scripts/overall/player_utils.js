//priority: 600

const $TeamsApi = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");

const COEF_TOLERANCE = 1.33;
const COEF_DIVISOR = 9;

const BASE_MAX_COEF = 20;

const ABSOLUTE_MAX_EXTRA_COEF = 20;
const ABSOLUTE_MAX_COEF = 50;

const ABSOLUTE_MAX_ABILITY_CD = 0.95;
const ABSOLUTE_MAX_PET_CD = 0.95;

const NON_HOSTILE_DEBUFF = 0.67;
const PET_SYNC_ABSOLUTE_CD = 80;

// TEAMS
const Teams = {
    getManager: () => {
        return $TeamsApi.api().getManager();
    },
    getTeam: (player) => {
        return Teams.getManager().getTeamForPlayer(player).get();
    },
    getData: (player) => {
        return Teams.getTeam(player).getExtraData();
    }
};

// COEF MODIFIERS
function getMaxPlayerCoef(player) {
	if (!player) return 0;
	const extraMax = player.persistentData?.player_max_coef ?? 0;
	return Math.min(BASE_MAX_COEF + extraMax, ABSOLUTE_MAX_COEF);
};

function getPlayerCoef(player) {
	if (!player) return 1;
    const base = player.persistentData?.coef ?? 1;
    const extra = player.persistentData?.player_extra_coef ?? 0;
    return Math.min(base + extra, getMaxPlayerCoef(player));
}

function addPlayerExtraCoef(player, amount) {
	if (!player.persistentData) player.persistentData = {};
    const currentExtraCoef = player.persistentData.player_extra_coef ?? 0;
	const addExtraCoef = Math.min(currentExtraCoef + amount, ABSOLUTE_MAX_EXTRA_COEF);
	player.tell([Text.of('[Personal Extra Coefficient] ').color(COLOR_ROGUE)
		.append(Text.of('+' + amount).green())
	]);
	player.tell([Text.of('[Personal Extra Coefficient] ').color(COLOR_ROGUE)
		.append(Text.of('Current: ').white())
		.append(Text.of(addExtraCoef).gold())
		.append(Text.of(' [Max: ').white())
		.append(Text.of(+ ABSOLUTE_MAX_EXTRA_COEF).gold())
		.append(Text.of(']').white())
	]);
    player.persistentData.player_extra_coef = addExtraCoef;
}

function addPlayerMaxCoef(player, amount) {
	if (!player.persistentData) player.persistentData = {};
	const currentMaxCoef = player.persistentData.player_max_coef ?? 0;
	const addMaxCoef = Math.min(currentMaxCoef + amount, (ABSOLUTE_MAX_COEF - BASE_MAX_COEF));
	const actualMaxCoef = BASE_MAX_COEF + addMaxCoef;
	player.tell([Text.of('[Personal Max Coefficient] ').color(COLOR_ROGUE)
		.append(Text.of('+' + amount).green())
	]);
	player.tell([Text.of('[Personal Max Coefficient] ').color(COLOR_ROGUE)
		.append(Text.of('Current: ').white())
		.append(Text.of(actualMaxCoef).gold())
		.append(Text.of(' [Max: ').white())
		.append(Text.of(ABSOLUTE_MAX_COEF).gold())
		.append(Text.of(']').white())
	]);
	player.persistentData.player_max_coef = addMaxCoef;
}

// COOLDOWNS MODIFIERS
function getPlayerAbilityCD(player) {
	return player.persistentData && player.persistentData.player_ability_cd ? player.persistentData.player_ability_cd : 0;
}

function addPlayerAbilityCD(player, amount) {
	if (!player.persistentData) player.persistentData = {};
	player.persistentData.player_ability_cd = Math.min(getPlayerAbilityCD(player) + amount, ABSOLUTE_MAX_ABILITY_CD);
}

function getPlayerPetCD(player) {
	return player.persistentData && player.persistentData.player_pet_cd ? player.persistentData.player_pet_cd : 0;
}

function addPlayerPetCD(player, amount) {
	if (!player.persistentData) player.persistentData = {};
	player.persistentData.player_pet_cd = Math.min(getPlayerPetCD(player) + amount, ABSOLUTE_MAX_PET_CD);
}

const PET_SYNC_COOLDOWN = player => PET_SYNC_ABSOLUTE_CD - (PET_SYNC_ABSOLUTE_CD * getPlayerPetCD(player));