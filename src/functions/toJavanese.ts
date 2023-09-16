import { preferNative as matchAll } from "string-match-all";
import CarakanHelper from "../helpers/CarakanHelper";
import { SyllableBuilder } from "../helpers/SyllableBuilder";
import { CarakanConst } from "../constants/constants";

/* TYPES */
type CarakanConfig = {
  useAccents: boolean;
  useSwara: boolean;
  useMurda: boolean;
};

/**
 * @function toJavanese
 * @description Transliterate a string in Latin characters into its corresponding form in Javanese script.
 * @param input The input string in Latin  to be converted.
 * @param config The options for the conversion.
 * @returns The converted string in Javanese script.
 * @example
 * toCarakan("karya")
 * // => "ꦏꦂꦪ"
 */
export const toJavanese = (input: string, config?: Partial<CarakanConfig>): string => {
  config = {
    useAccents: false,
    useSwara: true,
    useMurda: true,
    ...config,
  };

  /* Normalize whitespaces */
  input = input.trim().replace(/\s+/g, " ");
  /* Lowercase all consonants except Aksara Murda */
  input = input.replace(RegExp(CarakanConst.LATIN.CONSONANTS_UPPERCASE_WITHOUT_MURDA, "g"), (char) =>
    char.toLowerCase()
  );

  /* Normalize accents in accented mode */
  if (config.useAccents) input = CarakanHelper.normalizeAccents(input);
  /* Make all vowels lowercase if Aksara Swara is disabled */
  if (!config.useSwara)
    input = input.replace(RegExp(CarakanConst.LATIN.VOWELS_SWARA, "g"), (char) => char.toLowerCase());
  /* Make all Aksara Murda consonants lowercase if Aksara Murda is disabled */
  if (!config.useMurda)
    input = input.replace(RegExp(CarakanConst.LATIN.CONSONANTS_MURDA, "g"), (char) => char.toLowerCase());

  /*
   * Here, we break down the input on a per syllable basis using RegEx,
   * iterate and feed it into the syllable converter,
   * and append the result to the output string.
   */
  const syllables = [...matchAll(input, RegExp(CarakanConst.REGEX.CAPTURE_LATIN, "g"))];
  let output = "";
  if (syllables.length > 0) {
    for (const [i, current] of syllables.entries()) {
      const previous = syllables[i - 1] ?? null;
      const isLastOfInput = i === syllables.length - 1;

      let residue = "";
      if (previous != null && previous.index != null) {
        const residueIndex = previous.index + previous[0].length;
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
 */
const getTransliteration = (matchGroups: RegExpMatchArray, residue: string, isLastOfInput: boolean): string => {
  /* Assign each capture groups into variable names */
  const [
    digits_or_punc,
    consonant_initial,
    consonant_sonorant,
    vowel,
    consonant_panyigeg,
    consonant_final,
    dot_or_comma,
  ] = matchGroups.slice(1, 9);

  const builder = new SyllableBuilder(matchGroups, residue, matchGroups.input as string, isLastOfInput);

  /* Converts syllable containing numbers or punctuation */
  if (digits_or_punc != null) {
    if (CarakanHelper.isDigit(digits_or_punc)) {
      const numbers = digits_or_punc
        .split("")
        .map((digit: string) => CarakanHelper.getNumber(digit))
        .join("");
      const padaPangkat = CarakanHelper.getPunctuation(":");
      builder.nonLetter = padaPangkat + numbers + padaPangkat;
    } else {
      builder.nonLetter = CarakanHelper.getPunctuation(digits_or_punc);
    }
    return builder.build();
  }

  /* Converts syllable containing dots and commas */
  if (dot_or_comma != null) {
    if (dot_or_comma === ",") {
      if (consonant_final != null) {
        builder.nonLetter =
          CarakanHelper.getMain(consonant_final) + CarakanHelper.getFinal("pangkon") + CarakanHelper.getMisc("zwnj");
      } else {
        builder.nonLetter = CarakanHelper.getPunctuation(",");
      }
    } else {
      if (consonant_final != null) {
        builder.nonLetter =
          CarakanHelper.getMain(consonant_final) +
          CarakanHelper.getFinal("pangkon") +
          CarakanHelper.getPunctuation(",");
      } else {
        builder.nonLetter = CarakanHelper.getPunctuation(".");
      }
    }
    return builder.build();
  }

  /* Converts syllable containing only vowels, without any initial consonants */
  if (consonant_initial == null) {
    if (vowel.match(RegExp(CarakanConst.LATIN.VOWELS_SWARA, "g"))) {
      builder.main = CarakanHelper.getMain(vowel);
    } else {
      builder.main = CarakanHelper.getMain("h") + CarakanHelper.getVowel(vowel);
    }
    builder.final = CarakanHelper.getFinal(consonant_panyigeg);
    return builder.build();
  }

  /* Converts syllable with Cakra and Cakra Keret */
  if (consonant_sonorant === "r") {
    let useResidue = true;
    if (residue.length > 0 && !CarakanHelper.isSpace(residue)) {
      /* Place the Cakra/Cakra keret on the bottom of pasangan */
      builder.main = CarakanHelper.getMain(residue);
      builder.sonorant = CarakanHelper.getSonorant(consonant_initial);
      if (vowel !== "x") {
        builder.afterSonorant = CarakanHelper.getSonorant("r");
        builder.vowel = CarakanHelper.getVowel(vowel);
      } else {
        builder.afterSonorant = CarakanHelper.getSonorant("rx");
      }
      useResidue = false;
    } else {
      /* Place the Cakra/Cakra keret on the bottom of main letter */
      builder.main = CarakanHelper.getMain(consonant_initial);
      if (vowel === "x") {
        builder.sonorant = CarakanHelper.getSonorant("rx");
      } else {
        builder.sonorant = CarakanHelper.getSonorant(consonant_sonorant);
        builder.vowel = CarakanHelper.getVowel(vowel);
      }
    }
    builder.final = CarakanHelper.getFinal(consonant_panyigeg);
    return builder.build(useResidue);
  }

  const useGanten = consonant_initial.match(/[rl]/g) && consonant_sonorant == null && vowel === "x";
  if (useGanten) {
    builder.main = CarakanHelper.getMain(`${consonant_initial}x`);
    builder.final = CarakanHelper.getFinal(consonant_panyigeg);
    return builder.build();
  }

  builder.main = CarakanHelper.getMain(consonant_initial);
  builder.sonorant = CarakanHelper.getSonorant(consonant_sonorant);
  builder.vowel = CarakanHelper.getVowel(vowel);
  builder.final = CarakanHelper.getFinal(consonant_panyigeg);
  return builder.build();
};
