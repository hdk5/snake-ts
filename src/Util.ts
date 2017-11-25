export default class Util {
    static mod(divident: number, divisor: number): number {
        return ((divident % divisor) + divisor) % divisor;
    };

    static choice<T>(arr: Array<T>): T {
        return arr[Math.floor(Math.random() * arr.length)] || null;
    }

    static arrayClone<T extends { clone: () => T }>(arr: Array<T>): Array<T> {
        let clone: Array<T> = [];
        for (let obj of arr) {
            clone.push(obj.clone());
        }
        return clone;
    }

    static arrayContains<T extends { equals: (o: T) => boolean }>(arr: Array<T>, el: T): boolean {
        for (let obj of arr) {
            if (obj.equals(el))
                return true;
        }
        return false;
    }

    static isPlainObject(obj: any) {
        return typeof obj === 'object'
            && obj !== null
            && obj.constructor === Object
            && Object.prototype.toString.call(obj) === '[object Object]';
    }


}