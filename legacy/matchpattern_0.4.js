class MatchPattern {
    constructor () {
        this.clear();
    }
    version = '0.4';
    add (arg) {
        if (!this.data.includes(arg)) {
            this.data.push(arg);
            this.text = MatchPattern.stringnify(this.data);
            this.regexp = new RegExp(this.text);
        }
    }
    delete (arg) {
        let index = this.data.indexOf(arg);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.text = MatchPattern.stringnify(this.data);
            this.regexp = new RegExp(this.text);
        }
    }
    clear () {
        this.data = [];
        this.text = '!';
        this.regexp = /!/;
    }
    test (host) {
        return this.regexp.test(host);
    }
    pac_script (proxy) {
        return 'function FindProxyForURL(url, host) {\n    if (/' + this.text + '/i.test(host)) {\n        return "' + proxy + '";\n    }\n    return "DIRECT";\n}';
    }
    static caches = {};
    static tlds = {
        'aero': true,
        'app': true,
        'arpa': true,
        'asia': true,
        'biz': true,
        'cat': true,
        'co': true,
        'com': true,
        'coop': true,
        'dev': true,
        'edu': true,
        'eu': true,
        'gov': true,
        'info': true,
        'int': true,
        'io': true,
        'jobs': true,
        'ltd': true,
        'ltda': true,
        'mil': true,
        'mobi': true,
        'museum': true,
        'name': true,
        'ne': true,
        'net': true,
        'org': true,
        'post': true,
        'pro': true,
        'si': true,
        'tel': true,
        'test': true,
        'travel': true,
        'web': true,
        'xxx': true,
        'xyz': true
    };
    static make (string) {
        let result = MatchPattern.caches[string];
        if (result) {
            return result;
        }
        let test = string.match(/^(?:https?|ftps?|wss?)?:?(?:\/\/)?((?:[^./:]+\.)+[^./:]+):?(?:\d+)?\/?(?:[^\/]+\/?)*$/);
        if (!test) {
            throw new Error('"' + string + '" is either not a URL, or a valid MatchPattern');
        }
        let host = test[1];
        if (MatchPattern.caches[host]) {
            return MatchPattern.caches[string] = host;
        }
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9]?)[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])/.test(host)) {
            return MatchPattern.caches[string] = MatchPattern.caches[host] = host.replace(/\d+\.\d+$/, '*');
        }
        let [_, sbd, sld, tld] = host.match(/(?:([^.]+)\.)?([^.]+)\.([^.]+)$/);
        return MatchPattern.caches[string] = MatchPattern.caches[host] = '*.' + (sbd && MatchPattern.tlds[sld] ? sbd + '.' : '') + sld + '.' + tld;
    }
    static stringnify (array) {
        if (array.length === 0) {
            return '!';
        }
        if (array.includes('<all-urls>') || array.includes('*')) {
            return '.*';
        }
        return '^(' + array.join('|').replace(/\./g, '\\.').replace(/\*\\\./g, '([^.]+\\.)*').replace(/\\\.\*/g, '(\\.[^.]+)*') + ')$';
    }
}
