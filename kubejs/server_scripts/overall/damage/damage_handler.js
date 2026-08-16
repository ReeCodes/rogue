/*
	Recalculates damage dealt by abilities
*/

global.DamageEvent = event => {
    let amount = event.getAmount();
    let handlers = global.DamageHandlers;
    
    for (let i = 0; i < handlers.length; i++) {
        let fn = handlers[i];
        if (typeof fn !== "function") continue;
        
        let result = fn(event, amount);
        if (typeof result === "number") {
            amount = result;
        }
    }
    
    event.setAmount(Number(amount.toFixed(1)));
};