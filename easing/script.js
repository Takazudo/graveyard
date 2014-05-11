var paper = window.paper;
var MILLISEC_PER_FRAME = 1000 / 60;

//var noEasing = function(
//  currentTime,
//  beginningValue,
//  changeValue,
//  totalTime
//) {
//  // t = current time
//  // b = beginning value
//  // c = change value between beginning and its destination
//  // d = total time of the tween
//  return changeValue * currentTime / totalTime + beginningValue;
//};

var easing = function(
  currentTime,
  beginningValue,
  changeValue,
  totalTime
) {
  // t = current time
  // b = beginning value
  // c = change value between beginning and its destination
  // d = total time of the tween
  //return beginningValue + changeValue * currentTime / totalTime;
  //return beginningValue + changeValue * Math.pow(currentTime / totalTime, 3);
  //return beginningValue + changeValue * (1 - Math.pow(1 - (currentTime / totalTime), 3));
  //return changeValue * (currentTime /= totalTime) * currentTime + beginningValue; // easeInQuad
  //return changeValue * Math.pow( currentTime / totalTime, 2 ) + beginningValue; // easeInQuad
  //return changeValue * Math.pow( currentTime / totalTime, 6 ) + beginningValue; // easeInQuad
  //var timeRate = (currentTime / totalTime);
  //console.log(timeRate, (timeRate - 2));
  //return - changeValue * Math.pow(timeRate, 2) + 2 * changeValue * timeRate + beginningValue;
  //return changeValue * Math.pow(timeRate, 2) + beginningValue;
  //return -changeValue * timeRate * (timeRate - 2) + beginningValue; // easeOutQuad
  //return -changeValue * (currentTime / totalTime) * ((currentTime / totalTime) - 2) + beginningValue; // easeOutQuad
  //return changeValue - changeValue * Math.pow(1 - (currentTime / totalTime), 4) + beginningValue; // easeOutQuad
  return changeValue * (1 -  Math.pow(1 - (currentTime / totalTime), 4)) + beginningValue; // easeOutQuad
};

var Graph = function(options) {

  this.options = options;
  var src = '<canvas width="' + options.width + '" height="' + options.height + '" class="graph"></canvas>';

  this.$el = $(src);
  this.el = this.$el[0];

  $(options.appendTo).append(this.$el);

  var p = this._paper = new paper.PaperScope;
  p.project = new p.Project;
  p.view = new p.View(this.el);

  p.view.draw();

};
Graph.prototype.startDrawing = function() {
  var p = this._paper;
  var h = this.options.height;
  var path = new p.Path;
  path.strokeColor = 'black';
  var point = new p.Point(0, h);
  path.add(point);
  path.strokeWidth = 1;
  this._path = path;
  return this;
};
Graph.prototype.addPoint = function(currentTime, currentValue) {

  var o = this.options;
  var p = this._paper;

  // calc x and y of the point
  var currentTimeRate = currentTime / o.totalTime;
  var x = o.width * currentTimeRate;
  var currentValueRate = (currentValue - o.beginningValue) / o.changeValue;
  var y = o.height - (o.height * currentValueRate);
  var point = new p.Point(x, y);

  // add point to the current path
  this._path.add(point);

  // create point circle
  var circle = new p.Path.Circle(point, 2);
  circle.strokeColor = 'black';
  circle.fillColor = 'black';
  circle.strokeWidth = 0;

  p.view.draw();
  return this;
};
Graph.prototype.endDrawing = function() {
  var p = this._paper;
  var o = this.options;
  var point = new p.Point(o.width, 0);
  this._path.add(point);
  p.view.draw();
  return this;
};

$.easing.hoge = function(
  percent,
  currentTime,
  beginningValue,
  changeInValue,
  duration
	//def: 'easeOutQuad',
	//swing
  // x, t, b, c, d
) {
  return currentTime / duration; // linear
};

$(function() {

  var g = new Graph({
    width: 200,
    height: 200,
    totalTime: 1000,
    beginningValue: 0,
    changeValue: 1,
    appendTo: '#hoge'
  });

  var endTime = 1000;
  var currentTime = 0;

  var $box = $('#box');

  g.startDrawing();
  var tick = function() {
    currentTime += MILLISEC_PER_FRAME;
    if(currentTime > endTime) {
      g.endDrawing();
      return;
    };
    //var value = easing(currentTime, 50, 200, 1000);
    var changeRate = $.easing.hoge(null, currentTime, 50, 200, 1000);
    var value = 50 + 200 * changeRate;
    //var value = 50 + 200 * $.easing.hoge(null, currentTime, 50, 200, 1000);
    g.addPoint(currentTime, changeRate);
    $box.css('left', value);
    setTimeout(tick, MILLISEC_PER_FRAME);
  };
  

  $('#run').click(function() {
    tick();
    //var $box2 = $('#box2');
    //$box2.animate({
    //  left: 250
    //}, 1000, 'hoge');
  });
  //$('#reset').click(function() {
  //  tick();
  //});

});
