//ORES

WorldgenEvents.remove(event => {
	event.removeOres(o => {
		o.blocks = [
		'/occultism.*silver_ore/',
		'/galosphere.*silver_ore/',
		'/eidolon.*(silver|lead)_ore/',
		'/caverns_and_chasms:silver:*_ore/'
		]
	})
})