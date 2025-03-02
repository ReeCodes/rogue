//HIDE
JEIEvents.hideItems(event => {
	global.oreTagsRemove.forEach(o => {
		event.hide(o)
	})
	
	global.disabledItems.forEach(i => {
		event.hide(i)
	})
	
	global.partDuplicates.forEach(p => {
		event.hide(p)
	})
})