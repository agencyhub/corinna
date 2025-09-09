declare module 'clsx' {
  export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

  export function clsx(...inputs: ClassValue[]): string;
  export { clsx as default };
}
