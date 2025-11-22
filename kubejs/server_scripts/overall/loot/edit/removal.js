//priority: 100

LootJS.modifiers((event) => {
	/*
	const removeInjects = [
		{
			prefix: "botania:inject/",
			injects: [
				"abandoned_mineshaft",
				"desert_pyramid",
				"jungle_temple",
				"simple_dungeon",
				"spawn_bonus_chest",
				"stronghold_corridor",
				"village_chest"
			]
		}
	];

	
	for (let group of removeInjects) {
		let prefix = group.prefix;
		let ids = group.injects;

		for (let id of ids) {
			event.addLootTableModifier(prefix + id).removeLoot(Ingredient.all);
			//console.log(prefix + id);
		}
	}
	*/
	// SINGLE
	event.addLootTableModifier('minecraft:entities/pillager').removeLoot('galosphere:silver_nugget');
	event.addLootTableModifier(/fossil:chests.*/).removeLoot([/fossil:(wooden|stone|iron|gold)_javelin/]);
	
	// BY MOD
	event.addLootTableModifier(/.*/).removeLoot(['@galosphere', '@caverns_and_chasms', '@cardiac', '@cluttered']);
});