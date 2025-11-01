ServerEvents.highPriorityData(event => {
    let weaponAttributer = (weapon_type) => ({
        "parent": `bettercombat:${weapon_type}`
    });

    function applyAtt(item_id, weaponType) {
        let [mod, item] = item_id.split(":");
        event.addJson(`${mod}:weapon_attributes/${item}.json`, weaponAttributer(weaponType));
    }
	
	//MISC
    applyAtt('miniutilities:kikoku', 'katana');
	applyAtt('dungeons_plus:warped_axe', 'heavy_axe');
	applyAtt('evilcraft:mace_of_distortion', 'mace');
	applyAtt('evilcraft:mace_of_destruction', 'mace');
	applyAtt('queen_bee:stinger_sword', 'rapier');
	applyAtt('evilcraft:vein_sword', 'dagger');
	applyAtt('redstone_arsenal:flux_wrench', 'double_axe');
	applyAtt('undergarden:forgotten_battleaxe', 'double_axe');
	applyAtt('biomancy:despoil_sickle', 'sickle');
	applyAtt('gobber2:gobber2_sword_end', 'glaive');
	applyAtt('savage_and_ravage:cleaver_of_beheading', 'sword');
	applyAtt('species:spectralibur', 'claymore');
	
	//TCON
	applyAtt('tconstruct:battlesign', 'anchor');
	applyAtt('tconstruct:melting_pan', 'anchor');
	applyAtt('tconstruct:swasher', 'rapier');
	applyAtt('tconstruct:war_pick', 'crossbow_two_handed_heavy');
	applyAtt('tconstruct:crossbow', 'crossbow_two_handed_light');
	applyAtt('tconstruct:longbow', 'bow_two_handed_heavy');
	applyAtt('tconstruct:scythe', 'scythe');
	applyAtt('tconstruct:broad_axe', 'heavy_axe');
	applyAtt('tconstruct:vein_hammer', 'hammer');
	applyAtt('tconstruct:sledge_hammer', 'hammer');
	applyAtt('tconstruct:sword', 'sword');
	applyAtt('tconstruct:dagger', 'dagger');
	applyAtt('tconstruct:cleaver', 'sword');
	applyAtt('tconstruct:hand_axe', 'axe');
	applyAtt('tconstruct:mattock', 'axe');
	applyAtt('tconstruct:sky_staff', 'staff');
	applyAtt('tconstruct:earth_staff', 'staff');
	applyAtt('tconstruct:ichor_staff', 'staff');
	applyAtt('tconstruct:ender_staff', 'staff');
	
	//YOYOS
	Ingredient.of(['@yoyos']).and(Ingredient.of(['/.*yoyo$/'])).stacks.forEach(i => {
		applyAtt(i.id, 'mace')
	});
	
	//TOOLS COMPLEMENT
	Ingredient.of(['@tools_complement']).and(Ingredient.of(['/.*hammer$/'])).stacks.forEach(i => {
		applyAtt(i.id, 'hammer')
	});
	Ingredient.of(['@tools_complement']).and(Ingredient.of(['/.*sickle$/'])).stacks.forEach(i => {
		applyAtt(i.id, 'sickle')
	});
	Ingredient.of(['@tools_complement']).and(Ingredient.of(['/.*knife$/'])).stacks.forEach(i => {
		applyAtt(i.id, 'dagger')
	});
	Ingredient.of(['@tools_complement']).and(Ingredient.of(['/.*pickaxe$/'])).stacks.forEach(i => {
		applyAtt(i.id, 'pickaxe')
	});
});
