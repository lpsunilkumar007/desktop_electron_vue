export default class Validations {
    static checkEmail(email: string): boolean {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }
        return false;
    }

    static minLength(name: string, minLength: number): boolean {
        if (name.length < minLength) {
            return false;
        }
        return true;
    }
}
