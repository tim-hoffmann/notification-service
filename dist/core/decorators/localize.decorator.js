"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Localize = void 0;
const LOCALE_FIELDS = 'LOCALE_FIELDS';
const Localize = () => (target, propertyKey) => {
    const fields = Reflect.getMetadata(LOCALE_FIELDS, target);
    Reflect.defineMetadata(LOCALE_FIELDS, [...fields, propertyKey], target);
};
exports.Localize = Localize;
//# sourceMappingURL=localize.decorator.js.map