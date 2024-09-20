class MatchPattern {
    version: '0.1';
    cache = {};
    list = [];
    result = {};
    matchpattern = /!/;
    tlds = {
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
    make (host) {
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9]?)[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])/.test(host)) { return host.replace(/\d+\.\d+$/, '*'); }
        let [full, sbd, sld, tld] = host.match(/(?:([^\.]+)\.)?([^\.]+)\.([^\.]+)$/);
        if (!sbd || !this.tlds[sld]) { return '*.' + sld + '.' + tld; }
        return '*.' + sbd + '.' + sld + '.' + tld;
    }
    add (...hosts) {
        hosts.flat().forEach((host) => {
            if (this.cache[host]) { return; }
            let rule = this.make(host);
            this.cache[host] = rule;
            this.list.push(rule);
            console.log(rule);
        });
        this.regexp();
    }
    remove (...hosts) {
        hosts.flat().forEach((host) => {
            let rule = this.cache[host];
            if (!rule) { return; }
            this.list.splice(this.list.indexOf(rule), 1);
            delete this.cache[host];
        });
        this.regexp();
    }
    regexp () {
        let trim = [...new Set(this.list)];
        this.matchpattern = this.list.length === 0 ? /!/ : new RegExp('^(' + trim.join('|').replace(/\./g, '\\.').replace(/\\?\.?\*\\?\.?/g, '.*') + ')$');
        this.result = {};
    }
    match (host) {
        return this.result[host] ??= this.matchpattern.test(host);
    }
}
