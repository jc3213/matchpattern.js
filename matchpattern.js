class MatchPattern {
    #data = new Set();
    #empty = true;
    #global = false;

    constructor(arg) {
        if (arg) {
            this.new(arg);
        }
    }

    get data() {
        return [...this.#data];
    }

    #update() {
        this.#empty = this.#data.size === 0;
        this.#global = this.#data.has('*');
    }

    new(arg) {
        this.#data = new Set(Array.isArray(arg) ? arg : [arg]);
        this.#update();
    }

    add(arg) {
        Array.isArray(arg) ? arg.forEach((i) => this.#data.add(i)) : this.#data.add(arg);
        this.#update();
    }

    delete(arg) {
        Array.isArray(arg) ? arg.forEach((i) => this.#data.delete(i)) : this.#data.delete(arg);
        this.#update();
    }

    clear() {
        this.#data = new Set();
        this.#empty = true;
        this.#global = false;
    }

    test(arg) {
        if (this.#empty) {
            return false;
        }
        if (this.#global) {
            return true;
        }
        while (true) {
            if (this.#data.has(arg)) {
                return true;
            }
            let dot = arg.indexOf('.');
            if (dot < 0) {
                break;
            }
            arg = arg.substring(dot + 1);
        }
        return false;
    }
}
