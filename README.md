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
- [pattern](#pattern)
    - `string`
- url
    - `string`
    - `https://www.example.com/pathname`
    - `www.example.com`
    - `*.example.com`

#### pattern
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

### generate
```javascript
let { regexp, string } = MatchPattern.generate( [ patternA, patternB, ..., patternZ ] );
```
- [regexp](#regexp)
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
