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
let pattern = MatchPattern.create("www.example.com"); // *.example.com
```
- pattern
   - Result, `string`
   - `*.example.com`
- url
    - `string`
    - `https://www.example.com/pathname`
    - `www.example.com`
    - `*.example.com`

### generate
```javascript
let { regexp, string } = MatchPattern.generate( [ patternA, patternB, ..., patternZ ] );
```
- regexp
    - `Regular Expression`
    - `/^(patternA|patternB|...|patternZ)$/i`
- string
    - `string`
    - `^(patternA|patternB|...|patternZ)$`
- pattern
    - `string`
    - `*.some.host`
    - `192.168.*`
    - Don't support ipv6 though
