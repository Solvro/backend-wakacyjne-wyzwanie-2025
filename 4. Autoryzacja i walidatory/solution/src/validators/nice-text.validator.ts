import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({name: 'niceText', async: false})
export class NiceText implements ValidatorConstraintInterface {
    validate(text: string, _: ValidationArguments) {
        return !text.includes("loser");
    }

    defaultMessage(_: ValidationArguments) {
        return "That's not a nice text, is it?";
    }
}