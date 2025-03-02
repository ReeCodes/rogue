const $Numismatics = Java.loadClass('dev.ithundxr.createnumismatics.Numismatics');

function getPlayerBalance(player) {
	const playerAccount = $Numismatics.BANK.accounts.get(player.getUuid());
	return playerAccount ? playerAccount.getBalance() : 0;
}

PlayerEvents.tick(event => {
	let player = event.player;
	let balance = getPlayerBalance(player);
	let offsetX = 122;
	let offsetY = 3;

	const suns = Math.floor(balance / 4096);
	const cogs = Math.floor((balance % 4096) / 64);
	const spurs = balance % 64;
	
		player.paint({
			spursiDisplay: {
				type: 'item',
				item: 'numismatics:spur',
				x: 26 + offsetX,
				y: 5 + offsetY,
				alignX: 'center',
				alignY: 'bottom',
				visible: true
			},
			cogsiDisplay: {
				type: 'item',
				item: 'numismatics:cog',
				x: 43 + offsetX,
				y: 4 + offsetY,
				alignX: 'center',
				alignY: 'bottom',
				visible: true
			},
			sunsiDisplay: {
				type: 'item',
				item: 'numismatics:sun',
				x: 65 + offsetX,
				y: 3 + offsetY,
				alignX: 'center',
				alignY: 'bottom',
				visible: true
			},
			spursDisplay: {
				type: 'text',
				x: 10 + offsetX,
				y: -6 + offsetY,
				text: `${spurs}`,
				color: '#DF5C0C',
				alignX: 'center',
				alignY: 'bottom',
				visible: true
			},
			cogsDisplay: {
				type: 'text',
				x: 26 + offsetX,
				y: -6 + offsetY,
				text: `${cogs}`,
				color: '#CBC807',
				alignX: 'center',
				alignY: 'bottom',
				visible: true
			},
			sunsDisplay: {
				type: 'text',
				x: 46 + offsetX,
				y: -6 + offsetY,
				text: `${suns}`,
				color: '#F0A2F1',
				alignX: 'center',
				alignY: 'bottom',
				visible: true
			}
		})
});