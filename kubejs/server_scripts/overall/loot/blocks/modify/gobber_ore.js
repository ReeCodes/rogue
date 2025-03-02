ServerEvents.blockLootTables(event => {
	event.addBlock('gobber2:gobber2_lucky_block_nether', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('gobber2:gobber2_gooey_bread_nether', 20);
			pool.addItem('gobber2:gobber2_gooey_beef_nether', 20);
			pool.addItem('gobber2:gobber2_gooey_beefstew_nether', 10);
			pool.addItem('gobber2:gobber2_goo_nether', 20);
			pool.addItem('gobber2:gobber2_glass_nether', 20);
			pool.survivesExplosion();
		})
	})
	event.addBlock('gobber2:gobber2_lucky_block_end', table => {
		table.addPool(pool => {
			pool.rolls = 1;
			pool.addItem('gobber2:gobber2_foo_end', 20);
			pool.addItem('gobber2:gobber2_globette_end', 20);
			pool.addItem('gobber2:gobber2_glass_end', 20);
			pool.survivesExplosion();
		})
	})
})