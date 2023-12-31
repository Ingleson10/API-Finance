import IncorrectType from '../errors/IncorrectType';
import RequiredProperty from '../errors/RequiredProperty';

export default class TransactionType {
  public constructor(public readonly type: string) {}

  static isValid(type: string): boolean | IncorrectType | RequiredProperty {
    const validTypes = ['income', 'outcome'];
    if (validTypes.includes(type.toLowerCase())) return true;
    return new IncorrectType();
  }

  static create(
    type: string,
  ): IncorrectType | RequiredProperty | TransactionType {
    const validOrError = this.isValid(type);
    if (validOrError instanceof Error) return validOrError;
    return new TransactionType(type);
  }
}
