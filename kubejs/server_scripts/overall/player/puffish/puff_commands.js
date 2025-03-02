
ServerEvents.commandRegistry(event => {
	const {	commands: Commands,	arguments: Arguments } = event;

	//BRAWLER
	let node_miscreant = 'gk5n2eok8ttgepew';
	let node_beskar = '36vmvsf98t4u6iaz';
	let brawler_unlocks = [node_miscreant, node_beskar];
	
	//BRAWLER
	event.register(
		Commands.literal("pf_skills_unlock_tank")
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			var player = ctx.source.getEntity().getName().getString();
			for (let u of brawler_unlocks) {
				Utils.server.runCommandSilent(`puffish_skills skills unlock ${player} puffish_skills:brawler ${u}`);
			}
			return 1;
		})
	)

	event.register(
		Commands.literal("pf_skills_unlock_rogue")
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			var player = ctx.source.getEntity().getName().getString();
			for (let u of brawler_unlocks) {
				Utils.server.runCommandSilent(`puffish_skills skills unlock ${player} puffish_skills:brawler ${u}`);
			}
			return 1;
		})
	)

	event.register(
		Commands.literal("pf_skills_unlock_paladin")
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			var player = ctx.source.getEntity().getName().getString();
			for (let u of brawler_unlocks) {
				Utils.server.runCommandSilent(`puffish_skills skills unlock ${player} puffish_skills:brawler ${u}`);
			}
			return 1;
		})
	)

	event.register(
		Commands.literal("pf_skills_unlock_sickle")
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			var player = ctx.source.getEntity().getName().getString();
			for (let u of brawler_unlocks) {
				Utils.server.runCommandSilent(`puffish_skills skills unlock ${player} puffish_skills:brawler ${u}`);
			}
			return 1;
		})
	)

	event.register(
		Commands.literal("pf_skills_unlock_ranger")
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			var player = ctx.source.getEntity().getName().getString();
			for (let u of brawler_unlocks) {
				Utils.server.runCommandSilent(`puffish_skills skills unlock ${player} puffish_skills:brawler ${u}`);
			}
			return 1;
		})
	)

	// ABILITIES
	function getNextAvailableSlot(puffAbilities) {
		for (let i = 0; i < puffAbilities.length; i++) {
			if (!puffAbilities[i].ability) {
				return i;
			}
		}
		puffAbilities.push({});
		return puffAbilities.length - 1;
	}

	function registerAbility(abilityName, hasLevels) {
		hasLevels = hasLevels || false;
		event.register(
			Commands.literal('pa_' + abilityName)
			.requires(src => src.hasPermission(2))
			.executes((ctx) => {
				let player = ctx.source.getEntity();
				if (!player?.persistentData?.puff_abilities) {
					player.persistentData.puff_abilities = [];
				}

				let existingAbility = player.persistentData.puff_abilities.find(
					ability => ability.ability === abilityName
				);

				if (existingAbility) {
					if (hasLevels && existingAbility.level !== undefined) {
						existingAbility.level += 1;
					}
				} else {
					let slot = getNextAvailableSlot(player.persistentData.puff_abilities);
					let abilityData = {
						ability: abilityName,
						on_cooldown: 0
					};
					if (hasLevels) {
						abilityData.level = 1;
					}
					player.persistentData.puff_abilities[slot] = abilityData;
				}
				Utils.server.runCommandSilent(`playsound create:confirm master ${player.username} ${player.x} ${player.y} ${player.z} 0.3`)
				player.tell(Text.of('You acquired a new ability!').color('#00FF00'));
				return 1;
			})
		);
	}

	//RESET
	event.register(
		Commands.literal('puff_reset')
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			let player = ctx.source.player;
			let skillTrees = [
				'puffish_skills:brawler',
				'puffish_skills:sorcery',
				'puffish_skills:adventure'
			];

			for (let c of skillTrees) {
				Utils.server.runCommandSilent(`puffish_skills skills reset ${player.username} ${c}`)
			}
			if (player?.persistentData?.puff_abilities) {
				player.persistentData.puff_abilities = [{}];
			}
			Utils.server.runCommandSilent(`playsound malum:void_transmutation master ${player.username} ${player.x} ${player.y} ${player.z} 1`)
			player.tell(Text.of('Skill trees have been reset!').color('#FF0000'));
			player.tell(Text.of('All points have been refunded.').color('#00FF00'));
			return 1;
		})
	);

	//BRAWLER
	registerAbility("rejuvenating_strike");
	registerAbility("volley_of_arrows");
	registerAbility("robust_stance");
	registerAbility("aerial_assault");
	registerAbility("silence_the_voice", true);
	registerAbility("spellbound_missile");
	registerAbility("magic_barrage", true);
	registerAbility("nimble");
	
	//EXPLORER
	registerAbility("thirst_quencher", true);
	registerAbility("graceful", true);
})