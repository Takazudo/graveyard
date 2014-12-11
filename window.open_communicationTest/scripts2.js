var ref;
$('a').on('click', function(e) {
  e.preventDefault();
  var src = 'data:text/html,<meta name="viewport" content="width=device-width, initial-scale=1.0"> </head> <body>';
  for(var i=0,l=2000; i<l; i+=1) {
    src += ('<p>' + i + ': The quick brown fox jumps over the lazy dog. ');
  }
  src += '</body>';
  ref = window.open(src);
});
$('input').on('click', function() {
  console.log(ref);
  ref.makeBoo();
  ref.focus();
});
