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
- require `0.4~`
- read only
```javascript
let { data } = match;
```

### pac_script
- require `0.4~`
- read only
```javascript
let { pac_script } = match;
```

## Method
- [add](#add)
- [delete](#delete)
- [clear](#clear)
- [test](#test)

### add
- require `0.4~`
```javascript
let rule = MatchPattern.make('www.example.com'); // *.example.com
match.add(rule);
```

### delete
- require `0.4~`
```javascript
match.delete('*.example.com');
```

### clear
- require `0.4~`
```javascript
match.clear();
```

### test
- require `0.4~`
```javascript
match.add('*.example.com');
match.test('test.example.com'); // true;
```

## Static Properties
- [caches](#caches)
- [storage](#storage)

### caches
- require `1.0~`
- **readonly**
```javascript
let { caches } = MatchPattern;
```

### storage
- require `1.0~`
- require [**storage.js**](https://jc3213.github.io/storage.js/)
- **readonly**
```javascript
let { storage } = MatchPattern;
```

## Static Method
- [fetch](#fetch)
- [make](#make)
- [delete](#delete)
- [combine](#combine)

### fetch
- require `0.9~`
- require [**storage.js**](https://jc3213.github.io/storage.js/)
```javascript
await MatchPattern.fetch();
let result = MatchPattern.make('www.example.com'); // *.example.com
```

### make
- require `0.2~`
```javascript
let result = MatchPattern.make('www.microsoft.com'); // *.microsoft.com
```

### delete
- require `0.5~`
```javascript
MatchPattern.delete('SOCKS 127.0.0.1:1080');
MatchPattern.delete( ['SOCKS 127.0.0.1:1080', 'HTTPS 127.0.0.1:6780'] );
```

### combine
- require `0.5~`
```javascript
let { regexp, pac_script } = MatchPattern.combine();
```

## MatchPattern
- `*.example.com`
   - Matches `www.example.com`, `example.com`
   - Doesn't Match `test-example.com`, `www.example.com.cn`
- `example.*`
   - Matches `example.com`, `example.co.uk`
   - Doesen't Match `www.example.com`, `example-test.com`

| Match Pattern | Target Hostname |
| :-: | :-: |
| \<all-urls\> | All hostnames |
| www.university.org.eu <br> \*.university.org.eu <br> \*.org.eu | www.university.org.eu |
| doc.university.org.eu <br> doc.university.org.* <br> doc.university.* | doc.university.org.eu |
| 192.168.1.\* <br> 192.168.\* <br> 192.\* | 192.168.1.1 |
