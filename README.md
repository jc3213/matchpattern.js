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

## Syntax
```javascript
let matchPattern = new MatchPattern();
```

## Method
- [add](#add)
    - add new [match pattern](#match-pattern)
- [remove](#remove)
    - remove exist [match pattern](#match-pattern)
- [match](#match)
    - match `url` with match patterns

### add
```javascript
matchPattern.add('*.google.com');
```
- add `*.google.com` to match patterns

### remove
```javascript
matchPattern.remove('*.github.com');
```
- remove `*.github.com` from match patterns
- if `*.github.com` is not in match patterns, do nothing

### match
```javascript
matchPattern.match('https://www.bing.com/'); // false
```
- match `https://www.bing.com/` with match patterns
- returns `false`, if not match pattern is added

## Match Pattern
| Target Hostname |  Valid Match Pattern |
| - | - |
| www.university.org.eu | www.university.org.eu <br> \*.university.org.eu <br> \*.org.eu |
| doc.university.org.eu | doc.university.org.eu <br> doc.university.* <br> doc.university* |
| user.university.org.eu | *.user.university.org.eu <br> \*.university.org.eu <br> \*university.org.eu |
