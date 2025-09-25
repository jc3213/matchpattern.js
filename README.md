# matchpattern.js

## Usage

| Lastest | Extension |
| - | - |
| [matchpattern.js](https://jc3213.github.io/matchpattern.js/matchpattern.js) | [Easy Proxy](https://github.com/jc3213/easy_proxy) |

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
let match = new MatchPattern(); // requires v0.4~
match.proxy = 'SOCKS 127.0.0.1:1080';
```

## Properties
- [data](#data)
- [pac_script](#pac_script)

### data
- `array`
- **read only**
```javascript
let { data } = match;
```

### pac_script
- `string`
- **read only**
```javascript
let { pac_script } = match;
```

## Method
- [new](#new)
- [add](#add)
- [delete](#delete)
- [clear](#clear)
- [test](#test)

### new
```javascript
match.new(string[]);
```

### add
```javascript
match.add(string | string[]);
```

### delete
- require `0.4~`
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

## Static Properties
- [caches](#caches)

### caches
- `Map` instance
- **readonly**
```javascript
let { caches } = MatchPattern;
```

## Static Method
- [test](#test-2)
- [make](#make)
- [delete](#delete)

### test
```javascript
let result = MatchPattern.test(host);
```

### make
```javascript
let rule = MatchPattern.make(string);
```

### delete
```javascript
MatchPattern.delete(string | string[]);
```


## MatchPattern
- `example.com`
   - Matches `www.example.com`, `example.com`
   - Doesn't Match `test-example.com`, `www.example.com.cn`

| Match Pattern | Target Hostname |
| :-: | :-: |
| * | All hostnames |
| www.university.org.eu <br> university.org.eu <br> org.eu <br> eu | www.university.org.eu |
