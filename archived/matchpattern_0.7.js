class MatchPattern {
    constructor () {
        MatchPattern.instances.push(this);
    }
    version = '0.7';
    data = new Set();
    #text = '';
    #regexp = /!/;
    #pacScript = '';
    #proxy = 'DIRECT';
    add (arg) {
        [arg].flat().forEach((arg) => this.data.add(arg));
        MatchPattern.convert(this);
    }
    remove (arg) {
        [arg].flat().forEach((arg) => this.data.delete(arg));
        MatchPattern.convert(this);
    }
    clear () {
        this.data.clear();
        this.#text = '';
        this.#regexp = /!/;
    }
    test (host) {
        return this.#regexp.test(host);
    }
    set proxy (proxy) {
        this.#proxy = /^(SOCKS5?|HTTPS?) ([^.]+\.)+[^.:]+:\d+$/.test(proxy) ? proxy : 'DIRECT';
        MatchPattern.pacScript(this);
    }
    get proxy () {
        return this.#proxy;
    }
    get pas_script () {
        return 'function FindProxyForURL(url, host) {\n' + this.#pacScript + '\n    return "DIRECT";\n}'
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
    static make (url) {
        let { caches, tlds } = MatchPattern;
        let result = caches.get(url);
        if (result) {
            return result;
        }
        let host = url.match(/^(?:(?:http|ftp|ws)s?:\/\/)?(([^./:]+\.)+[^./:]+)(?::\d+)?\/?/)?.[1];
        if (!host) {
            throw new Error('"' + url + '" is either not a URL, or a valid MatchPattern');
        }
        result = caches.get(host);
        if (result) {
            return result;
        }
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9]?)[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])/.test(host)) {
            result = host.replace(/\d+\.\d+$/, '*');
        } else {
            let [, sbd, sld, tld] = host.match(/(?:([^.]+)\.)?([^.]+)\.([^.]+)$/);
            result = '*.' + (sbd && tlds[sld] ? sbd + '.' : '') + sld + '.' + tld;
        }
        caches.set(url, result);
        caches.set(host, result);
        return result;
    }
    static convert (that) {
        let {data, proxy} = that;
        that.#text = data.size === 0 ? '' : data.has('*') ? '.*' : '^(' + [...data].join('|').replace(/\./g, '\\.').replace(/\*\\\./g, '([^.]+\\.)*').replace(/\\\.\*/g, '(\\.[^.]+)*') + ')$';
        that.#regexp = new RegExp(that.#text || '!');
        MatchPattern.pacScript(that);
    }
    static pacScript (that) {
        that.#pacScript = that.#text && that.#proxy !== 'DIRECT' ? '    if (/' + that.#text + '/i.test(host)) {\n        return "' + that.#proxy + '";\n    }' : ''
    }
    static erase (arg) {
        let removed = new Set([arg].flat());
        MatchPattern.instances = MatchPattern.instances.filter((that) => !removed.has(that.proxy));
    }
    static merge () {
        let text = [];
        let pac = [];
        MatchPattern.instances.forEach((that) => {
            if (that.#text && that.#pacScript) {
                text.push(that.#text);
                pac.push(that.#pacScript);
            }
        });
        let regexp = text.length === 0 ? /!/ : new RegExp('(' + text.join('|') + ')');
        let pac_script = 'function FindProxyForURL(url, host) {\n' + pac.join('\n') + '\n    return "DIRECT";\n}';
        return { regexp , pac_script };
    }
};
