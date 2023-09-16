export declare class SyllableBuilder {
    matchGroups: RegExpMatchArray;
    residue: string;
    input: string;
    isLastOfInput: boolean;
    nonLetter: string;
    preMain: string;
    main: string;
    sonorant: string;
    afterSonorant: string;
    vowel: string;
    final: string;
    postFinal: string;
    constructor(matchGroups: RegExpMatchArray, residue: string, input: string, isLastOfInput: boolean);
    build(useResidue?: boolean): string;
}
export declare class LatinBuilder {
    result: string;
    constructor();
    add(input: string): void;
    build(input?: string): string;
}
//# sourceMappingURL=SyllableBuilder.d.ts.map