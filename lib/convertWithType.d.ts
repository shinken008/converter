export declare type type = 'number' | 'string' | 'boolean' | 'bigDecimal' | 'long' | 'date';
export declare const convertAdaptorMap: Map<any, any>;
export default function convertWithType(value: any, type: any, required?: boolean, message?: string): any;
