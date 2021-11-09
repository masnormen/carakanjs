/* Regex for various type of valid Javanese glyph */
const IDENTIFIERS: Record<string, string> = {
  CONSONANTS: `dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]`,
  CONSONANTS_PANYIGEG: `ng|[rh]`,
  CONSONANTS_MURDA: `NY|[NKTSPGB]`,
  CONSONANTS_UPPERCASE_WITHOUT_MURDA: `DH|TH|NG|KH|DZ|SY|GH|[^N]Y|[HCRDWLJMZFV]`,
  CONSONANTS_WITHOUT_PANYIGEG: `dh|ny|th|kh|dz|sy|gh|NY|[nckdtswlpjymgbzfvNKTSPGB]`,
  DIGITS: `[\\d]`,
  DIGITS_PUNC: `[\\d]+|[:()'"|<>{}?!]`,
  DOT_COMMA: `[.,]`,
  SPACE: `[ ]`,
  VOWELS: `[aiueoxAIUEOXÉÊÈéêè]`,
  VOWELS_SWARA: `[AIUEO]`,
  EXCEPT_SWARA: `[^AIUEO]`,
  CAPTURE_RESIDUE: "(?=[A-Za-zÀ-ÿ])(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?([aiueoxAIUEOXÉÈéè])?",
};

const CarakanConst: Record<string, Record<string, string>> = {
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

  REGEX: {
    CAPTURE_SYLLABLE: [
      `(${IDENTIFIERS.DIGITS_PUNC})`,
      `|`,
      `(${IDENTIFIERS.CONSONANTS})?`,
      `(?!${IDENTIFIERS.SPACE}(?!${IDENTIFIERS.VOWELS}))`,
      `(${IDENTIFIERS.CONSONANTS})?`,
      `(${IDENTIFIERS.VOWELS})`,
      `(${IDENTIFIERS.CONSONANTS_PANYIGEG})?`,
      `(?!${IDENTIFIERS.VOWELS})`,
      `|`,
      `(${IDENTIFIERS.CONSONANTS_WITHOUT_PANYIGEG})?`,
      `(${IDENTIFIERS.DOT_COMMA})`,
      `(?:${IDENTIFIERS.SPACE})?`,
    ].join(""),
    ...IDENTIFIERS,
  },
};

const JavaneseChar: Record<string, Record<string, string>> = {
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

    /* Pa Cerek, Nga Lelet */
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
    rerenggankiwa: "꧁",
    rerenggantengen: "꧂",
  },

  /* Javanese digit characters */
  ANGKA: {
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
  },

  MISC: {
    zwnj: "‌",
  },
};

export { JavaneseChar, CarakanConst };
