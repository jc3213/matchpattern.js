class MatchPattern {
    constructor (args) {
        this.list = Array.isArray(args) ? args : [];
        this.rule = {};
        this.list.forEach((rule) => this.rule[rule] = true);
        this.make();
    }
    add (rule) {
        if (this.rule[rule]) { return; }
        this.rule[rule] = true;
        this.list.push(rule);
        this.make();
    }
    remove (rule) {
        if (!this.rule[rule]) { return; }
        this.list.splice(this.list.indexOf(rule), 1);
        delete this.rule[rule];
        this.make();
    }
    make () {
        this.regexp = this.list.length === 0 ? /!/ : new RegExp('^(' + this.list.join('|').replace(/\./g, '\\.').replace(/\\?\.?\*\\?\.?/g, '.*') + ')$');
        this.result = {};
    }
    match (url) {
        let host = new URL(url).hostname;
        if (host in this.result) { return this.result[host]; }
        return this.result[host] = this.regexp.test(host);
    }
}
