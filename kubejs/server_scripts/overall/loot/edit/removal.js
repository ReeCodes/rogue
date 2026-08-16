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
	
	// I&F
	event.addLootTableModifier(/iceandfire:chest.*/).removeLoot([/iceandfire:armor_(silver|copper)_metal_(helmet|chestplate|leggings|boots)/]);
	event.addLootTableModifier(/iceandfire:chest.*/).removeLoot([/iceandfire:(silver|copper)_(sword|pickaxe$|axe$|shovel|hoe)/]);
	event.addLootTableModifier('iceandfire:entities/stymphalian_bird').removeLoot('iceandfire:copper_nugget');
	
	// FOSSIL
	event.addLootTableModifier(/fossil:chests.*/).removeLoot([/fossil:(wooden|stone|iron|gold)_javelin/]);
	
	// BY MOD
	event.addLootTableModifier(/.*/).removeLoot(['@galosphere', '@cardiac', '@cluttered']);
});