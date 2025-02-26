declare module 'bcryptjs' {
  export function genSalt(rounds?: number): Promise<string>;
  export function hash(data: string | Buffer, salt: string | number): Promise<string>;
  export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
  export function getRounds(encrypted: string): number;
  
  export function genSaltSync(rounds?: number): string;
  export function hashSync(data: string | Buffer, salt: string | number): string;
  export function compareSync(data: string | Buffer, encrypted: string): boolean;
  export function getRoundsSync(encrypted: string): number;
} 