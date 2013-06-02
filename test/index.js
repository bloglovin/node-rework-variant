
/**
 * Module dependencies.
 */

var variables = require('..');
var rework = require('rework');
var path = require('path');
var fs = require('fs');
var read = fs.readFileSync
var readdir = fs.readdirSync;

readdir('test/cases').forEach(function(file){
  if (~file.indexOf('out')) return;
  var title = file.replace('.css', '');
  describe(title, function(){
    it('should work', function(){
      file = path.join('test/cases', file);
      var str = read(file, 'utf8').trim();
      var out = read(file.replace('.css', '.out.css'), 'utf8').trim();

      var css = rework(str)
        .use(variables())
        .toString()
        .trim();

      css.should.equal(out);
    })
  })
});
