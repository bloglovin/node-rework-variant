Rework Variant
----------------

A new take on variables for [Rework](https://github.com/visionmedia/rework).

## Installation

Install with npm:

`npm install rework-variant`

## Usage

```js
var rework = require('rework');
var variant = require('rework-variant');
rework(txt).use(variant());
```

### Globals

  The `$globals` rule allows variables to be referenced without a prefix:

```css

$globals {
  blue: #2ccdec;
  orange: #f33c27;
}

a {
  color: $blue;
}

a:hover {
  color: $orange;
}
```

  While other variable rules act as namespaces:

```css
$colors {
  blue: #2ccdec;
  orange: #f33c27;
}

a {
  color: $colors.blue;
}

a:hover {
  color: $colors.orange;
}
```

  Variables may be referenced in most places you'd expect:

```css

$globals {
  phone-portrait: (min-device-width: 320px);
  phone-landscape: (min-device-width: 480px);
}

@media screen and $phone-portrait and $phone-landscape {
  body {
    some: 'stuff';
  }
}
```

## License

MIT

