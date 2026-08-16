//priority: 800

const $TeamsApi = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI");

const Teams = {
    getManager: () => $TeamsApi.api().getManager(),

    getTeam: (player) => {
        return Teams.getManager().getTeamForPlayer(player).orElse(null);
    },

    getMembers: (player) => {
        let team = Teams.getTeam(player);
        return team ? team.getMembers() : [];
    },

    getData: (player) => {
        let team = Teams.getTeam(player);
        return team ? team.getExtraData() : null;
    }
};

// P-DATA
function removePersistentData(player, key) {
	if (!player) return;
	player.getPersistentData().remove(key);
}

function setPersistentBoolean(player, key, value) {
	if (!player) return;
	player.getPersistentData().putBoolean(key, value);
}

function getPersistentBoolean(player, key, defaultValue) {
	if (!player) return defaultValue;
	return player.getPersistentData().contains(key)
		? player.getPersistentData().getBoolean(key)
		: defaultValue;
}

function setPersistentDouble(player, key, value) {
	if (!player) return;
	player.getPersistentData().putDouble(key, value);
}

function getPersistentDouble(player, key, defaultValue) {
	if (!player) return defaultValue;
	return player.getPersistentData().contains(key)
		? player.getPersistentData().getDouble(key)
		: defaultValue;
}

function getPersistentInt(player, key, defaultValue) {
	if (!player) return defaultValue;
	return player.getPersistentData().contains(key)
		? player.getPersistentData().getInt(key)
		: defaultValue;
}

function setPersistentInt(player, key, value) {
	if (!player) return;
	player.getPersistentData().putInt(key, value);
}

function getPersistentString(player, key, defaultValue) {
	if (!player) return defaultValue;
	return player.getPersistentData().contains(key)
		? player.getPersistentData().getString(key)
		: defaultValue;
}

function setPersistentString(player, key, value) {
	if (!player) return;
	player.getPersistentData().putString(key, value);
}

// COEF MODIFIERS
function getMaxPlayerCoef(player) {
	if (!player) return 0;
	const extraMax = getPersistentDouble(player, 'player_max_coef', 0);
	return Math.min(BASE_MAX_COEF + extraMax, ABSOLUTE_MAX_COEF);
}

function getPlayerCoef(player) {
	if (!player) return 1;
	const base = getPersistentDouble(player, 'coef', 1);
	const extra = getPersistentDouble(player, 'player_extra_coef', 0);
	const maxCoef = getMaxPlayerCoef(player);
	return Math.min(base + extra, maxCoef);
}

function addPlayerExtraCoef(player, amount) {
	const currentExtraCoef = getPersistentDouble(player, 'player_extra_coef', 0);
	const addExtraCoef = Math.min(currentExtraCoef + amount, ABSOLUTE_MAX_EXTRA_COEF);
	
	player.tell([Text.of('[Personal Extra Coefficient] ').color(COLOR_ROGUE)
		.append(Text.of('+' + amount).green())
	]);
	player.tell([Text.of('[Personal Extra Coefficient] ').color(COLOR_ROGUE)
		.append(Text.of('Current: ').white())
		.append(Text.of(addExtraCoef).gold())
		.append(Text.of(' [Max: ').white())
		.append(Text.of(ABSOLUTE_MAX_EXTRA_COEF).gold())
		.append(Text.of(']').white())
	]);
	
	setPersistentDouble(player, 'player_extra_coef', addExtraCoef);
}

function addPlayerMaxCoef(player, amount) {
	const currentMaxCoef = getPersistentDouble(player, 'player_max_coef', 0);
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
	
	setPersistentDouble(player, 'player_max_coef', addMaxCoef);
}

// COOLDOWNS MODIFIERS
function getPlayerAbilityCD(player) {
	return getPersistentDouble(player, 'player_ability_cd', 0);
}

function addPlayerAbilityCD(player, amount) {
	const newCD = Math.min(getPlayerAbilityCD(player) + amount, ABSOLUTE_MAX_ABILITY_CD);
	setPersistentDouble(player, 'player_ability_cd', newCD);
}

function getPlayerPetCD(player) {
	return getPersistentDouble(player, 'player_pet_cd', 0);
}

function addPlayerPetCD(player, amount) {
	const newCD = Math.min(getPlayerPetCD(player) + amount, ABSOLUTE_MAX_PET_CD);
	setPersistentDouble(player, 'player_pet_cd', newCD);
}

const PET_SYNC_COOLDOWN = player => PET_SYNC_ABSOLUTE_CD - (PET_SYNC_ABSOLUTE_CD * getPlayerPetCD(player));