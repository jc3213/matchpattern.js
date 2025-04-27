(() => {
    const version = '0.3';

    const caches = {};

    const tlds = {
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

    const make = (string) => {
        let result = caches[string];
        if (result) {
            return result;
        }
        let test = string.match(/^(?:https?|ftps?|wss?)?:?(?:\/\/)?((?:[^./:]+\.)+[^./:]+):?(?:\d+)?\/?(?:[^\/]+\/?)*$/);
        if (!test) {
            throw new Error('"' + string + '" is either not a URL, or a valid MatchPattern');
        }
        let host = test[1];
        if (caches[host]) {
            return caches[host];
        }
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9]?)[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])/.test(host)) {
            return caches[string] = caches[host] = host.replace(/\d+\.\d+$/, '*');
        }
        let [_, sbd, sld, tld] = host.match(/(?:([^.]+)\.)?([^.]+)\.([^.]+)$/);
        return caches[string] = caches[host] = '*.' + (sbd && tlds[sld] ? sbd + '.' : '') + sld + '.' + tld;
    };

    const text = (array) => {
        if (array.length === 0) {
            return '';
        }
        if (array.includes('*') {
            return '.*';
        }
        return array.join('|').replace(/\./g, '\\.').replace(/\*\\\./g, '([^.]+\\.)*').replace(/\\\.\*/g, '(\\.[^.]+)*') + ')$';
    };

    const regexp = (array) => {
        let result = text(array);
        return result ? new RegExp(text) : /!/;
    };

    const pac_script = (array, proxy) => {
        let result = text(array);
        return 'function FindProxyForURL(url, host) {\n    if (/' + result + '/i.test(host)) {\n        return "' + proxy + '";\n    }\n    return "DIRECT";\n}';
    };

    self.MatchPattern = { make, text, regexp, pac_script, version };
})();
