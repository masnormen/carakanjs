"use strict"

// Compatibility issues
const matchAll = require("string.prototype.matchall");
const {
  NGLEGENA,
  SWARA,
  PASANGAN,
  SANDHANGAN,
  PADA,
  ANGKA
} = require("./charlist.js");

const getInitial = (glyph) => {
  if (glyph == null)
    return "";
  if (glyph in SWARA)
    return SWARA[glyph];
  if (glyph in NGLEGENA)
    return NGLEGENA[glyph];
  
  return glyph;
};

const getSonorant = (consonant) => {
  if (consonant == null)
    return "";
  if (consonant === "r")
    return SANDHANGAN["cakra"];
  if (consonant === "y")
    return SANDHANGAN["pengkal"];
  if (consonant === "rx")
    return SANDHANGAN["keret"];
  if (consonant in PASANGAN)
    return PASANGAN[consonant];
  
  return consonant;
};

const getVowel = (vowel) => {
  if (vowel == null)
    return "";
  
  switch (vowel.toLowerCase()) {
    case "a":
      return "";
    case "i":
      return SANDHANGAN["wulu"];
    case "u":
      return SANDHANGAN["suku"];
    case "é":
    case "è":
    case "e":
      return SANDHANGAN["taling"];
    case "o":
      return SANDHANGAN["talingTarung"];
    case "ə":
    case "x":
      return SANDHANGAN["pepet"];
  }
  
  return vowel;
};

const getFinal = (consonant) => {
  if (consonant == null)
    return "";
  if (consonant === "r")
    return SANDHANGAN["layar"];
  if (consonant === "h")
    return SANDHANGAN["wignyan"];
  if (consonant === "ng")
    return SANDHANGAN["cecak"];
  if (consonant === "pangkon")
    return SANDHANGAN["pangkon"];
  
  return PASANGAN[consonant];
};

const getPunctuation = (symbol) => {
  if (symbol == null)
    return "";
  
  switch (symbol) {
    case ",":
      return PADA["lingsa"];
    case ".":
      return PADA["lungsi"];
    case ":":
      return PADA["pangkat"];
    case "(":
    case ")":
    case "'":
    case "\"":
      return PADA["adeg"];
    case "|":
      return PADA["adegadeg"];
    case "<":
      return PADA["piseleh"];
    case ">":
      return PADA["piselehwalik"];
    case "{":
      return PADA["rerengankiwa"];
    case "}":
      return PADA["rerengantengen"];
  }
  
  return symbol;
};

const getNumber = (number) => {
  if (number == null)
    return "";
  if (number in ANGKA)
    return ANGKA[number];
  
  return "";
};

const isDigit = (text) => {
  if (text == null)
    return false;
  
  return /[\d]/.test(text);
};

const isSpace = (text) => {
  if (text == null)
    return false;
  
  return /^[ ]$/.test(text);
};

const returnConsonant = (text, onlyLast = false) => {
  let result = "";
  let matches = [...matchAll(text, /(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])/g)];
  
  if (/[aiueoxAIUEOXÉÈéè]/.test(text)) {
    let syllableMatches = [...matchAll(text, /(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]?)?(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]?)?([aiueoxAIUEOXÉÈéè])/g)];
    for (let i = 0; i < syllableMatches.length; i++) {
      if (syllableMatches[i][1] != null) {
        result = getInitial(syllableMatches[i][1]) + getSonorant(syllableMatches[i][2]) + getVowel(syllableMatches[i][3]);
      } else {
        result = getInitial("h") + getVowel(syllableMatches[i][2]);
      }
    }
    return result;
  }
  
  if (matches.length === 0)
    return "";
  
  if (onlyLast)
    return matches[matches.length - 1][1];
  
  for (let i = 0; i < matches.length; i++) {
    result += getInitial(matches[i][1]) + getFinal("pangkon");
  }
  return result;
};

// This function transliterates strings which is filtered by the exported function
const doTrans = (current, residue, input, isLast = true) => {
  let hasCakret = false; // Has a cakra or cakra keret
  let buffer = {
    mutedInitial: "",
    symbolnum: "",
    initial: "",
    sonorant: "",
    vowel: "",
    final: "",
    opt: "",
    mutedFinal: "",
  };
  const insertMutedInitial = () => {
    buffer.mutedInitial = returnConsonant(residue);
  };
  const insertMutedFinal = () => {
    if (isLast && (input.length - current.index > current[0].length)) {
      let finalGlyph = input.slice(current.index + current[0].length);
      if (!isSpace(finalGlyph))
        buffer.mutedFinal = getInitial(finalGlyph) + getFinal("pangkon");
    }
  };
  const output = () => {
    // Check if syllable has Cakra or Cakra Keret
    if (!hasCakret) insertMutedInitial();
    insertMutedFinal();
    return buffer.mutedInitial
      + buffer.symbolnum
      // Digits and punctuation will end at this point
      + buffer.initial
      + buffer.sonorant
      + buffer.opt // Only cakra & cakra keret will print this
      + buffer.vowel
      + buffer.final
      // Word in the middle of the input will end at this point
      + buffer.mutedFinal;
  };
  
  // Check if syllable is actually a digit or non-sentence-ender punctuation
  // (i.e group 1 matched and therefore not null/undefined)
  if (current[1] != null) {
    // Check if syllable is a number
    if (isDigit(current[1])) {
      let result = "";
      for (let i = 0; i < current[1].length; i++) {
        result += getNumber(current[1].charAt(i));
      }
      // Surround numbers with Pada Pangkat
      buffer.symbolnum = getPunctuation(":") + result + getPunctuation(":");
    }
    // Else the syllable is a punctuation
    else {
      buffer.symbolnum = getPunctuation(current[1]);
    }
  }
  
  // Check if syllable is actually a sentence ender
  // (i.e have no vowel component)
  else if (current[4] == null) {
    // Handle comma (,)
    if (current[7] === ",") {
      if (current[6] != null) {
        // Insert zero width non-joiner char to preserve pangkon
        buffer.symbolnum = getInitial(current[6]) + getFinal("pangkon") + "‌";
      } else {
        buffer.symbolnum = getPunctuation(",");
      }
    }
    // Handle dot (.)
    else {
      if (current[6] != null) {
        buffer.symbolnum = getInitial(current[6]) + getFinal("pangkon") + getPunctuation(",");
      } else {
        buffer.symbolnum = getPunctuation(".");
      }
    }
  }
  
  // Else, if syllable is an actual Javanese syllable:
  else {
    // Initialize part of the syllable
    let word = {
      initial: current[2] != null ? current[2] : null,
      sonorant: current[3] != null ? current[3] : null,
      vowel: current[4] != null ? current[4] : null,
      final: current[5] != null ? current[5] : null,
    };
    
    // Handle the exception in the rules of Javanese script, smh.
    // Check if word is a vowel sound
    // (i.e has no initial)
    if (word.initial === null) {
      if (word.vowel.match(/[AIUEO]/g) !== null) {
        buffer.initial = getInitial(word.vowel);
        buffer.final = getFinal(word.final);
      } else {
        buffer.initial = getInitial("h") + getVowel(word.vowel);
        buffer.final = getFinal(word.final);
      }
    } else {
      if (word.sonorant === "r") {
        if (residue.length > 0 && residue !== " ") {
          hasCakret = true;
          buffer.mutedInitial = returnConsonant(residue).substring(0, returnConsonant(residue).length - 2);
          if (word.vowel === "x") {
            buffer.initial = getInitial(returnConsonant(residue, true));
            buffer.sonorant = getSonorant(word.initial);
            buffer.opt = getSonorant("rx");
            buffer.final = getFinal(word.final);
          } else {
            buffer.initial = getInitial(returnConsonant(residue, true));
            buffer.sonorant = getSonorant(word.initial);
            buffer.opt = getSonorant("r");
            buffer.vowel = getVowel(word.vowel);
            buffer.final = getFinal(word.final);
          }
        } else {
          if (word.vowel === "x") {
            buffer.initial = getInitial(word.initial);
            buffer.sonorant = getSonorant("rx");
            buffer.final = getFinal(word.final);
          } else {
            buffer.initial = getInitial(word.initial);
            buffer.sonorant = getSonorant(word.sonorant);
            buffer.vowel = getVowel(word.vowel);
            buffer.final = getFinal(word.final);
          }
        }
      } else if (word.vowel === "x") {
        if (word.initial === "r" && word.sonorant === null) {
          buffer.initial = getInitial("rx");
          buffer.final = getFinal(word.final);
        } else if (word.initial === "l" && word.sonorant === null) {
          buffer.initial = getInitial("lx");
          buffer.final = getFinal(word.final);
        } else {
          buffer.initial = getInitial(word.initial);
          buffer.sonorant = getSonorant(word.sonorant);
          buffer.vowel = getVowel(word.vowel);
          buffer.final = getFinal(word.final);
        }
      } else {
        buffer.initial = getInitial(word.initial);
        buffer.sonorant = getSonorant(word.sonorant);
        buffer.vowel = getVowel(word.vowel);
        buffer.final = getFinal(word.final);
      }
    }
  }
  return output();
};

exports.toCarakan = (value, options = {}) => {
  if (typeof value !== "string")
    throw new TypeError("Expected a string");
  
  options = {
    diacritics: false,
    swaraMurda: true,
    ...options
  };
  
  console.log(options);
  
  let input = options.diacritics
    ? value
      .replace(/E(?!`)/g, "X")
      .replace(/e(?!`)/g, "x")
      .replace(/E`/g, "E")
      .replace(/e`/g, "e")
      .replace(/È/g, "E")
      .replace(/è/g, "e")
    : value;
  
  if (!options.swaraMurda) input = input.toLowerCase();
  
  let result = "";
  const syllableCheck = /([\d]+|[:()'"|<>{}?!])|(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?(?![ ](?![aiueoxAIUEOXÉÈéè]))(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]?)?([aiueoxAIUEOXÉÈéè])(ng|[rh])?(?![aiueoxAIUEOXÉÈéè])|(dh|ny|th|kh|dz|sy|gh|NY|[nckdtswlpjymgbzfvNKTSPGB])?([.,])(?:[ ])?/g;
  // Explanation for above's regex match groups:
  //
  // 1 numbers and punctuation
  // --------
  // 2 initial consonant
  // 3 sonorant consonant
  // 4 vowel
  // 5 final consonant (r, h, ng)
  // --------
  // 6 muted consonant at the end of sentence (pangkon'd)
  // 7 punctuation (.,)
  // 8 space (ignored)
  
  let matches = [...matchAll(input, syllableCheck)];
  
  for (let i = 0; i < matches.length; i++) {
    let prev = matches[0] === undefined ? [] : i === 0 ? [] : matches[i - 1];
    let current = matches[0] === undefined ? [] : matches[i];
    let isLast = i === matches.length - 1;
    
    // Residue is the leftover strings which isn't picked up by the regex above
    let residue =
      // Check if residue is in the middle of the word
      (prev.length > 0 && prev.index - current.index < prev[0].length)
        ? input.substr(prev.index + prev[0].length, current.index - (prev.index + prev[0].length))
        // Else check if it's still on the beginning of the word (i.e there is no match yet)
        : (matches.length === 0 && input.length > 0)
          ? input // Else check if it's already in the beginning of the word
          : (current.length > 0)
            ? input.slice(0, current.index)
            : null;
    
    if (current.length > 0)
      // Transliterates the regex-filtered strings
      result += doTrans(current, residue, input, isLast);
  }
  
  return result;
};
