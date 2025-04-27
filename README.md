# matchpattern.js

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
let match = new MatchPattern(); // requires v0.4~
match.proxy = 'SOCKS 127.0.0.1:1080';
```

## Method
- [add](#add)
- [remove](#remove)
- [clear](#clear)
- [test](#test)
- [make](#make)
- [delete](#delete)
- [combine](#combine)

### add
```javascript
let rule = MatchPattern.make('www.example.com'); // *.example.com
match.add(rule);
```

### remove
```javascript
match.remove('*.example.com');
```

### clear
```javascript
match.clear();
```

### test
```javascript
match.add('*.example.com');
match.test('test.example.com'); // true;
```

### make
```javascript
let result = MatchPattern.make('www.microsoft.com'); // *.microsoft.com
```

### delete
```javascript
MatchPattern.delete('SOCKS 127.0.0.1:1080');
MatchPattern.delete( ['SOCKS 127.0.0.1:1080', 'HTTPS 127.0.0.1:6780'] );
```

### combine
```javascript
let result = MatchPattern.combine();
let regexp = result.regexp;
let pac_script = result.pac_script;
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
