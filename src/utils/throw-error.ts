export function throwError(msg: string): never {
  alert(msg);
  throw new Error(msg);
}

export function assertNull(test: any, variableName: string, msg?: string): void | never {
  if (test === null)
    if (msg === undefined) throwError(`${variableName} can not be null`);
    else throwError(msg);
}

export function assertUndefined(test: any, variableName: string, msg?: string): void | never {
  if (test === undefined)
    if (msg === undefined) throwError(`${variableName} can not be undefined`);
    else throwError(msg);
}