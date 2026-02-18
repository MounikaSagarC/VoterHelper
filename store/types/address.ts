// types/address.ts
export type Id = string;

export type Option = {
  label: string;
  value: Id;
};

export type ZipCodeMap = Record<string, number[]>;
