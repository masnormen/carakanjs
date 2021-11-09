import { preferNative as matchAll } from "string-match-all";
import { CarakanConst, JavaneseChar } from "../constants/constants";

/**
 * @description Provides many helper function to get Javanese unicode characters
 */
namespace CarakanHelper {
  /**
   * @description Returns true if the input is a digit number
   * @param str The string to be checked
   */
  export const isDigit = (str: string): boolean => {
    return RegExp(CarakanConst.REGEX.DIGITS, "g").test(str);
  };

  /**
   * @description Returns true if the input is a space
   * @param str The string to be checked
   */
  export const isSpace = (str: string): boolean => {
    return RegExp(CarakanConst.REGEX.SPACE, "g").test(str);
  };

  /**
   * @description Returns the corresponding initial consonant character
   * @param char The character to be converted
   */
  export const getInitial = (char: string): string => {
    if (char == null) return "";
    if (char in JavaneseChar.SWARA) return JavaneseChar.SWARA[char];
    if (char in JavaneseChar.NGLEGENA) return JavaneseChar.NGLEGENA[char];
    return char;
  };

  /**
   * @description Returns the corresponding sonorant consonant character
   * @param char The character to be converted
   */
  export const getSonorant = (char: string): string => {
    if (char == null) return "";
    if (char === "r") return JavaneseChar.SANDHANGAN["cakra"];
    if (char === "y") return JavaneseChar.SANDHANGAN["pengkal"];
    if (char === "rx") return JavaneseChar.SANDHANGAN["keret"];
    if (char in JavaneseChar.PASANGAN) return JavaneseChar.PASANGAN[char];
    return char;
  };

  /**
   * @description Returns the corresponding vowel character
   * @param char The character to be converted
   */
  export const getVowel = (char: string): string => {
    if (char == null) return "";
    switch (char.toLowerCase()) {
      case "a":
        return "";
      case "i":
        return JavaneseChar.SANDHANGAN["wulu"];
      case "u":
        return JavaneseChar.SANDHANGAN["suku"];
      case "é":
      case "è":
      case "e":
        return JavaneseChar.SANDHANGAN["taling"];
      case "o":
        return JavaneseChar.SANDHANGAN["talingTarung"];
      case "ə":
      case "x":
        return JavaneseChar.SANDHANGAN["pepet"];
    }
    return char;
  };

  /**
   * @description Returns the corresponding final character
   * @param char The character to be converted
   */
  export const getFinal = (char: string): string => {
    if (char == null) return "";
    if (char === "r") return JavaneseChar.SANDHANGAN["layar"];
    if (char === "h") return JavaneseChar.SANDHANGAN["wignyan"];
    if (char === "ng") return JavaneseChar.SANDHANGAN["cecak"];
    if (char === "pangkon") return JavaneseChar.SANDHANGAN["pangkon"];
    return JavaneseChar.PASANGAN[char];
  };

  /**
   * @description Returns the corresponding punctuation character
   * @param char The character to be converted
   */
  export const getPunctuation = (char: string): string => {
    if (char == null) return "";
    switch (char) {
      case ",":
        return JavaneseChar.PADA["lingsa"];
      case ".":
        return JavaneseChar.PADA["lungsi"];
      case ":":
        return JavaneseChar.PADA["pangkat"];
      case "(":
      case ")":
      case "'":
      case "\"":
        return JavaneseChar.PADA["adeg"];
      case "|":
        return JavaneseChar.PADA["adegadeg"];
      case "<":
        return JavaneseChar.PADA["piseleh"];
      case ">":
        return JavaneseChar.PADA["piselehwalik"];
      case "{":
        return JavaneseChar.PADA["rerenggankiwa"];
      case "}":
        return JavaneseChar.PADA["rerenggantengen"];
    }
    return char;
  };

  /**
   * @description Returns the corresponding Javanese number character
   * @param char The character to be converted
   */
  export const getNumber = (char: string): string => {
    if (char == null) return "";
    if (char in JavaneseChar.ANGKA) return JavaneseChar.ANGKA[char];
    return "";
  };

  /**
   * @description Returns the corresponding miscellaneous character
   * @param char The character to be converted
   */
  export const getMisc = (char: string): string => {
    if (char == null) return "";
    if (char in JavaneseChar.MISC) return JavaneseChar.MISC[char];
    return "";
  };

  /**
   * @description Returns the consonant from residue
   * @param residue The residue string
   * @param onlyLast If true, only the last consonant will be returned
   */
  export const returnResidue = (residue: string): string => {
    const groups = [...matchAll(residue, RegExp(CarakanConst.REGEX.CAPTURE_RESIDUE, "g"))]?.[0];
    if (groups == null) return "";
    if (groups[3] == null) {
      return getInitial(groups[1]) + getFinal("pangkon");
    } else {
      return getInitial(groups[1]) + getSonorant(groups[2]) + getVowel(groups[3]);
    }
  };

  /**
   * @description Remove accents from Latin text and standardize input for Carakan
   * @param text The text to be normalized
   */
  export const normalizeAccents = (text: string): string => {
    const pattern = new RegExp(Object.keys(CarakanConst.ACCENTS_MAP).join("|"), "g");
    return text.replace(pattern, (matched) => {
      if (matched === "E") matched = "E(?!`)";
      if (matched === "e") matched = "e(?!`)";
      return CarakanConst.ACCENTS_MAP[matched];
    });
  };
}

export default CarakanHelper;
