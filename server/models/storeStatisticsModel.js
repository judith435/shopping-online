function StoreStatistics(row) {
    this.numberProducts = row['numberProducts'];
    this.numberOrders = row['numberOrders'];
}

module.exports.StoreStatistics = StoreStatistics;