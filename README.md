# MatchPattern.js

## Usage

| Lastest |
| - | - |
| [matchpattern.js](https://jc3213.github.io/matchpattern.js/matchpattern.js)

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
let match = new MatchPattern();
```

## Properties
- [data](#data)

### data
- `array`
- **read only**
```javascript
let { data } = match;
```

## Method
- [new](#new)
- [add](#add)
- [delete](#delete)
- [clear](#clear)
- [test](#test)

### new
```javascript
match.new(string | string[]);
```

### add
```javascript
match.add(string | string[]);
```

### delete
```javascript
match.delete(string | string[]);
```

### clear
```javascript
match.clear();
```

### test
```javascript
let result = match.test(string);
```

## MatchPattern
- `example.com`
   - Matches `www.example.com`, `example.com`
   - Exclude `test-example.com`, `www.example.com.cn`

| Match Pattern ↓  | www.youtube.com | www.facebook.net | x.com | telegram.org |
|------------------|-----------------|------------------|-------|--------------|
| *                | ✅              | ✅              | ✅   | ✅           |
| youtube.com      | ✅              | ❌              | ❌   | ❌           |
| facebook.com     | ❌              | ✅              | ❌   | ❌           |
| x.com            | ❌              | ❌              | ✅   | ❌           |
| com              | ✅              | ❌              | ✅   | ❌           |
| org              | ❌              | ❌              | ❌   | ✅           |
| youtube          | ❌              | ❌              | ❌   | ❌           |
| telegram         | ❌              | ❌              | ❌   | ❌           |
