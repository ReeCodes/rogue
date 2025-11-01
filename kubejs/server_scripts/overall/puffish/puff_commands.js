ServerEvents.commandRegistry(event => {
	const { commands: Commands, arguments: Arguments } = event;

	function getSlot(puffAbilities) {
		for (let i = 0; i < puffAbilities.length; i++) {
			if (!puffAbilities[i].ability) {
				return i;
			}
		}
		puffAbilities.push({});
		return puffAbilities.length - 1;
	}
	
	function clearAbilities(player, tree) {
		let treeArray = Array.isArray(tree) ? tree : [tree];
		
		for (let s of treeArray) {
			Utils.server.runCommandSilent(`puffish_skills skills reset ${player.username} ${s}`);
		}
		
		// REMOVE ABILTIES
		if (player?.persistentData) {
			if (treeArray.includes('puffish_skills:brawler')) {
				player.persistentData.remove('puff_abilities');
				player.persistentData.remove('player_ability_cd');
				player.persistentData.remove('player_pet_cd');
			}
			if (treeArray.includes('puffish_skills:adventure')) {
				player.persistentData.remove('puff_abilities');
			}
		}
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
						a => a.ability === abilityName
					);

					if (existingAbility) {
						if (hasLevels && existingAbility.level !== undefined) {
							existingAbility.level += 1;
						}
					} else {
						let slot = getSlot(player.persistentData.puff_abilities);
						let abilityData = {
							ability: abilityName,
							on_cooldown: 0
						};
						if (hasLevels) {
							abilityData.level = 1;
						}
						player.persistentData.puff_abilities[slot] = abilityData;
						existingAbility = abilityData;
					}

					if (hasLevels) {
						player.tell([
							Text.of(`\uEBD4`).white().font("symbols_n_stuff:symbols")
								.append(Text.of(`\uE802`).white().font("minecraft:default"))
								.append(Text.of(` ${Utils.snakeCaseToTitleCase(abilityName)} (Lv. ${existingAbility.level})`).gold())
						]);
					} else {
						player.tell([
							Text.of(`\uEBD4`).white().font("symbols_n_stuff:symbols")
								.append(Text.of(`\uE802`).white().font("minecraft:default"))
								.append(Text.of(` ${Utils.snakeCaseToTitleCase(abilityName)}`).gold())
						]);
					}

					Utils.server.runCommandSilent(`playsound create:confirm master ${player.username} ${player.x} ${player.y} ${player.z} 0.3`);
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
					const player = ctx.source.player;
					const type = Arguments.STRING.getResult(ctx, 'type').toLowerCase();
					const amount = Arguments.FLOAT.getResult(ctx, 'amount');

					if (!player) return 0;
					
					let increase = roundTo(amount, 2);
					let perIncrease = Math.round(increase * 100);
					if (type === 'ability') {
						addPlayerAbilityCD(player, increase);
						player.tell([
							Text.of(`§eAbility Cooldown decreased by §a-${perIncrease}%§f (Now: §6${getPlayerAbilityCD(player).toFixed(2)}§f)`)
						]);
					} else if (type === 'pet') {
						addPlayerPetCD(player, increase);
						player.tell([
							Text.of(`§ePet Sync Cooldown decreased by §a-${perIncrease}%§f (Now: §6${getPlayerPetCD(player).toFixed(2)}§f)`)
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
					.append(Text.of(" Skill Trees and abilities have been reset. All points have been refunded.").red())
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
						.append(Text.of(` Skill Tree [${treeName}] has been reset!`).color('#55FF55'))
				]);
				return 1;
			})
		)
	);

	// AUTO-REGISTER
	for (let category in handlers) {
		for (let abilityName in handlers[category]) {
			let cfg = handlers[category][abilityName];
			registerAbility(abilityName, cfg.hasLevels !== false);
		}
	}
});