(function() {
  return; // for dev

  var cat = {
    set name(name) {
      this._name = name;
    },
    get name() {
      return this._name;
    },
    walk() {
      console.log(this._name + 'が歩いてます');
    }
  };

  console.log(cat.name);
  cat.name = 'タマ'
  console.log(cat.name);
  cat.walk();

}());

(function() {
  return; // for dev

  function Cat(name) {
    this.setName(name);
  };
  Cat.prototype = {
    setName: function(name) {
      this._name = name;
    },
    getName: function() {
      return this._name;
    },
    walk: function() {
      console.log(this._name + 'が歩いてます');
    }
  };

  var cat1 = new Cat('タマ');
  var cat2 = new Cat('コタロー');
  cat1.walk(); // タマが歩いています
  cat2.walk(); // コタローが歩いています

}());

(function() {
  return; // for dev

  class Cat {
    constructor(name) {
      this.name = name;
    }
    set name(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    walk() {
      console.log(this._name + 'が歩いてます');
    }
  }

  var cat1 = new Cat('タマ');
  var cat2 = new Cat('コタロー');
  cat1.walk(); // タマが歩いています
  cat2.walk(); // コタローが歩いています

}());

(function() {
  return; // for dev
  
  var catCount = 0;

  class Cat {
    constructor(name) {
      this.name = name;
      catCount += 1;
    }
    set name(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    walk() {
      console.log(this._name + 'が歩いてます');
    }
    static count() {
      return catCount;
    }
  }

  console.log(Cat.count()); // 0
  var cat1 = new Cat('タマ');
  console.log(Cat.count()); // 1
  var cat2 = new Cat('コタロー');
  console.log(Cat.count()); // 2

}());

(function() {
  // return; // for dev
  
  class Animal {
    constructor(name) {
      this.name = name;
    }
    set name(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    walk() {
      console.log(this.name + 'が歩いてます');
    }
  }

  class Cat extends Animal {
    mew() {
      console.log(this.name + 'がニャーと鳴いてます');
    }
  }

  var cat1 = new Cat('タマ');
  console.log(cat1.name); // タマ
  cat1.walk(); // タマが歩いてます
  cat1.mew();  // タマがニャーと鳴いてます

  var cat2 = new Cat('コタロー');
  console.log(cat2.name); // コタロー
  cat2.walk(); // コタローが歩いてます
  cat2.mew();  // コタローがニャーと鳴いてます

}());

(function() {
  //return; // for dev
  
  class Animal {
    constructor(name) {
      this.name = name;
    }
    set name(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    walk() {
      console.log(this.name + 'が歩いてます');
    }
  }

  class Cat extends Animal {
    constructor(name, color) {
      super(name);
      this.color = color;
    }
    get color() {
      return this._color;
    }
    set color(color) {
      this._color = color;
    }
    mew() {
      console.log(this.color + '色の' + this.name + 'がニャーと鳴いてます');
    }
    walk() {
      super.walk();
      console.log('忍び足です');
    }
  }

  var cat1 = new Cat('タマ', '茶');
  console.log(cat1.name); // タマ
  cat1.walk(); // タマが歩いてます
               // 忍び足です
  cat1.mew();  // 茶色のタマがニャーと鳴いてます

  var cat2 = new Cat('コタロー', '黒');
  console.log(cat2.name); // コタロー
  cat2.walk(); // コタローが歩いてます
               // 忍び足です
  cat2.mew();  // 黒色のコタローがニャーと鳴いてます

}());
