LootJS.modifiers(event => {
	
	const replaceLoot = [
		['create:golden_sheet', '#forge:plates/gold'],
		['create:iron_sheet', '#forge:plates/iron'],

		['bloodmagic:sulfur', '#forge:dusts/sulfur'],
		['bloodmagic:coalsand', '#forge:dusts/coal'],
		['bloodmagic:ironsand', '#forge:dusts/iron'],
		['bloodmagic:goldsand', '#forge:dusts/gold'],

		['create:copper_nugget', '#forge:nuggets/copper'],
		['immersiveengineering:nugget_nickel', '#forge:nuggets/nickel'],
		['immersiveengineering:nugget_lead', '#forge:nuggets/lead'],
		['immersiveengineering:nugget_silver', '#forge:nuggets/silver'],
		
		['iceandfire:copper_nugget', '#forge:nuggets/copper'],
		['iceandfire:silver_nugget', '#forge:nuggets/silver'],
		['iceandfire:silver_ingot', '#forge:ingots/silver'],
		['iceandfire:silver_ore', 'embers:silver_ore'],
		['iceandfire:silver_block', '#forge:storage_blocks/silver'],
		['iceandfire:sapphire_gem', '#forge:gems/sapphire'],
		['iceandfire:sapphire_block', '#forge:storage_blocks/sapphire']
	];
	
	for (let i = 0; i < replaceLoot.length; i++) {
		let from = replaceLoot[i][0];
		let to = replaceLoot[i][1];
		event.addLootTableModifier(/.*/).replaceLoot(from, to, true);
	}
});
