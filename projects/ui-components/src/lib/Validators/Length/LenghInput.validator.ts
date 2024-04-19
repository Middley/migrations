import { AbstractControl, ValidatorFn } from "@angular/forms";

export function customLengthValidator(allowedLengths: number[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;

        // Validar si la longitud está en el array de longitudes permitidas
        if (value && allowedLengths.includes(value.length)) {
            return null;  // La longitud es válida
        } else {
            return { 'customLength': true };  // La longitud no es válida
        }
    };
}