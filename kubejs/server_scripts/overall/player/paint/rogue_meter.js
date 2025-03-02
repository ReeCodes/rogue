let previousCoef = null;

function loadRBar(event) {

    let player = event.player;
    let baseCoef = player.persistentData?.coef ?? 1;
    let borderWidth = 4;
    let barWidth = 102 - borderWidth;
    let pWidth = ((baseCoef - 1) / 19) * barWidth;

    if (player.age % 80 == 0) {
			
        if (previousCoef !== baseCoef) {
            previousCoef = baseCoef;

            player.paint({
                rogue_gui: {
                    type: 'rectangle',
                    texture: 'rogue:textures/misc/gui/rogue_meter.png',
                    alignX: 'left',
                    alignY: 'bottom',
                    x: 16,
                    y: -20,
                    w: 102,
                    h: 12,
                    visible: true
                },
                rogue_bar: {
                    type: 'rectangle',
                    color: '#E8245C',
                    draw: 'ingame',
                    alignX: 'left',
                    alignY: 'bottom',
                    x: 18,
                    y: -22,
                    w: pWidth,
                    h: 8,
                    visible: true
                },
                rogue_bar2: {
                    type: 'rectangle',
                    color: '#F07CA4',
                    draw: 'ingame',
                    alignX: 'left',
                    alignY: 'bottom',
                    x: 18,
                    y: -26,
                    w: pWidth,
                    h: 2,
                    visible: true
                },
                rogue_amount: {
                    type: 'text',
                    alignX: 'left',
                    alignY: 'bottom',
                    x: 58,
                    y: -22,
                    text: `${baseCoef.toFixed(2)}`,
                    shadow: true,
                    color: '#DBD2E0',
                    scale: 0.65,
                    visible: true
                }
            });
        } else {
            player.paint({
                rogue_gui: { visible: false },
                rogue_bar: { visible: false },
                rogue_bar2: { visible: false },
                rogue_amount: { visible: false }
            });
        }
    }
}

PlayerEvents.tick(event => {
	loadRBar(event)
});