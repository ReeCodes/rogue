let eid_chestplate = {
	"replace": true,
	"type": "eidolon:worktable",
	"pattern": [
		"s s",
		"bwb",
		"sbs"
	],
	"reagents": "htlt",
	"key": {
		"b": {
			"item": "eidolon:imbued_bones"
		},
		"w": {
			"item": "eidolon:wraith_heart"
		},
		"s": {
			"item": "embers:silver_ingot"
		},
		"t": {
			"item": "eidolon:tattered_cloth"
		},
		"h": {
			"item": "eidolon:holy_symbol"
		},
		"l": {
			"item": "eidolon:lesser_soul_gem"
		}
	},
	"result": {
		"item": "eidolon:bonelord_chestplate"
	}
}

let eid_greaves = {
	"replace": true,
	"type": "eidolon:worktable",
	"pattern": [
		"bsb",
		"s s",
		"s s"
	],
	"reagents": "hlal",
	"key": {
		"s": {
			"item": "embers:silver_ingot"
		},
		"b": {
			"item": "eidolon:imbued_bones"
		},
		"h": {
			"item": "eidolon:holy_symbol"
		},
		"a": {
			"item": "eidolon:enchanted_ash"
		},
		"l": {
			"item": "eidolon:lesser_soul_gem"
		}
	},
	"result": {
		"item": "eidolon:bonelord_greaves"
	}
}

let eid_helm = {
	"replace": true,
	"type": "eidolon:worktable",
	"pattern": [
		"bsb",
		"s s",
		"   "
	],
	"reagents": "ht t",
	"key": {
		"b": {
			"item": "eidolon:imbued_bones"
		},
		"s": {
			"item": "embers:silver_ingot"
		},
		"t": {
			"item": "eidolon:tattered_cloth"
		},
		"h": {
			"item": "eidolon:holy_symbol"
		}
	},
	"result": {
		"item": "eidolon:bonelord_helm"
	}
}

ServerEvents.highPriorityData(event => {
	event.addJson('eidolon:recipes/bonelord_chestplate.json', eid_chestplate)
	event.addJson('eidolon:recipes/bonelord_greaves.json', eid_greaves)
	event.addJson('eidolon:recipes/bonelord_helm.json', eid_helm)
	event.addJson('eidolon:recipes/sulfur.json', replaceJSON)
})