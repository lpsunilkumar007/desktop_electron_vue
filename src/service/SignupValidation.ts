import Validations from './Validation';

export default class SignupValidations {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    checkValidations(): { [key: string]: string } {
        let errors: { [key: string]: string } = {};

        // Email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        // Password validations
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'Password should be of 6 characters';
        }

        return errors;
    }

    static getErrorMessageFromCode(errorCode: string): string {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            default:
                return 'Unexpected error occurred. Please try again';
        }
    }
}
