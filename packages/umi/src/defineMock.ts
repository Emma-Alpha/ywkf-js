import type { RequestHandler } from '@4399ywkf/bundler-webpack/compiled/express';

type MockDeclare =
  | string
  | number
  | null
  | undefined
  | boolean
  | Record<string, any>
  | RequestHandler;

export function defineMock(mockData: { [key: string]: MockDeclare }) {
  return mockData;
}
