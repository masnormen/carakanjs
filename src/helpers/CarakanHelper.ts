import { preferNative as matchAll } from "string-match-all";
import { CarakanConst, CarakanChars, LatinConst } from "../constants/constants";

/**
 * @description Provides many helper function to get Javanese unicode characters
 */
namespace CarakanHelper {
  /**
   * @description Returns true if the input is a digit number
   * @param str The string to be checked
   */
  export const isDigit = (str: string): boolean => {
    return RegExp(CarakanConst.LATIN.DIGITS, "g").test(str);
  };

  /**
   * @description Returns true if the input is a space
   * @param str The string to be checked
   */
  export const isSpace = (str: string): boolean => {
    return RegExp(CarakanConst.LATIN.SPACE, "g").test(str);
  };

  /**
   * @description Returns the corresponding initial consonant character
   * @param char The character to be converted
   */
  export const getMain = (char: string): string => {
    if (char == null) return "";
    if (char in CarakanChars.SWARA) return CarakanChars.SWARA[char];
    if (char in CarakanChars.NGLEGENA) return CarakanChars.NGLEGENA[char];
    return char;
  };

  /**
   * @description Returns the corresponding sonorant consonant character
   * @param char The character to be converted
   */
  export const getSonorant = (char: string): string => {
    if (char == null) return "";
    if (char === "r") return CarakanChars.SANDHANGAN["cakra"];
    if (char === "y") return CarakanChars.SANDHANGAN["pengkal"];
    if (char === "rx") return CarakanChars.SANDHANGAN["keret"];
    if (char in CarakanChars.PASANGAN) return CarakanChars.PASANGAN[char];
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
        return CarakanChars.SANDHANGAN["wulu"];
      case "u":
        return CarakanChars.SANDHANGAN["suku"];
      case "é":
      case "è":
      case "e":
        return CarakanChars.SANDHANGAN["taling"];
      case "o":
        return CarakanChars.SANDHANGAN["talingTarung"];
      case "ə":
      case "x":
        return CarakanChars.SANDHANGAN["pepet"];
    }
    return char;
  };

  /**
   * @description Returns the corresponding final character
   * @param char The character to be converted
   */
  export const getFinal = (char: string): string => {
    if (char == null) return "";
    if (char === "r") return CarakanChars.SANDHANGAN["layar"];
    if (char === "h") return CarakanChars.SANDHANGAN["wignyan"];
    if (char === "ng") return CarakanChars.SANDHANGAN["cecak"];
    if (char === "pangkon") return CarakanChars.SANDHANGAN["pangkon"];
    return CarakanChars.PASANGAN[char];
  };

  /**
   * @description Returns the corresponding punctuation character
   * @param char The character to be converted
   */
  export const getPunctuation = (char: string): string => {
    if (char == null) return "";
    switch (char) {
      case ",":
        return CarakanChars.PADA["lingsa"];
      case ".":
        return CarakanChars.PADA["lungsi"];
      case ":":
        return CarakanChars.PADA["pangkat"];
      case "(":
      case ")":
      case "'":
      case "\"":
        return CarakanChars.PADA["adeg"];
      case "|":
        return CarakanChars.PADA["adegadeg"];
      case "<":
        return CarakanChars.PADA["piseleh"];
      case ">":
        return CarakanChars.PADA["piselehwalik"];
      case "{":
        return CarakanChars.PADA["rerenggankiwa"];
      case "}":
        return CarakanChars.PADA["rerenggantengen"];
    }
    return char;
  };

  /**
   * @description Returns the corresponding Javanese number character
   * @param char The character to be converted
   */
  export const getNumber = (char: string): string => {
    if (char == null) return "";
    if (char in CarakanChars.ANGKA) return CarakanChars.ANGKA[char];
    return "";
  };

  /**
   * @description Returns the corresponding miscellaneous character
   * @param char The character to be converted
   */
  export const getMisc = (char: string): string => {
    if (char == null) return "";
    if (char in CarakanChars.MISC) return CarakanChars.MISC[char];
    return "";
  };

  /**
   * @description Returns the consonant from residue
   * @param residue The residue string
   * @param onlyLast If true, only the last consonant will be returned
   */
  export const returnResidue = (residue: string): string => {
    const groups = [...matchAll(residue, RegExp(CarakanConst.LATIN.CAPTURE_RESIDUE, "g"))]?.[0];
    if (groups == null) return "";
    if (groups[3] == null) {
      return getMain(groups[1]) + getFinal("pangkon");
    } else {
      return getMain(groups[1]) + getSonorant(groups[2]) + getVowel(groups[3]);
    }
  };

  /**
   * @description Remove accents from Latin text and standardize input for Carakan
   * @param text The text to be normalized
   */
  export const normalizeAccents = (text: string): string => {
    const pattern = new RegExp(Object.keys(LatinConst.ACCENTS_MAP).join("|"), "g");
    return text.replace(pattern, (matched) => {
      if (matched === "E") matched = "E(?!`)";
      if (matched === "e") matched = "e(?!`)";
      return LatinConst.ACCENTS_MAP[matched];
    });
  };
}

export default CarakanHelper;
