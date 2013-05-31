//
// # Rework Variant
//
// A new take on Rework CSS variables.
//
module.exports = function (opts) {
  opts = opts || { namespace: true };
  return function (style) {
    var vars = {};
    var x = 0;
    style.rules.forEach(function (rule, i) {
      rule.selectors.forEach(function (sel) {
        if (sel.indexOf('$') === 0) {
          rule.declarations.forEach(function (d) {
            vars[(opts.namespace ? sel + '.' : '$') + d.property] = d.value;
          });
          delete(style.rules[i]);
        }
        else {
          rule.declarations.forEach(function (d) {
            for (var j in vars) {
              d.value = d.value.replace(j, vars[j]);
            }
          });
        }
      });
    });
  };
};

