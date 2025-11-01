MoreJSEvents.villagerTrades((event) => {
    const farmerTrades = event.addTrade('farmer', 3, [TradeItem.of("minecraft:emerald", 12, 22)], 'miniutilities:ender_lily_seeds');
    farmerTrades.maxUses(3);
    farmerTrades.villagerExperience(25);
});