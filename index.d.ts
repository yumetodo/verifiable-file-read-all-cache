export = TextCache;

declare class TextCache {
    constructor(path: string, sha256hash: string);
    async myMethod(): Promise<string>;
    async verify(tester:(actual: string, expected: string) => any): Promise<void>
}
