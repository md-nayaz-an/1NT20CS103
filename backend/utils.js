function filter (data) {
    
    const filteredTrains = data.filter(train => {
      return !(train.departureTime.Hours == 0 &&
        train.departureTime.Minutes <= 30);
    });
    return filteredTrains;
}

module.exports = {
    filter,
}