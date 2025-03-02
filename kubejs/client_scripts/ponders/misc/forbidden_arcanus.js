Ponder.registry(event => {	
	event.create(['forbidden_arcanus:arcane_crystal_dust_speck', 'forbidden_arcanus:arcane_crystal_obelisk'])
		.scene("obelisk", "Arcane Crystal Obilisk Farm", "kubejs:arcane_crystal_obelisk_scene",
			(scene, util) => {
				scene.world.showSection([0, 0, 0, 4, 0, 4], Direction.up);
				scene.idle(10);
				scene.world.showSection([2, 1, 2], Direction.down);
				scene.idle(5);
				scene.text(50, "First, place an Arcane Polished Darkstone Block.", [2, 1.5, 2.5])
					.placeNearTarget()
					.attachKeyFrame();
				scene.idle(55);
				scene.world.showSection([2, 2, 2, 2, 3, 2], Direction.down);
				scene.idle(5);
				scene.text(65, "Then, place two Arcane Crystal Blocks above it.", [2, 3, 2.5])
					.placeNearTarget();
				scene.idle(70);
				scene.text(65, "Lastly, right-click to assemble the multiblock.", [2.0, 2.5, 2.5])
					.attachKeyFrame();
				scene.idle(70);
				scene.showControls(30, [2.5, 3, 1], "right")
					.rightClick()
					.withItem("forbidden_arcanus:mundabitur_dust");
				scene.idle(20);
				scene.world.modifyBlock([2, 1, 2], () => Block.id("forbidden_arcanus:arcane_crystal_obelisk").with("part", "lower"), true);
				scene.world.modifyBlock([2, 2, 2], () => Block.id("forbidden_arcanus:arcane_crystal_obelisk").with("part", "middle"), true);
				scene.world.modifyBlock([2, 3, 2], () => Block.id("forbidden_arcanus:arcane_crystal_obelisk").with("part", "upper"), true);
				scene.idle(40);
				scene.text(65, "You can now mine it for the obelisk item! ", [2.5, 2.5, 2.5])
					.placeNearTarget()
					.attachKeyFrame();
				scene.idle(70);
				scene.showControls(20, [2.5, 3, 1], "right")
					.leftClick()
					.withItem("iron_pickaxe");
				scene.idle(10);
				scene.world.modifyBlocks([2, 1, 2, 2, 3, 2], () => Block.id("minecraft:air"), true);
				scene.idle(5);
				scene.world.createItemEntity([2.5, 2.5, 2.5], [0, 0, 0], "forbidden_arcanus:arcane_crystal_obelisk");
			});

	event.create("forbidden_arcanus:hephaestus_forge")
		.scene("hephaestus", "Building The Hephaestus Forge", "kubejs:hephaestus_forge_scene",
			(scene, util) => {
				scene.showStructure();
				scene.idle(20)
				scene.text(35, "The §9Hephaestus Forge§r is a 9x9 Multiblock.", [0, 1.5, 5])
					.independent();
				scene.idle(45)
				scene.world.hideSection([0, 1, 0, 10, 4, 10], Direction.down)
				scene.idle(10)
				scene.text(35, "This is how you build it.", [0, 1.5, 5])
					.independent()
					.attachKeyFrame();
				scene.idle(25);
				scene.world.setBlock([5, 0, 5], "supplementaries:blackstone_lamp", false);
				scene.idle(3);
				scene.world.setBlock([5, 0, 2], "supplementaries:blackstone_lamp", false);
				scene.idle(2);
				scene.world.setBlock([3, 0, 3], "supplementaries:blackstone_lamp", false);
				scene.idle(2);
				scene.world.setBlock([2, 0, 5], "supplementaries:blackstone_lamp", false);
				scene.idle(2);
				scene.world.setBlock([3, 0, 7], "supplementaries:blackstone_lamp", false);
				scene.idle(2);
				scene.world.setBlock([5, 0, 8], "supplementaries:blackstone_lamp", false);
				scene.idle(2);
				scene.world.setBlock([7, 0, 7], "supplementaries:blackstone_lamp", false);
				scene.idle(1);
				scene.world.setBlock([8, 0, 5], "supplementaries:blackstone_lamp", false);
				scene.idle(1);
				scene.world.setBlock([7, 0, 3], "supplementaries:blackstone_lamp", false);
				scene.idle(5);
				scene.text(45, "Start by placing blocks of §9Arcane Chiseled Polished Darkstone§r at the highlighted spots", [5, 1.5, 5])
					.placeNearTarget();
				scene.idle(15)
				scene.world.showSection([5, 1, 5], Direction.down);
				scene.world.showSection([5, 1, 2], Direction.down);
				scene.world.showSection([3, 1, 3], Direction.down);
				scene.world.showSection([2, 1, 5], Direction.down);
				scene.world.showSection([3, 1, 7], Direction.down);
				scene.world.showSection([5, 1, 8], Direction.down);
				scene.world.showSection([7, 1, 7], Direction.down);
				scene.world.showSection([8, 1, 5], Direction.down);
				scene.world.showSection([7, 1, 3], Direction.down);
				scene.idle(40);
				scene.text(35, "Then, surround the center block with §9Chiseled Arcane Polished §9Darkstone", [4, 1.5, 5])
					.placeNearTarget();
				scene.idle(5)
				scene.world.showSection([4, 1, 5, 6, 1, 5], Direction.up);
				scene.world.showSection([5, 1, 4, 5, 1, 6], Direction.up);
				scene.idle(45);
				scene.text(35, "To finish the first layer, surround all blocks with §9Polished Darkstone", [0, 1.5, 5])
					.independent();
				scene.idle(5)
				scene.world.showSection([0, 1, 0, 10, 1, 10], Direction.up);
				scene.idle(45);
				scene.text(30, "Finally, place a §9Smithing Table§r in the middle...", [0, 1.5, 5])
					.independent()
					.attachKeyFrame();
				scene.world.setBlock([5, 2, 5], "minecraft:smithing_table", false);
				scene.idle(5);
				scene.world.showSection([5, 2, 5], Direction.down);
				scene.idle(35)
				scene.text(30, "...and right-click it with §4Mundabitur Dust", [0, 1.5, 5])
					.independent();
				scene.idle(5);
				scene.showControls(30, [5, 3.5, 4], "right")
					.rightClick()
					.withItem("forbidden_arcanus:mundabitur_dust");
				scene.idle(20)
				scene.world.createEntity("forbidden_arcanus:crimson_lightning_bolt", [5, 3, 5]);
				scene.idle(5);
				scene.world.setBlock([5, 2, 5], "forbidden_arcanus:hephaestus_forge", true);
				scene.idle(10);
				scene.text(30, "And your §9Hephaestus Forge §rhas been created!", [0, 1.5, 5])
					.independent()
					.attachKeyFrame();
				scene.idle(30);
			});
});