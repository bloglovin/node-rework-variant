
module.exports = function(map){
  return function(style){
    return new Variables(map).visit(style);
  }
};

function Variables(map) {
  this.map = map || {};
  this.visit = this.visit.bind(this);
}

// TODO: make sure we don't substitute within strings, url() etc.
Variables.prototype.sub = function(str){
  var self = this;
  return str.replace(/\$([-.\w]+)/g, function(_, name){
    return self.lookup(name);
  });
};

Variables.prototype.lookup = function(name){
  if (this.map.hasOwnProperty(name)) {
    return this.map[name];
  }

  throw new Error('failed to lookup variable $' + name);
};

Variables.prototype.stylesheet = function(node){
  node.rules.forEach(this.visit);
};

Variables.prototype.rule = function(node){
  var self = this;
  var sel = node.selectors[0].trim();

  // variables rule
  if ('$' == sel[0]) {
    var global = '$globals' == sel;
    var name = sel.slice(1);

    node.declarations.forEach(function(decl){
      if (global) {
        self.map[decl.property] = decl.value;
      } else {
        self.map[name + '.' + decl.property] = decl.value;
      }
    });

    // TODO: remove rule when .parent is added to css-parse
    node.declarations = [];
    return;
  }

  // regular rule
  node.declarations.forEach(this.visit);
};

Variables.prototype.declaration = function(node){
  node.value = this.sub(node.value);
};

Variables.prototype.media = function(node){
  node.media = this.sub(node.media);
  node.rules.forEach(this.visit);
};

Variables.prototype.visit = function(node){
  var type = node.type || 'stylesheet';
  if (!this[type]) return;
  this[type](node);
};
