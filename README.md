## Usage

### Download
[Latest](https://jc3213.github.io/matchpattern.js/matchpattern.js)

### HTML
```HTML
<script src="https://jc3213.github.io/matchpattern.js/matchpattern.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/matchpattern.js/matchpattern.js
```

## Method
- [create](#create)
- [generate](#generate)

### create
```javascript
let patA = MatchPattern.create(url);
let patB = MatchPattern.create(host);
```
- url
    - `string`
    - `https://example.com/pathname`
- host
    - `string`
    - `example.com`
