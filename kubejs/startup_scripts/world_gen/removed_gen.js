//ORES

WorldgenEvents.remove(event => {
	event.removeOres(o => {
		o.blocks = [
			'/occultism.*silver_ore/',
			'/galosphere.*silver_ore/',
			'/eidolon.*(silver|lead)_ore/',
			'/iceandfire:(sapphire|silver|deepslate_silver)_ore$/'
		];
	})
})