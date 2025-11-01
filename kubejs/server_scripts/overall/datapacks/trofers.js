let trophyJSON = (colors, display, soundEvent, itemId, itemCount, animationType, animationSpeed, name) => {
    let json = {
        "colors": {
            "accent": colors.accent,
            "base": colors.base
        },
        "display": {
            "offset": {
                "x": display.offset.x,
                "y": display.offset.y,
                "z": display.offset.z
            },
            "scale": display.scale
        },
        "item": {
            "item": itemId,
            "count": itemCount
        },
        "animation": {
            "type": animationType,
            "speed": animationSpeed
        },
        "name": {
            "color": name.color,
            "text": name.text
        }
    }
	
    if (soundEvent) {
        json.effects = {
            "sound": {
                "soundEvent": soundEvent
            }
        }
    }

    return json
}
	
function createTrofer(event, trophyName, settings) {
	event.addJson(
		`trofers:trofers/trophies/${trophyName}.json`,
		trophyJSON(
			settings.colors,
			settings.display,
			settings.soundEvent,
			settings.itemId,
			settings.itemCount,
			settings.animationType,
			settings.animationSpeed,
			settings.name
		)
	);
}

let allTrophies = {
	"completionist_trophy": {
		colors: {
			accent: "#f76628",
			base: "#edca61"
		},
		display: {
			offset: {
				x: 0,
				y: 7,
				z: 0
			},
			scale: 2.0
		},
		soundEvent: "rogue:rogue_completed",
		itemId: "rogue:completionist_trophy",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.20,
		name: {
			color: "#edca61",
			text: "<rainb>Trophy of the Rogue</rainb>"
		}
	},
	"mage_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "goety:howling_soul",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.10,
		name: {
			color: "#3a7dff",
			text: "Omnimagus Trophy"
		}
	},
	"innovator_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "industrialforegoing:machine_frame_supreme",
		itemCount: 1,
		animationType: "tumbling",
		animationSpeed: 0.10,
		name: {
			color: "#3a7dff",
			text: "Innovators Trophy"
		}
	},
	"antiquarian_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "cataclysm:abyssal_sacrifice",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.10,
		name: {
			color: "#3a7dff",
			text: "Antiquarian Trophy"
		}
	},
	"miscreant_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "savage_and_ravage:mask_of_dishonesty",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.10,
		name: {
			color: "#3a7dff",
			text: "Miscreant Trophy"
		}
	},
	"health_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "heartstone:heartstone",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.20,
		name: {
			color: "#3a7dff",
			text: "Life Trophy"
		}
	},
	"alien_trophy": {
		colors: {
			accent: "#f5da42",
			base: "#f5bf42"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "dimdungeons:item_blank_advanced_key",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.33,
		name: {
			color: "#3a7dff",
			text: "Alien Trophy"
		}
	},
	"mole_trophy": {
		colors: {
			accent: "#960b27",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.75
		},
		itemId: "alexscaves:pure_darkness",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.20,
		name: {
			color: "#960b27",
			text: "Mole Trophy"
		}
	},
	"druid_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.25
		},
		itemId: "bloodmagic:orbcapacityrune2",
		itemCount: 1,
		animationType: "tumbling",
		animationSpeed: 0.66,
		name: {
			color: "#3a7dff",
			text: "Druid Trophy"
		}
	},
	"anthophile_trophy": {
		colors: {
			accent: "#8CDEA2",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.25
		},
		itemId: "naturesaura:birth_spirit",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.23,
		name: {
			color: "#8CDEA2",
			text: "Florist Trophy"
		}
	},
	"founder_trophy": {
		colors: {
			accent: "#3a7dff",
			base: "#101010"
		},
		display: {
			offset: {
				x: 0,
				y: 8,
				z: 0
			},
			scale: 1.25
		},
		itemId: "cold_sweat:thermometer",
		itemCount: 1,
		animationType: "spinning",
		animationSpeed: 0.15,
		name: {
			color: "#8CDEA2",
			text: "Founder's Trophy"
		}
	}
};

ServerEvents.highPriorityData(event => {
	Object.entries(allTrophies).forEach(([trophyName, settings]) => {
		createTrofer(event, trophyName, settings);
	});
});