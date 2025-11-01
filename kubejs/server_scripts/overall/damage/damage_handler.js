/*
	Recalculates damage changed by abilities and the damage scaling system
*/
global.DamageEvent = event => {
    let amount = event.getAmount();
    global.DamageHandlers
        .filter(fn => typeof fn === "function")
        .forEach((fn, i) => {
            const handlerName = fn.tag || fn.name || `Handler${i}`;
                let result = fn(event, amount);
                if (typeof result === "number") {
                    amount = result;
                }
        });
	amount = amount.toFixed(1);
    event.setAmount(amount);
};