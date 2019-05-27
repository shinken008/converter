/**
 * parameter decorator
 * 1.Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
 * 2.The name of the member.
 * 3.The ordinal index of the parameter in the function’s parameter list.
 */
import 'reflect-metadata';
declare function Convert(config: any): (target: any, propertyKey: any, parameterIndex: any) => void;
export default Convert;
