var ref;
$('a').on('click', function(e) {
  e.preventDefault();
  var src = 'data:text/html,<meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script><script>window.makeBoo = function() { $("h1").text("boo!"); }; </script> </head> <body> <p>Page2.</p> <h1>...</h1> </body>';
  ref = window.open(src);
});
$('input').on('click', function() {
  console.log(ref);
  ref.makeBoo();
  ref.focus();
});
