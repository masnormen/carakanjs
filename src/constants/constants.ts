/* eslint-disable quote-props */
type CharacterMapping = {
  [char: string]: string;
};

function invertMapping(obj: CharacterMapping): CharacterMapping {
  const result: CharacterMapping = {};
  const _keys = Object.keys(obj);
  for (let i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }
  return result;
}

namespace CarakanConst {
  /* Regex for various type of valid Javanese glyph */
  export const LATIN = {
    CONSONANTS: `dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]`,
    CONSONANTS_PANYIGEG: `ng|[rh]`,
    CONSONANTS_MURDA: `NY|[NKTSPGB]`,
    CONSONANTS_UPPERCASE_WITHOUT_MURDA: `DH|TH|NG|KH|DZ|SY|GH|[^N]Y|[HCRDWLJMZFV]`,
    CONSONANTS_WITHOUT_PANYIGEG: `dh|ny|th|kh|dz|sy|gh|NY|[nckdtswlpjymgbzfvNKTSPGB]`,
    DIGITS: `[\\d]`,
    DIGITS_PUNC: `[\\d]+|[:()'"|<>{}?!]`,
    DOT_COMMA: `[.,]`,
    SPACE: `[\\u0020]`,
    VOWELS: `[aiueoxAIUEOXÉÊÈéêè]`,
    VOWELS_SWARA: `[AIUEO]`,
    EXCEPT_SWARA: `[^AIUEO]`,
    CAPTURE_RESIDUE: "(?=[A-Za-zÀ-ÿ])(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?([aiueoxAIUEOXÉÈéè])?",
  };

  export const CARAKAN = {
    ANGKA: `[\\uA9D0-\\uA9D9]`,
    NGLEGENA: `[\\uA98F-\\uA9B2]`,
    CECAK_TELU: `[\\uA9B3]`,
    SANDHANGAN_FINAL: `[\\uA980-\\uA983]`,
    SWARA: `[\\uA984-\\uA98E]`,
    SANDHANGAN: `[\\uA9B4-\\uA9BD]`,
    CONSONANT_SIGN: `[\\uA9BE-\\uA9BF]`,
    PANGKON: `[\\uA9C0]`,
    PADA: `[\\uA9C1-\\uA9C6\\uA9C8-\\uA9CF]`, 
    PANGKAT: `[\\uA9C7]`
  };

  export const REGEX = {
    CAPTURE_LATIN: [
      `(${LATIN.DIGITS_PUNC})`,
      `|`,
      `(${LATIN.CONSONANTS})?`,
      `(?!${LATIN.SPACE}(?!${LATIN.VOWELS}))`,
      `(${LATIN.CONSONANTS})?`,
      `(${LATIN.VOWELS})`,
      `(${LATIN.CONSONANTS_PANYIGEG})?`,
      `(?!${LATIN.VOWELS})`,
      `|`,
      `(${LATIN.CONSONANTS_WITHOUT_PANYIGEG})?`,
      `(${LATIN.DOT_COMMA})`,
      `(?:${LATIN.SPACE})?`,
    ].join(""),

    CAPTURE_CARAKAN: [
      `(${LATIN.SPACE})`,
      `|(?:${CARAKAN.PANGKAT})?(${CARAKAN.ANGKA})(?:${CARAKAN.PANGKAT})?`,
      `|(${CARAKAN.NGLEGENA})(${CARAKAN.CECAK_TELU})?(${CARAKAN.PANGKON})?(${CARAKAN.CONSONANT_SIGN})?(${CARAKAN.SANDHANGAN})?(${CARAKAN.SANDHANGAN})?(${CARAKAN.SANDHANGAN_FINAL})?`,
      `|(${CARAKAN.SWARA})`,
      `|(${CARAKAN.PADA})`,
    ].join(""),
  };
};

const LatinConst: Record<string, Record<string, string>> = {
  ACCENTS_MAP: {
    "E(?!`)": "X",
    "e(?!`)": "x",
    "E`": "E",
    "e`": "e",
    "È": "E",
    "è": "e",
    "Ê": "E",
    "ê": "e",
    "É": "E",
    "é": "e",
  },
};

namespace CarakanChars {
  /* Basic Javanese characters */
  export const NGLEGENA: CharacterMapping = {
    h: "ꦲ",
    n: "ꦤ",
    c: "ꦕ",
    r: "ꦫ",
    k: "ꦏ",
    d: "ꦢ",
    t: "ꦠ",
    s: "ꦱ",
    w: "ꦮ",
    l: "ꦭ",
    p: "ꦥ",
    dh: "ꦝ",
    j: "ꦗ",
    y: "ꦪ",
    ny: "ꦚ",
    m: "ꦩ",
    g: "ꦒ",
    b: "ꦧ",
    th: "ꦛ",
    ng: "ꦔ",

    /* Aksara Rekan */
    z: "ꦗ꦳",
    f: "ꦥ꦳",
    v: "ꦮ꦳",
    kh: "ꦏ꦳",
    dz: "ꦢ꦳",
    gh: "ꦒ꦳",

    /* Aksara Murda */
    N: "ꦟ",
    K: "ꦑ",
    T: "ꦡ",
    S: "ꦯ",
    P: "ꦦ",
    NY: "ꦘ",
    G: "ꦓ",
    B: "ꦨ",
  };

  /* Swara Javanese characters */
  export const SWARA: CharacterMapping = {
    A: "ꦄ",
    I: "ꦅ",
    U: "ꦈ",
    E: "ꦌ",
    O: "ꦎ",

    /* Pa Cerek, Nga Lelet */
    rx: "ꦉ",
    lx: "ꦊ",
  };

  /* Pasangan of plain Javanese characters */
  export const PASANGAN: CharacterMapping = {
    h: "꧀ꦲ",
    n: "꧀ꦤ",
    c: "꧀ꦕ",
    r: "꧀ꦫ",
    k: "꧀ꦏ",
    d: "꧀ꦢ",
    t: "꧀ꦠ",
    s: "꧀ꦱ",
    w: "꧀ꦮ",
    l: "꧀ꦭ",
    p: "꧀ꦥ",
    dh: "꧀ꦝ",
    j: "꧀ꦗ",
    y: "꧀ꦪ",
    ny: "꧀ꦚ",
    m: "꧀ꦩ",
    g: "꧀ꦒ",
    b: "꧀ꦧ",
    th: "꧀ꦛ",
    ng: "꧀ꦔ",

    /* Aksara Rekan */
    z: "꧀ꦗ꦳",
    f: "꧀ꦥ꦳",
    v: "꧀ꦮ꦳",
    kh: "꧀ꦏ꦳",
    dz: "꧀ꦢ꦳",
    gh: "꧀ꦒ꦳",

    /* Aksara Murda */
    N: "꧀ꦟ",
    K: "꧀ꦑ",
    T: "꧀ꦡ",
    S: "꧀ꦯ",
    P: "꧀ꦦ",
    NY: "꧀ꦘ",
    G: "꧀ꦓ",
    B: "꧀ꦨ",
  };

  /* Sandhangan Swara */
  export const SANDHANGAN: CharacterMapping = {
    wulu: "ꦶ",
    suku: "ꦸ",
    taling: "ꦺ",
    talingTarung: "ꦺꦴ",
    pepet: "ꦼ",
    cecak: "ꦁ",
    wignyan: "ꦃ",
    layar: "ꦂ",
    cakra: "ꦿ",
    keret: "ꦽ",
    pengkal: "ꦾ",
    pangkon: "꧀",
  };

  /* Javanese punctuation characters */
  export const PADA: CharacterMapping = {
    lingsa: "꧈",
    lungsi: "꧉",
    pangkat: "꧇",
    adeg: "꧊",
    adegadeg: "꧋",
    piseleh: "꧌",
    piselehwalik: "꧍",
    rerenggankiwa: "꧁",
    rerenggantengen: "꧂",
  };

  /* Javanese digit characters */
  export const ANGKA: CharacterMapping = {
    1: "꧑",
    2: "꧒",
    3: "꧓",
    4: "꧔",
    5: "꧕",
    6: "꧖",
    7: "꧗",
    8: "꧘",
    9: "꧙",
    0: "꧐",
  };

  export const MISC: CharacterMapping = {
    zwnj: "‌",
  }
};

namespace LatinChars {
  export const SWARA: CharacterMapping = invertMapping({
    A: "ꦄ",
    I: "ꦅ",
    U: "ꦈ",
    E: "ꦌ",
    O: "ꦎ",

    /* Pa Cerek, Nga Lelet */
    re: "ꦉ",
    le: "ꦊ",
  });
  export const NGLEGENA: CharacterMapping = invertMapping(CarakanChars.NGLEGENA);
  export const PASANGAN: CharacterMapping = invertMapping(CarakanChars.PASANGAN);
  export const SANDHANGAN: CharacterMapping = invertMapping({
    'i': "ꦶ",
    'u': "ꦸ",
    'é': "ꦺ",
    'o': "ꦺꦴ",
    'e': "ꦼ",
    'ng': "ꦁ",
    'h': "ꦃ",
    'r': "ꦂ",
    're': "ꦽ",
  });
  export const CONSONANT_SIGN: CharacterMapping = invertMapping({
    'r': "ꦿ",
    'y': "ꦾ",
  })
  export const PADA: CharacterMapping = invertMapping({
    ',': "꧈",
    '.': "꧉",
    ':': "꧇",
    '"': "꧊",
    '|': "꧋",
    '<': "꧌",
    '>': "꧍",
    '{': "꧁",
    '}': "꧂",
  });
  export const ANGKA: CharacterMapping = invertMapping(CarakanChars.ANGKA);
  export const MISC: CharacterMapping = invertMapping(CarakanChars.MISC);
};

export { CarakanChars, CarakanConst, LatinConst, LatinChars };
