const LOCALE_FIELDS = 'LOCALE_FIELDS';

export const Localize = () => (target: any, propertyKey: string) => {
  // Get already added locale fields
  const fields = Reflect.getMetadata(LOCALE_FIELDS, target);

  // Merge and add new field
  Reflect.defineMetadata(LOCALE_FIELDS, [...fields, propertyKey], target);
};
