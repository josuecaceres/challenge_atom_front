import { Injectable } from '@angular/core';
import {
  ValidationErrors,
  FormGroup,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  phoneRegex = /^\(\+\d{3}\) \d{4}-\d{4}$/;

  getPhoneRegex(): RegExp {
    return this.phoneRegex;
  }

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(
    form: FormGroup,
    field: string,
    label: string
  ): string | null {
    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${label} es requerido`;
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;
        case 'pattern':
          return `El valor ingresado para ${label} no es válido`;
        case 'invalidDoc':
          return `El valor ingresado está incompleto o mal formado.`;
      }
    }

    return null;
  }

  validateMaskedDocNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      const cleaned = value.replace(/[^0-9]/g, ''); // Quita guiones y guiones bajos
      const hasUnderscore = value.includes('_');

      if (hasUnderscore || cleaned.length !== 13) {
        return { invalidDoc: true };
      }

      return null;
    };
  }

  normalizeFormatField(phone: string): string {
    return phone.replace(/[()\s-]/g, ''); // Elimina caracteres no numéricos
  }

  formatPhone(phone: string): string {
    const regex = /^\+(\d{3})(\d{4})(\d{4})$/;
    const match = phone.match(regex);

    if (!match) {
      return phone;
    }

    // Aplica la máscara al valor
    const countryCode = match[1];
    const firstPart = match[2];
    const secondPart = match[3];

    return `(+${countryCode}) ${firstPart}-${secondPart}`;
  }

  formatDocNumber(docNumber: string): string {
    const digitsOnly = docNumber.replace(/\D/g, ''); // Por si viniera con caracteres
    if (digitsOnly.length !== 13) {
      return docNumber; // Retornar sin formato si no cumple
    }

    const part1 = digitsOnly.slice(0, 4);
    const part2 = digitsOnly.slice(4, 9);
    const part3 = digitsOnly.slice(9, 13);

    return `${part1}-${part2}-${part3}`;
  }

  isEqualsPassword(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwrodsNotEquals: true };
    };
  }
}
