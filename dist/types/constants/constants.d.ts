declare type CharacterMapping = {
    [char: string]: string;
};
declare namespace CarakanConst {
    const LATIN: {
        CONSONANTS: string;
        CONSONANTS_PANYIGEG: string;
        CONSONANTS_MURDA: string;
        CONSONANTS_UPPERCASE_WITHOUT_MURDA: string;
        CONSONANTS_WITHOUT_PANYIGEG: string;
        DIGITS: string;
        DIGITS_PUNC: string;
        DOT_COMMA: string;
        SPACE: string;
        VOWELS: string;
        VOWELS_SWARA: string;
        EXCEPT_SWARA: string;
        CAPTURE_RESIDUE: string;
    };
    const CARAKAN: {
        ANGKA: string;
        NGLEGENA: string;
        CECAK_TELU: string;
        SANDHANGAN_FINAL: string;
        SWARA: string;
        SANDHANGAN: string;
        CONSONANT_SIGN: string;
        PANGKON: string;
        PADA: string;
        PANGKAT: string;
    };
    const REGEX: {
        CAPTURE_LATIN: string;
        CAPTURE_CARAKAN: string;
    };
}
declare const LatinConst: Record<string, Record<string, string>>;
declare namespace CarakanChars {
    const NGLEGENA: CharacterMapping;
    const SWARA: CharacterMapping;
    const PASANGAN: CharacterMapping;
    const SANDHANGAN: CharacterMapping;
    const PADA: CharacterMapping;
    const ANGKA: CharacterMapping;
    const MISC: CharacterMapping;
}
declare namespace LatinChars {
    const SWARA: CharacterMapping;
    const NGLEGENA: CharacterMapping;
    const PASANGAN: CharacterMapping;
    const SANDHANGAN: CharacterMapping;
    const CONSONANT_SIGN: CharacterMapping;
    const PADA: CharacterMapping;
    const ANGKA: CharacterMapping;
    const MISC: CharacterMapping;
}
export { CarakanChars, CarakanConst, LatinConst, LatinChars };
//# sourceMappingURL=constants.d.ts.map