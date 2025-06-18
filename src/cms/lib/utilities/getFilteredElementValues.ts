export default function getFilteredElementValues<T extends object>(input: T): Partial<T> {
  const result: Partial<T> = {};
  Object.entries(input).forEach(([key, value]) => {
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (!isEmpty) {
      result[key as keyof T] = value;
    }
  });
  return result;
}