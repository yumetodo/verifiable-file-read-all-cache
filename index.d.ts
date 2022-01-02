export = TextCache;

declare class TextCache {
  constructor(path: string, sha256hash: string);
  get(): Promise<string>;
  verify(tester: (actual: string, expected: string) => any): Promise<void>;
}
