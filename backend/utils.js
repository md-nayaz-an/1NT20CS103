function filter (data) {
    
    const filteredTrains = data.filter(train => {
        const lessthan30 = !(train.departureTime.Hours == 0 &&
            train.departureTime.Minutes + train.delayedBy <= 30);
        const greaterthan12 = train.departureTime.Hours <= 12

        return ( lessthan30 && greaterthan12);
    });
    return filteredTrains;
}

function comp(a, b) {
    if(a.price.sleeper + a.price.AC !== b.price.sleeper + b.price.AC)
        return a.price.sleeper + a.price.AC - a.price.sleeper + a.price.AC;
    else if(a.seatsAvailable.sleeper + a.seatsAvailable.AC !== b.seatsAvailable.sleeper + b.seatsAvailable.AC)
        return a.seatsAvailable.sleeper + a.seatsAvailable.AC - a.seatsAvailable.sleeper + a.seatsAvailable.AC;
    else {
        return b.departureTime.Hours * 60 + b.departureTime.Minutes - a.departureTime.Hours * 60 + a.departureTime.Minutes;
    }

}

function sort (data) {
    const n = data.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (comp(data[j], data[j + 1]) > 0) {
          const temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;
        }
      }
    }

    return data;
}

module.exports = {
    filter,
    sort,
}