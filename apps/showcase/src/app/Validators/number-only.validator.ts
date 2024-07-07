import { AbstractControl, ValidatorFn } from '@angular/forms';

export function positiveIntegerValidator(): ValidatorFn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return null; // Allow empty value
        }

        const isInteger = Number.isInteger(value);
        const isPositive = value > 0;

        if (!isInteger || !isPositive) {
            return { positiveInteger: { value: control.value } };
        }

        return null;
    };
}
