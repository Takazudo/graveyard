(function() {

  console.log('===== EX1 =====');

  var charsToUpper = function(strings, ...values) {
    var res = '';
    for(var i=0, l=strings.length; i<l; i+=1) {
      res += strings[i];
      if(i < values.length) {
        res += values[i].toUpperCase();
      }
    }
    return res;
  };

  var name = 'john';
  var country = 'japan';

  var str1 = charsToUpper `Hello! My name is ${name}. I live in ${country}.`;
  var str2 = charsToUpper `${name} ${country}`;

  console.log(str1); // "Hello! My name is JOHN. I live in JAPAN."
  console.log(str2); // "JOHN JAPAN"

}());

(function() {

  console.log('===== EX2 =====');

  var charsToUpper = function(strings, ...values) {
    console.log(strings);
    console.log(values);
    var res = '';
    for(var i=0, l=strings.length; i<l; i+=1) {
      res += strings[i];
      if(i < values.length) {
        res += values[i].toUpperCase();
      }
    }
    return res;
  };

  var name = 'john';
  var country = 'japan';

  var str1 = charsToUpper `Hello! My name is ${name}. I live in ${country}`;
  var str2 = charsToUpper `${name} ${country}`;
  var str3 = charsToUpper `${name}${country}${name}${country}${name}${country}${name}${country}`;

  console.log(str1);
  console.log(str2);
  console.log(str3);

}());

(function() {
  
  console.log('===== EX3 =====');

  var data = {
    title: '<探検>！ECMAScript',
    author: '佐藤鈴木&田中太郎',
    tags: [ 'HTML', 'JavaScript', 'CSS' ],
    links: [
      { 
        title: 'Mozilla Developer Network',
        href: 'https://developer.mozilla.org/ja/'
      },
      {
        title: 'Web Hypertext Application Technology Working Group',
        href: 'https://whatwg.org/'
      }
    ],
    entryBody: '<p>This is a blog post!</p>'
  };

  // HTMLの特殊文字を実体参照にするタグ
  var htmlEscape = function(strings, ...values) {
    var handleString = function(str) {
      return str.replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/`/g, '&#96;');
    };
    var res = '';
    for(var i=0, l=strings.length; i<l; i+=1) {
      res += handleString(strings[i]);
      if(i < values.length) {
        res += handleString(values[i]);
      }
    }
    return res;
  };

  var html = `
    <section class="entry">
      <header>
        <h1>${htmlEscape `${data.title}`}</h1>
        <div class="author">Author: ${htmlEscape `${data.author}`}</div>
        <ul class="tags">
          ${data.tags.map(tag => `<li>${tag}</li>`).join('\n')}
        </ul>
      </header>
      ${data.entryBody}
      <hr>
      <dl>
        <dt>関連リンク</dt>
        ${data.links.map(link => `<dd><a href="${link.href}">${link.title}</dd>`).join('\n')}
      </dl>
    </section>
  `;

  console.log(html);


  document.getElementById('div2-1').innerHTML = html;
  //document.getElementById('div2-2').innerHTML = str2;

}());
