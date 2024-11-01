class Validate<T> {
    private _field: string;
    private _value: T;

    constructor(field: string, value: T) {
        this._field = field;
        this._value = value;
    }

    get field(): string {
        return this._field;
    }

    get value(): T {
        return this._value;
    }
}

class Validator {
    private _errors: string[] = [];

    get error(): string {
        return this._errors[0];
    }

    /**
     * @function required
     * @description Check if there is a value (0 and false is considered true)
     * @author J. Trpka
     * @param {Validate} validate 
     * @returns {Validator}
     */
    public required(validate: Validate<string | number | boolean>): Validator {
        if(validate.value === '' || validate.value === null || validate.value === undefined){
            this._errors.push(`${validate.field} is required.`);
        }

        return this;
    }

    /**
     * @function hasErrors
     * @description Check if the validator has any errors
     * @author J. Trpka
     * @returns {boolean}
     */
    public hasErrors = (): boolean => this._errors.length > 0;
}