import 'reflect-metadata';
interface ConfigAdaptor {
    type: string;
    adaptor: (value: any, required?: boolean | undefined, message?: string | undefined) => any;
}
declare function config(confs: ConfigAdaptor | Array<ConfigAdaptor>): void;
/**
 *
 * @Converter()
 * method(param: any) {
 *
 * }
 */
declare function converter(): (target: any, propertyKey: any, descriptor: any) => void;
declare namespace converter {
    var config: typeof config;
}
export default converter;
