(function() {
  return;

  var map = new Map;

  var person1 = {
    sex: 'man',
    age: 20,
    name: 'Taro Suzuki',
  };
  var person2 = {
    sex: 'female',
    age: 22,
    name: 'Hanako Tanaka',
  };

  map.set(1, person1);
  map.set(2, person2);

  console.log(map.get(1));
  console.log(map.get(2));

  // same
  console.log(person1 === map.get(1));
  person1.age = 99;
  console.log(map.get(1).age);

  person1 = null;
  person2 = null;

  console.log(map.get(1));
  console.log(map.get(2));

}());

(function() {
  return;

  var firstMeeting = new Map;

  var person1 = {
    sex: 'man',
    age: 20,
    name: 'Taro Suzuki',
  };
  var person2 = {
    sex: 'female',
    age: 22,
    name: 'Hanako Tanaka',
  };

  firstMeeting.set(person1, '2015/12/17');
  firstMeeting.set(person2, '2015/12/20');

  console.log(firstMeeting.get(person1));
  console.log(firstMeeting.get(person2));

}());

(function() {

  var firstMeeting = new Map;

  var people = [];

  for(var i=0, l=10000000; i<l; i+=1) {
    people.push({
      sex: 'man',
      age: 20,
      name: 'Taro Suzuki',
    });
  }

  //firstMeeting.set(person1, '2015/12/17');
  //firstMeeting.set(person2, '2015/12/20');

  //console.log(firstMeeting.get(person1));
  //console.log(firstMeeting.get(person2));

}());
