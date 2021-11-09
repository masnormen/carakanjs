declare namespace CarakanHelper {
    const isDigit: (str: string) => boolean;
    const isSpace: (str: string) => boolean;
    const getInitial: (char: string) => string;
    const getSonorant: (char: string) => string;
    const getVowel: (char: string) => string;
    const getFinal: (char: string) => string;
    const getPunctuation: (char: string) => string;
    const getNumber: (char: string) => string;
    const getMisc: (char: string) => string;
    const returnResidue: (residue: string) => string;
    const normalizeAccents: (text: string) => string;
}
export default CarakanHelper;
//# sourceMappingURL=CarakanHelper.d.ts.map