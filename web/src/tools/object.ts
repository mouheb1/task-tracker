// -- ./src/tools/object.ts

export function cleanObject<T extends object>(obj: T): Partial<T> {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key as keyof T];
      if (value !== null && value !== undefined) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  }