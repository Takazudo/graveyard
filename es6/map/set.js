(function() {

  var ageMap = new Map();

  ageMap.set('Suzuki', 35);
  ageMap.set('Tanaka', 36);
  console.log(ageMap.get('Suzuki'));
  console.log(ageMap.get('Tanaka'));
  console.log(ageMap.size);
  ageMap.delete('Suzuki');
  console.log(typeof ageMap);
  console.log(ageMap.has('Suzuki'));
  console.log(ageMap.has('Tanaka'));
  ageMap.clear();
  console.log(ageMap);

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36]
  ]);

  console.log(map.get('Suzuki'));
  console.log(map.get('Tanaka'));
  console.log(map.size);
  console.log(map.set('Nakamura', 55));
  map.delete('Nakamura');
  console.log(map);
  console.log(map.has('Suzuki'));
  console.log(map.has('Mogetarou'));
  map.clear();
  console.log(map);

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36]
  ]);

  for(let item of map) {
    console.log(item);
  }
  // => ['Suzuki', 35]
  // => ['Tanaka', 36]

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36],
    ['John', 36]
  ]);

  map.forEach(function(value, key, map) {
    console.log(key, value);
  });

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36],
    ['John', 36]
  ]);

  var entries = map.entries();
  console.log([...entries]);
  var entry = entries.next();

  while(!entry.done) {
    console.log(entry.value);
    entry = entries.next();
  }

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36],
    ['John', 36]
  ]);

  var keys = map.keys();
  console.log([...keys]);
  var key = keys.next();

  while(!key.done) {
    console.log(key.value);
    key = keys.next();
  }

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36],
    ['John', 36]
  ]);

  var values = map.values();
  console.log([...values]);
  var value = values.next();

  while(!value.done) {
    console.log(value.value);
    value = values.next();
  }

}());

(function() {
  return;

  var map = new Map([
    ['Suzuki', 35],
    ['Tanaka', 36]
  ]);

  var map2 = new Map(map);

  console.log(map2.get('Suzuki'));
  console.log(map2.get('Tanaka'));

}());


(function() {
  return;

  let iterable = {
    [Symbol.iterator]() {
      let step = 0;
      let iterator = {
        next() {
          if (step <= 2) {
            step++;
          }
          switch (step) {
            case 1:
              return { value: ['Suzuki', 35], done: false };
            case 2:
              return { value: ['Tanaka', 36], done: false };
            default:
              return { value: undefined, done: true };
          }
        }
      };
      return iterator;
    }
  };

  iterable.forEach(function() {
    console.log(arguments);
  });

  //var iterator = iterable[Symbol.iterator]();
  //console.log(iterator.next());
  //console.log(iterator.next());
  //console.log(iterator.next());

  //for(let item of iterable) {
  //  console.log(item);
  //}

}());

