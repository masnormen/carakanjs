import { LatinChars } from "../constants/constants";

/**
 * @description Provides many helper function to get Latin characters from Sundanese characters
 */
namespace LatinHelper {
  /**
   * @description Returns the corresponding Ngalagena and Swara character
   * @param char The character to be transliterated
   */
  export const getLetter = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.SWARA) return LatinChars.SWARA[char];
    if (char in LatinChars.NGLEGENA) return LatinChars.NGLEGENA[char];
    return char;
  };

  /**
   * @description Returns the corresponding sonorant pasangan character
   * @param char The character to be transliterated
   */
  export const getPasangan = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.PASANGAN) return LatinChars.PASANGAN[char];
    return char;
  };

  export const getSandhangan = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.SANDHANGAN) return LatinChars.SANDHANGAN[char];
    return char;
  };

  export const getConsonantSign = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.CONSONANT_SIGN) return LatinChars.CONSONANT_SIGN[char];
    return char;
  };

  /**
   * @description Returns the corresponding pada character
   * @param char The character to be transliterated
   */
  export const getPada = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.PADA) return LatinChars.PADA[char];
    return char;
  };

  /**
   * @description Returns the corresponding Latin number character
   * @param char The character to be transliterated
   */
  export const getNumber = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.ANGKA) return LatinChars.ANGKA[char];
    return char;
  };

  /**
   * @description Returns the corresponding Miscellaneous character
   * @param char The character to be transliterated
   */
  export const getMisc = (char: string): string => {
    if (char == null) return "";
    if (char in LatinChars.MISC) return LatinChars.MISC[char];
    return char;
  };
}

export default LatinHelper;