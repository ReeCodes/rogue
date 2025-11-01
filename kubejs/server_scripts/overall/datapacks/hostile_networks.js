ServerEvents.highPriorityData(event => {

let hnn_mimic = {
	"replace": true,
    "conditions": [
        {
            "modid": "artifacts",
            "type": "forge:mod_loaded"
        }
    ],
    "entity": "artifacts:mimic",
    "variants": [],
    "name": "entity.artifacts.mimic",
    "name_color": "#55FF55",
    "gui_scale": 1.0,
    "gui_x_offset": 0.0,
    "gui_y_offset": 0.0,
    "gui_z_offset": 0.0,
    "sim_cost": 2560,
    "input": {
        "item": "hostilenetworks:prediction_matrix",
        "count": 1
    },
    "base_drop": {
        "item": "hostilenetworks:end_prediction",
        "count": 1
    },
    "trivia": "hostilenetworks.trivia.mimic",
    "fabricator_drops": [],
    "tier_data": [
        30,
        330,
        930,
        2000
    ],
    "data_per_kill": [
        1,
        10,
        20,
        30
    ]
}

let curiosDrops = Ingredient.of(['@artifacts']).subtract(Ingredient.of([
	'artifacts:mimic_spawn_egg',
	'artifacts:everlasting_beef',
	'artifacts:eternal_steak'
]))

curiosDrops.stacks.forEach(c => {
    hnn_mimic[`fabricator_drops`].push({
        item: c.id,
        count: 1
    })
})
	event.addJson(`hostilenetworks:data_models/artifacts/mimic.json`, hnn_mimic)
})