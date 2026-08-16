const $CSConfigSettings = Java.loadClass('com.momosoftworks.coldsweat.config.ConfigSettings');
const $AdaptiveInsulation = Java.loadClass('com.momosoftworks.coldsweat.api.insulation.AdaptiveInsulation');

function getInsulatorEntries(item) {
	let rawItem = item.item;
	let sources = [
		$CSConfigSettings.INSULATION_ITEMS.get(),
		$CSConfigSettings.INSULATING_ARMORS.get(),
		$CSConfigSettings.INSULATING_CURIOS.get()
	];
	let entries = [];
	for (let map of sources) {
		if (map.containsKey(rawItem)) {
			for (let data of map.get(rawItem)) {
				entries.push(data);
			}
		}
	}
	return entries;
}

function getInsulationType(data) {
	let isAdaptive = false;
	for (let i of data.insulation()) {
		// instanceof was unreliable in Rhino
		if (i.getClass().getName() === 'com.momosoftworks.coldsweat.api.insulation.AdaptiveInsulation') {
			isAdaptive = true;
			break;
		}
	}
	if (isAdaptive) return 'ADAPTIVE';
	let cold = data.getCold();
	let heat = data.getHeat();
	if (cold > 0 && heat > 0) return 'NEUTRAL';
	if (cold > 0) return 'COLD';
	if (heat > 0) return 'HEAT';
	return null;
}

FTBFilterSystemEvents.customFilter('insulation', event => {
	let stack = event.getStack();
	let wantedType = event.getData();
	
	let entries = getInsulatorEntries(stack);
	let types = entries.map(data => getInsulationType(data)).filter(t => t !== null);
	
	let matched;
	if (!wantedType) {
		matched = types.length > 0;
	} else {
		matched = types.indexOf(wantedType.toUpperCase()) !== -1;
	}
	
	if (matched) {
		event.success();
	} else {
		event.cancel();
	}
});