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
let match = new MatchPattern();
match.proxy = 'SOCKS 127.0.0.1:1080';
```

## Method
- [add](#add)
- [remove](#remove)
- [clear](#clear)
- [make](#make)
- [merge](#merge)
- [erase](#erase)

### add
```javascript
match.add("*.example.com"); // *.example.com
```

### remove
```javascript
match.remove('*.example.com');
```

### clear
```javascript
match.clear();
```

### make
```javascript
let result = MatchPattern.make('www.microsoft.com'); // *.microsoft.com
```

### merge
```javascript
let merged = MatchPattern.merge();
let regexp = merged.regexp;
let pac_script = merged.pac_script;
```

### erase
```javascript
MatchPattern.erase('SOCKS 127.0.0.1:1080');
MatchPattern.erase( ['SOCKS 127.0.0.1:1080', 'HTTPS 127.0.0.1:6780'] );
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
