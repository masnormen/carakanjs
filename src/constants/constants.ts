/* Regex for various type of valid Javanese glyph */
const r: Record<string, any> = {
  consonants: `dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]`,
  consonants_panyigeg: `ng|[rh]`,
  consonants_murda: `NY|[NKTSPGB]`,
  consonants_uppercase_except_murda: `DH|TH|NG|KH|DZ|SY|GH|[^N]Y|[HCRDWLJMZFV]`,
  consonants_except_panyigeg: `dh|ny|th|kh|dz|sy|gh|NY|[nckdtswlpjymgbzfvNKTSPGB]`,
  digits: `[\\d]`,
  digits_or_punc: `[\\d]+|[:()'"|<>{}?!]`,
  dot_or_comma: `[.,]`,
  space: `[ ]`,
  vowels: `[aiueoxAIUEOXÉÊÈéêè]`,
  vowels_swara: `[AIUEO]`,
  anything_except_vowels_swara: `[^AIUEO]`,
  contains_vowels_optional_consonant: `(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]?)?(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]?)?([aiueoxAIUEOXÉÈéè])`,
};

const CarakanConst: Record<string, any> = {
  accentsMap: {
    "E(?!`)": "X",
    "e(?!`)": "x",
    "E`": "E",
    "e`": "e",
    È: "E",
    è: "e",
    Ê: "E",
    ê: "e",
    É: "E",
    é: "e",
  },

  regEx: {
    /**
     * Capturer RegEx description (only capture the first found group)
     * -------- MATCH EITHER:
     * 1: Digits and Punctuation except '.' and ','
     * -------- OR
     * 2: Initial consonant (optional), that's
     *    Not followed by: a space, that's not followed by a vowel
     * 3: Sonorant consonant (optional)
     * 4: Vowel
     * 5: Final panyigeg-type consonant: r, h, or ng (optional), thats
     *    Not followed by: a vowel
     * -------- OR
     * 6: Muted consonant at the end of sentence (pangkon'd), no panyigeg
     * 7: Dot or Comma
     * 8: Space (ignored)
     */
    capturerRegEx: [
      `(${r.digits_or_punc})`,
      `|`,
      `(${r.consonants})?`,
      `(?!${r.space}(?!${r.vowels}))`,
      `(${r.consonants})?`,
      `(${r.vowels})`,
      `(${r.consonants_panyigeg})?`,
      `(?!${r.vowels})`,
      `|`,
      `(${r.consonants_except_panyigeg})?`,
      `(${r.dot_or_comma})`,
      `(?:${r.space})?`,
    ].join(""),
    ...r,
  },
};

const JavaneseChar: Record<string, any> = {
  /* Basic Javanese characters */
  NGLEGENA: {
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
  },

  /* Swara Javanese characters */
  SWARA: {
    A: "ꦄ",
    I: "ꦅ",
    U: "ꦈ",
    E: "ꦌ",
    O: "ꦎ",

    //Pa Cerek, Nga Lelet
    rx: "ꦉ",
    lx: "ꦊ",
  },

  /* Pasangan of plain Javanese characters */
  PASANGAN: {
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
  },

  /* Sandhangan Swara */
  SANDHANGAN: {
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
  },

  /* Javanese punctuation characters */
  PADA: {
    lingsa: "꧈",
    lungsi: "꧉",
    pangkat: "꧇",
    adeg: "꧊",
    adegadeg: "꧋",
    piseleh: "꧌",
    piselehwalik: "꧍",
    rerengankiwa: "꧁",
    rerengantengen: "꧂",
  },

  /* Javanese digit characters */
  ANGKA: {
    "1": "꧑",
    "2": "꧒",
    "3": "꧓",
    "4": "꧔",
    "5": "꧕",
    "6": "꧖",
    "7": "꧗",
    "8": "꧘",
    "9": "꧙",
    "0": "꧐",
  },

  MISC: {
    zwnj: "‌",
  },
};

export { JavaneseChar, CarakanConst };
