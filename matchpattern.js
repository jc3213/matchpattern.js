class MatchPattern {
    constructor (arg) {
        if (arg) {
            this.new(arg);
        }
    }
    version = '1.0';
    #data = new Set();
    #dataSet = [];
    #global = false;
    get data () {
        return this.#dataSet;
    }
    new (arg) {
        this.#data = new Set(Array.isArray(arg) ? arg : [arg]);
        this.#update();
    }
    add (arg) {
        Array.isArray(arg) ? arg.forEach((i) => this.#data.add(i)) : this.#data.add(arg);
        this.#update();
    }
    delete (arg) {
        Array.isArray(arg) ? arg.forEach((i) => this.#data.delete(i)) : this.#data.delete(arg);
        this.#update();
    }
    clear () {
        this.#data.clear();
        this.#dataSet = [];
        this.#global = false;
    }
    test (host) {
        return this.#global || this.#data.has(host) || this.#dataSet.some((i) => host.endsWith(`.${i}`));
    }
    #update () {
        this.#dataSet = [...this.#data];
        this.#global = this.#data.has('*');
    }
}
