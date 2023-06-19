export function camelCaseToNormalText(name: string) {
  const result = name
    .trimStart()
    .trimEnd()
    .replace(/([A-Z])/g, " $1");
  const finalResult =
    result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();

  return finalResult;
}
