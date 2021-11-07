import { CarakanConst, JavaneseChar } from "../constants/constants";

namespace Helper {
  /**
   * @description Returns true if the input is a digit number
   * @param str The string to be checked
   */
  export const isDigit = (str: string): boolean => {
    return RegExp(CarakanConst.regEx.digits, "g").test(str);
  };

  /**
   * @description Returns true if the input is a space
   * @param str The string to be checked
   */
  export const isSpace = (str: string): boolean => {
    return RegExp(CarakanConst.regEx.space, "g").test(str);
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
      case '"':
        return JavaneseChar.PADA["adeg"];
      case "|":
        return JavaneseChar.PADA["adegadeg"];
      case "<":
        return JavaneseChar.PADA["piseleh"];
      case ">":
        return JavaneseChar.PADA["piselehwalik"];
      case "{":
        return JavaneseChar.PADA["rerengankiwa"];
      case "}":
        return JavaneseChar.PADA["rerengantengen"];
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
   * @returns {string}
   */
  export const returnConsonant = (residue: string, onlyLast: boolean = false): string => {
    /* Return consonant (optional) and vowel if text contains vowel */
    if (RegExp(CarakanConst.regEx.vowels, "g").test(residue)) {
      /* Capturing Group:
       * [1] = consonant (optional)
       * [2] = consonant (optional)
       * [3] = vowel
       */
      let captureMatches = [...residue.matchAll(RegExp(CarakanConst.regEx.contains_vowels_optional_consonant, "g"))];
      return captureMatches
        .map((group) => {
          if (group[1] != null) {
            return getInitial(group[1]) + getSonorant(group[2]) + getVowel(group[3]);
          } else {
            return getInitial("h") + getVowel(group[2]);
          }
        })
        .join("");
    } else {
      let matches = [...residue.matchAll(RegExp(CarakanConst.regEx.consonants, "g"))];
      if (matches.length === 0) return "";
      if (onlyLast) return matches[matches.length - 1][1];
      return matches.map((group) => getInitial(group[0]) + getFinal("pangkon")).join("");
    }
  };

  /**
   * @description Remove accents from Latin text and standardize input for Carakan
   * @param text The text to be normalized
   */
  export const normalizeAccents = (text: string) => {
    let pattern = new RegExp(Object.keys(CarakanConst.accentsMap).join("|"), "g");
    return text.replace(pattern, (matched) => {
      if (matched === "E") matched = "E(?!`)";
      if (matched === "e") matched = "e(?!`)";
      return CarakanConst.accentsMap[matched];
    });
  };
}

export default Helper;
