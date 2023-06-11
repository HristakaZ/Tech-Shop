import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validFileExtensionValidator(extension: string | undefined): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let allowedFileExtensions: string[] = ['.jpg', '.jpeg', '.png'];
        if (allowedFileExtensions.find(allowedFileExtension => allowedFileExtension === extension)) {
            return null;
        }

        return { invalidExtension: { value: control.value } };
    }
}