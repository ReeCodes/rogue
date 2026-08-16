//priority: -100

const parameters = {
	"doResourcefulChecking": doResourcefulChecking,
	"mobScalingDebugger": mobScalingDebugger
};

const modeSet = (flag) => flag ? "ON" : "OFF";

for (let [name, flag] of Object.entries(parameters)) {
	console.log(`[MODE PARAMETERS] ${name} set to ${modeSet(flag)}`);
}
console.log("[SERVER MODE] Set to " + global.SERVER_MODE);