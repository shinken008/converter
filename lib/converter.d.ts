import 'reflect-metadata';
declare function init(customConvertFunc?: (value: any, type: any, required?: boolean | undefined, message?: string | undefined) => any): void;
declare function reset(): void;
/**
 *
 * @Converter()
 * method(param: any) {
 *
 * }
 */
declare function converter(): (target: any, propertyKey: any, descriptor: any) => void;
declare namespace converter {
    var init: typeof init;
    var reset: typeof reset;
}
export default converter;
