
/**
 * Initialize the plugin callback with optional variable `map`.
 *
 * @param {Object} map
 * @return {Function}
 * @api public
 */

module.exports = function(map){
  return function(style){
    return new Variables(map).visit(style);
  }
};

/**
 * Initialize `Variables` visitor.
 *
 * @param {Object} map
 * @api public
 */

function Variables(map) {
  this.map = map || {};
  this.visit = this.visit.bind(this);
}

/**
 * Substitute variables in `str`.
 *
 * TODO: make sure we don't substitute within strings, url() etc without ${}
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

Variables.prototype.sub = function(str){
  var self = this;
  return str.replace(/\$([-.\w]+)/g, function(_, name){
    return self.lookup(name);
  });
};

/**
 * Lookup variable `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

Variables.prototype.lookup = function(name){
  if (this.map.hasOwnProperty(name)) {
    return this.map[name];
  }

  throw new Error('failed to lookup variable $' + name);
};

/**
 * Visit stylesheet.
 */

Variables.prototype.stylesheet = function(node){
  node.rules.forEach(this.visit);
};

/**
 * Visit rule.
 */

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

    node.declarations = [];
    return;
  }

  // regular rule
  node.declarations.forEach(this.visit);
};

/**
 * Visit declaration.
 */

Variables.prototype.declaration = function(node){
  node.value = this.sub(node.value);
};

/**
 * Visit media.
 */

Variables.prototype.media = function(node){
  node.media = this.sub(node.media);
  node.rules.forEach(this.visit);
};

/**
 * Visit keyframes.
 */

Variables.prototype.keyframes = function(node){
  node.keyframes.forEach(this.visit);
};

/**
 * Visit keyframe.
 */

Variables.prototype.keyframe = function(node){
  node.declarations.forEach(this.visit);
};

/**
 * Visit document.
 */

Variables.prototype.document = function(node){
  node.rules.forEach(this.visit);
};

/**
 * Visit node.
 */

Variables.prototype.visit = function(node){
  var type = node.type || 'stylesheet';
  if (!this[type]) return;
  this[type](node);
};
