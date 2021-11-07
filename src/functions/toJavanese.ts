import matchAll from "string-match-all";
import Helper from "../helpers/Helper";
import { SyllableBuilder } from "../helpers/SyllableBuilder";
import { CarakanConst } from "../constants/constants";

/* TYPES */
interface CarakanConfig {
  useAccents?: boolean;
  useSwara?: boolean;
  useMurda?: boolean;
}

/**
 * @description Transliterate a string in Latin characters into its corresponding form in Javanese script.
 * @param {string} input - The input string in Latin  to be converted.
 * @param {CarakanConfig} [config] - The options for the conversion.
 * @returns {string} The converted string in Javanese script.
 * @example
 * toCarakan("karya")
 * // => "ꦏꦂꦪ"
 */
export const toJavanese = (input: string, config?: CarakanConfig): string => {
  config = {
    useAccents: false,
    useSwara: true,
    useMurda: true,
    ...config,
  };

  /* Normalize whitespaces */
  input = input.trim().replace(/\s+/g, " ");
  /* Lowercase all consonants except Aksara Murda */
  input = input.replace(RegExp(CarakanConst.regEx.consonants_uppercase_except_murda, "g"), (char) =>
    char.toLowerCase()
  );

  /* Normalize accents in accented mode */
  if (config.useAccents) input = Helper.normalizeAccents(input);
  /* Make all vowels lowercase if Aksara Swara is disabled */
  if (!config.useSwara)
    input = input.replace(RegExp(CarakanConst.regEx.vowels_swara, "g"), (char) => char.toLowerCase());
  /* Make all Aksara Murda consonants lowercase if Aksara Murda is disabled */
  if (!config.useMurda)
    input = input.replace(RegExp(CarakanConst.regEx.consonants_murda, "g"), (char) => char.toLowerCase());

  /*
   * Here, we break down the input on a per syllable basis using RegEx,
   * iterate and feed it into the syllable converter,
   * and append the result to the output string.
   */
  let syllables = [...matchAll(input, RegExp(CarakanConst.regEx.capturerRegEx, "g"))];
  let output = "";

  if (syllables.length > 0) {
    for (const [i, current] of syllables.entries()) {
      let previous = syllables[i - 1] ?? null;
      let isLastOfInput = i === syllables.length - 1;

      let residue = "";
      if (previous != null && previous.index != null) {
        let residueIndex = previous.index + previous[0].length;
        residue = input.slice(residueIndex, current.index);
      } else {
        residue = input.slice(0, current.index);
      }
      
      output += getTransliteration(current, residue, isLastOfInput);
    }
  }

  return output;
};

/**
 * @description Converts the already broken down syllable into Javanese script
 * @returns {string}
 */
const getTransliteration = (matchGroups: RegExpMatchArray, residue: string, isLastOfInput: boolean): string => {
  let builder = new SyllableBuilder(matchGroups, residue, matchGroups.input as string, isLastOfInput);

  /* Assign each capture groups into variable names */
  let [
    digits_or_punc,
    consonant_initial,
    consonant_sonorant,
    vowel,
    consonant_panyigeg,
    consonant_final,
    dot_or_comma,
  ] = matchGroups.slice(1, 9);

  /* Converts syllable containing numbers or punctuation */
  if (digits_or_punc != null) {
    if (Helper.isDigit(digits_or_punc)) {
      let numbers = digits_or_punc
        .split("")
        .map((digit: string) => Helper.getNumber(digit))
        .join("");
      let padaPangkat = Helper.getPunctuation(":");
      builder.nonLetter = padaPangkat + numbers + padaPangkat;
    } else {
      builder.nonLetter = Helper.getPunctuation(digits_or_punc);
    }
    return builder.build();
  }

  /* Converts syllable containing dots and commas */
  if (dot_or_comma != null) {
    if (dot_or_comma === ",") {
      if (consonant_final != null) {
        builder.nonLetter = Helper.getInitial(consonant_final) + Helper.getFinal("pangkon") + Helper.getMisc("zwnj");
      } else {
        builder.nonLetter = Helper.getPunctuation(",");
      }
    } else {
      if (consonant_final != null) {
        builder.nonLetter =
          Helper.getInitial(consonant_final) + Helper.getFinal("pangkon") + Helper.getPunctuation(",");
      } else {
        builder.nonLetter = Helper.getPunctuation(".");
      }
    }
    return builder.build();
  }

  /* Converts syllable containing only vowels, without any initial consonants */
  if (consonant_initial == null) {
    if (vowel.match(RegExp(CarakanConst.regEx.vowels_swara, "g"))) {
      builder.main = Helper.getInitial(vowel);
    } else {
      builder.main = Helper.getInitial("h") + Helper.getVowel(vowel);
    }
    builder.final = Helper.getFinal(consonant_panyigeg);
    return builder.build();
  }

  /* Converts syllable with Cakra and Cakra Keret */
  if (consonant_sonorant === "r") {
    let useResidue = true;
    if (residue.length > 0 && !Helper.isSpace(residue)) {
      /* Place the Cakra/Cakra keret on the bottom of pasangan */
      builder.main = Helper.getInitial(residue);
      builder.sonorant = Helper.getSonorant(consonant_initial);
      if (vowel !== "x") {
        builder.afterSonorant = Helper.getSonorant("r");
        builder.vowel = Helper.getVowel(vowel);
      } else {
        builder.afterSonorant = Helper.getSonorant("rx");
      }
      useResidue = false;
    } else {
      /* Place the Cakra/Cakra keret on the bottom of main letter */
      builder.main = Helper.getInitial(consonant_initial);
      if (vowel === "x") {
        builder.sonorant = Helper.getSonorant("rx");
      } else {
        builder.sonorant = Helper.getSonorant(consonant_sonorant);
        builder.vowel = Helper.getVowel(vowel);
      }
    }
    builder.final = Helper.getFinal(consonant_panyigeg);
    return builder.build(useResidue);
  }

  let useGanten = consonant_initial.match(/[rl]/g) && consonant_sonorant == null && vowel === "x";
  if (useGanten) {
    builder.main = Helper.getInitial(`${consonant_initial}x`);
    builder.final = Helper.getFinal(consonant_panyigeg);
    return builder.build();
  }

  builder.main = Helper.getInitial(consonant_initial);
  builder.sonorant = Helper.getSonorant(consonant_sonorant);
  builder.vowel = Helper.getVowel(vowel);
  builder.final = Helper.getFinal(consonant_panyigeg);
  return builder.build();
};
