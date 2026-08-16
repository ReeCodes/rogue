ServerEvents.commandRegistry(event => {
	const { commands: Commands, arguments: Arguments } = event;
	
	const ABILITY_TREES = {
		'puffish_skills:brawler': brawlerAbilityHandlers,
		'puffish_skills:adventure': explorerAbilityHandlers
	};

	function getSlot(abilities) {
		for (let i = 0; i < abilities.length; i++) {
			if (!abilities[i]?.ability) {
				return i;
			}
		}

		abilities.push({});
		return abilities.length - 1;
	}
	
	function abilityExistsInHandlers(abilityName, handlers) {
		for (let category in handlers) {
			if (handlers[category] && handlers[category][abilityName]) {
				return true;
			}
		}
		return false;
	}

	function removeAbilitiesFromHandlers(player, handlers) {
		let data = getEntityData(player);

		if (!data?.puff_abilities) return;

		data.puff_abilities = data.puff_abilities.filter(
			ability => !abilityExistsInHandlers(ability?.ability, handlers)
		);
	}
	
	function clearAbilities(player, tree) {
		const treeArray = Array.isArray(tree) ? tree : [tree];

		for (let treeId of treeArray) {
			Utils.server.runCommandSilent(
				`puffish_skills skills reset ${player.username} ${treeId}`
			);

			let handlers = ABILITY_TREES[treeId];

			if (handlers) {
				removeAbilitiesFromHandlers(player, handlers);
			}

			if (treeId === 'puffish_skills:brawler') {
				removePersistentData(player, 'player_ability_cd');
				removePersistentData(player, 'player_pet_cd');
			}
		}

		playSound(
			player.level,
			'create:deny',
			player.username,
			player.x,
			player.y,
			player.z,
			1.0
		);
	}

	function registerAbility(type, abilityName, cfg) {
		let hasLevels = cfg.hasLevels ?? true;

		event.register(
			Commands.literal('pa_' + abilityName)
				.requires(src => src.hasPermission(2))
				.executes(ctx => {

					let player = ctx.source.getEntity();
					if (isFakePlayer(player)) return 0;

					let persistentData = getEntityData(player);
					if (!persistentData) return 0;

					if (!persistentData.puff_abilities) {
						persistentData.puff_abilities = [];
					}

					let abilities = persistentData.puff_abilities;

					let abilityData = abilities.find(
						ability => ability?.ability === abilityName
					);

					if (abilityData) {

						if (hasLevels) {
							abilityData.level = (abilityData.level ?? 0) + 1;
						}

					} else {

						abilityData = {
							ability: abilityName,
							type: type,
							on_cooldown: 0
						};

						if (hasLevels) {
							abilityData.level = 1;
						}

						abilities[getSlot(abilities)] = abilityData;
					}

					let displayName =
						Utils.snakeCaseToTitleCase(abilityName);

					let levelText = hasLevels
						? ` (Lv. ${abilityData.level})`
						: '';

					player.tell([
						Text.of(`\uEBD4`)
							.white()
							.font("symbols_n_stuff:symbols")
							.append(
								Text.of(`\uE802`)
									.white()
									.font("minecraft:default")
							)
							.append(
								Text.of(` ${displayName}${levelText}`)
									.color(COLOR_ROGUE)
							)
					]);

					Utils.server.runCommandSilent(
						`playsound embers:item.heated.level_up master ${player.username} ${player.x} ${player.y} ${player.z} 0.3`
					);

					return 1;
				})
		);
	}
	
	// ADD PLAYER CD COMMANDS
	event.register(
		Commands.literal('player_cd')
		.requires(src => src.hasPermission(2))
		.then(
			Commands.argument('type', Arguments.STRING.create(event))
			.then(
				Commands.argument('amount', Arguments.FLOAT.create(event))
				.executes(ctx => {
					let player = ctx.source.player;
					let type = Arguments.STRING.getResult(ctx, 'type').toLowerCase();
					let amount = Arguments.FLOAT.getResult(ctx, 'amount');

					if (!player) return 0;

					const increase = roundTo(amount, 2);
					const perIncrease = Math.round(increase * 100);

					let newCD;

					if (type === 'ability') {
						addPlayerAbilityCD(player, increase);
						newCD = Math.round(getPlayerAbilityCD(player) * 100);
						player.tell([
							Text.of(`§eAbility Cooldown decreased: §a-${perIncrease}%§f (Now: §6${newCD}%§f)`)
						]);
					} else if (type === 'pet') {
						addPlayerPetCD(player, increase);
						newCD = Math.round(getPlayerPetCD(player) * 100);
						player.tell([
							Text.of(`§ePet Sync Cooldown decreased: §a-${perIncrease}%§f (Now: §6${newCD}%§f)`)
						]);
					} else {
						player.tell([Text.of(`Invalid Type: ${type}. Use "ability" or "pet".`).red()]);
						return 0;
					}

					return 1;
				})
			)
		)
	);

	// RESET COMMAND
	event.register(
		Commands.literal('puffish_reset')
		.requires(src => src.hasPermission(2))
		.executes((ctx) => {
			let player = ctx.source.player;
			if (!player) return 0;
			
			clearAbilities(player, SKILL_TREES);
			
			player.setStatusMessage([
				Text.of("\uE901").white().font("symbols_n_stuff:symbols")
					.append(Text.of(" Skill Trees and abilities have been reset. Points have been refunded!").color('#fc5044'))
			]);
			return 1;
		})
		.then(Commands.argument("skill_tree", Arguments.STRING.create(event))
			.executes((ctx) => {
				let tree = Arguments.STRING.getResult(ctx, "skill_tree");
				let player = ctx.source.player;
				let isTree = SKILL_TREES.find(s => s.endsWith(`:${tree}`));
				let treeName = Utils.snakeCaseToTitleCase(tree);
				
				if (!isTree) {
					player.setStatusMessage([Text.of(`Unknown Skill Tree: `).red().append(Text.of(`${treeName}`).color(COLOR_ROGUE))]);
					return 0;
				}
				clearAbilities(player, isTree);
				player.setStatusMessage([
					Text.of("\uE901").white().font("symbols_n_stuff:symbols")
						.append(Text.of(` Skill Tree [${treeName}] has been reset!`).color('#fc5044'))
				]);
				return 1;
			})
		)
	);

	// AUTO-REGISTER
	for (let [type, handlers] of Object.entries(ABILITY_TREES)) {

		for (let category in handlers) {

			for (let abilityName in handlers[category]) {

				let cfg = handlers[category][abilityName];

				registerAbility(
					type,
					abilityName,
					cfg
				);
			}
		}
	}
	
});