class MatchPattern {
    constructor () {
        MatchPattern.instances.push(this);
    }
    version = '0.6';
    dataset = new Set();
    text = '';
    regexp = /!/;
    proxy = 'DIRECT';
    add (arg) {
        [arg].flat().forEach((i) => this.dataset.add(i));
        MatchPattern.update(this);
    }
    delete (arg) {
        [arg].flat().forEach((i) => this.dataset.delete(i));
        MatchPattern.update(this);
    }
    clear () {
        this.dataset.clear();
        MatchPattern.update(this);
    }
    test (host) {
        return this.regexp.test(host);
    }
    get data () {
        return [...this.dataset];
    }
    get pac_script () {
        let result = this.text && /^(SOCKS5?|HTTPS?) ([^.]+\.)+[^.:]+:\d+$/.test(this.proxy) ? '    if (/' + this.text + '/i.test(host)) {\n        return "' + this.proxy + '";\n    }\n' : '';
        return 'function FindProxyForURL(url, host) {\n' + result + '    return "DIRECT";\n}';
    }
    static instances = [];
    static caches = new Map();
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
        let { caches, tlds } = MatchPattern;
        let result = caches.get(host);
        if (result) {
            return result;
        }
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9]?)[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])/.test(host)) {
            result = host.replace(/\d+\.\d+$/, '*');
        } else {
            let [, sbd, sld, tld] = host.match(/(?:([^.]+)\.)?([^.]+)\.([^.]+)$/);
            result = '*.' + (sbd && tlds[sld] ? sbd + '.' : '') + sld + '.' + tld;
        }
        caches.set(host, result);
        return result;
    }
    static update (instance) {
        let data = instance.dataset;
        instance.text = data.size === 0 ? '' : data.has('*') ? '.*' : '^(' + [...data].join('|').replace(/\./g, '\\.').replace(/\*\\\./g, '([^.]+\\.)*').replace(/\\\.\*/g, '(\\.[^.]+)*') + ')$';
        instance.regexp = new RegExp(instance.text || '!');
    }
    static delete (arg) {
        let removed = new Set([arg].flat());
        MatchPattern.instances = MatchPattern.instances.filter((instance) => !removed.has(instance.proxy));
    }
    static combine () {
        let text = [];
        let pac = [];
        MatchPattern.instances.forEach((instance) => {
            if (instance.text && /^(SOCKS5?|HTTPS?) ([^.]+\.)+[^.:]+:\d+$/.test(instance.proxy)) {
                text.push(instance.text);
                pac.push('\n    if (/' + instance.text + '/i.test(host)) {\n        return "' + instance.proxy + '";\n    }');
            }
        });
        let regexp = text.length === 0 ? /!/ : new RegExp('(' + text.join('|') + ')');
        let pac_script = 'function FindProxyForURL(url, host) {' + pac.join('') + '\n    return "DIRECT";\n}';
        return { regexp , pac_script };
    }
}
