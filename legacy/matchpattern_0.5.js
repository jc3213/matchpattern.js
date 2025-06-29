class MatchPattern {
    constructor () {
        this.proxy = 'DIRECT';
        this.clear();
        MatchPattern.instances.push(this);
    }
    version = '0.5';
    add (arg) {
        [arg].flat().forEach((i) => {
            if (!this.data.includes(i)) {
                this.data.push(i);
            }
        });
        this.text = MatchPattern.stringnify(this.data);
        this.regexp = new RegExp(this.text);
    }
    delete (arg) {
        [arg].flat().forEach((i) => {
            let index = this.data.indexOf(i);
            if (index !== -1) {
                this.data.splice(index, 1);
            }
        });
        this.text = MatchPattern.stringnify(this.data);
        this.regexp = new RegExp(this.text);
    }
    clear () {
        this.data = [];
        this.text = '!';
        this.regexp = /!/;
    }
    test (host) {
        return this.regexp.test(host);
    }
    get pac_script () {
        return 'function FindProxyForURL(url, host) {\n    if (/' + this.text + '/i.test(host)) {\n        return "' + this.proxy + '";\n    }\n    return "DIRECT";\n}';
    }
    static instances = [];
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
    static make (host) {
        let result = MatchPattern.caches[host];
        if (MatchPattern.caches[host]) {
            return MatchPattern.caches[host];
        }
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9]?)[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])/.test(host)) {
            return MatchPattern.caches[host] = host.replace(/\d+\.\d+$/, '*');
        }
        let [_, sbd, sld, tld] = host.match(/(?:([^.]+)\.)?([^.]+)\.([^.]+)$/);
        return MatchPattern.caches[host] = '*.' + (sbd && MatchPattern.tlds[sld] ? sbd + '.' : '') + sld + '.' + tld;
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
    static delete (...args) {
        let proxy = args.flat();
        MatchPattern.instances = MatchPattern.instances.filter((instance) => !proxy.includes(instance.proxy));
    }
    static combine () {
        if (MatchPattern.instances.length === 0) {
            return {regexp: /!/, pac_script: 'function FindProxyForURL(url, host) {\n    return "DIRECT";\n}'};
        }
        let text = [];
        let pac = [];
        MatchPattern.instances.forEach((instance) => {
            text.push(instance.text);
            pac.push('\n    if (/' + instance.text + '/i.test(host)) {\n        return "' + instance.proxy + '";\n    }');
        });
        let regexp = new RegExp('(' + text.join('|') + ')');
        let pac_script = 'function FindProxyForURL(url, host) {' + pac.join('') + '\n    return "DIRECT";\n}';
        return { regexp , pac_script };
    }
}
