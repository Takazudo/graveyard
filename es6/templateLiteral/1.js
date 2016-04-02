(function() {

  console.log('===== EX0 =====');

  var name = 'john';
  var country = 'japan';

  var str1 = 'Hello! My name is ' + name + '. I live in ' + country + '.';

  var str2 = [
    'Hello! My name is ',
    name,
    '. I live in ',
    country,
    '.'
  ].join('');

  console.log(str1); // Hello! My name is john. I live in japan.
  console.log(str2); // Hello! My name is john. I live in japan.

}());

(function() {

  console.log('===== EX1 =====');

  var name = 'john';
  var country = 'japan';

  var str1 = `Hello! My name is ${name}. I live in ${country}.`;
  var str2 = `${name} ${country}`;

  console.log(str1);
  console.log(str2);

  document.getElementById('div1-1').innerHTML = str1;
  document.getElementById('div1-2').innerHTML = str2;

}());

(function() {

  console.log('===== EX2 =====');

  var str1 = `今月: ${(new Date).getMonth()+1}月`;

  console.log(str1); // 今月: 9月

}());

(function() {

  console.log('===== EX3 =====');

  var marginVal = '30px';
  var paddingVal = '40px';

  var tag = function(strings, ...values) {
    console.log(strings); // ["marginは", "で、paddingは", "です"]
    console.log(values);  // ["30px", "40px"]
    return 'returned strings!';
  };

  var str1 = tag `marginは${marginVal}で、paddingは${paddingVal}です`;

  console.log(str1); // returned strings!

}());

(function() {

  console.log('===== EX4 =====');

  var val1 = 'value1';
  var val2 = 'value2';

  function tag(strings, ...values) {
    console.log(strings, values);
  };

  var str1 = tag `${val1}`;        // ["", ""], ["value1"]
  var str1 = tag `${val1}${val2}`; // ["", "", ""], ["value1", "value2"]

}());
