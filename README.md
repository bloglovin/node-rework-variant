Rework Variant
----------------

A new take on variables for [Rework](https://github.com/visionmedia/rework).

## Installation

Install with npm:

`npm install rework-variant`

## Usage

```js
Variant = require('rework-variant');
Rework(txt).use(Variant());
```

Without namespacing:

```css
$variables {
  red: #f00;
  blue: #00f;
}

background {
  background-color: $red;
  color: $blue;
}
```

Yields:

```css
body {
  background-color: #f00;
  color: #00f;
}
```

**With** namespacing:

```css
$colors {
  red: #f00;
  blue: #00f;
}

$margin {
  left: 20px;
  right: 200px;
}

body {
  background-color: $color.red;
  color: $color.blue;
  margin: 0 $margin.left 0 $margin.right;
}
```

Yields:

```css
body {
  background-color: #f00;
  color: #00f;
  margin: 0 20px 0 200px;
}
```

## License

MIT

