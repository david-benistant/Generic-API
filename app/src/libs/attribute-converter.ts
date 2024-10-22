import { AttributeValue } from '@aws-sdk/client-dynamodb';

export function toAttribute<T>(variable: T): AttributeValue {
  return variable as unknown as AttributeValue;
}

export function attrToString(v: AttributeValue): string {
  return v as unknown as string;
}

export function attrToNumber(v: AttributeValue): number {
  return v as unknown as number;
}
