(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.carakan = {}));
})(this, (function (exports) { 'use strict';

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /*! (c) Andrea Giammarchi - ISC */
  // requires a global Symbol
  var iterator = /* istanbul ignore next */
  function () {
    var i = 0;
    var self = this;
    return {
      next: function () {
        var done = self.length <= i;
        var value = done ? void 0 : self[i++];
        return {
          value: value,
          done: done
        };
      }
    };
  };

  function isRegexp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
  }

  var flagMap = {
    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    dotAll: 's',
    sticky: 'y',
    unicode: 'u'
  };
  function clonedRegexp(regexp, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isRegexp(regexp)) {
      throw new TypeError('Expected a RegExp instance');
    }

    var flags = Object.keys(flagMap).map(function (flag) {
      return (typeof options[flag] === 'boolean' ? options[flag] : regexp[flag]) ? flagMap[flag] : '';
    }).join('');
    var clonedRegexp = new RegExp(options.source || regexp.source, flags);
    clonedRegexp.lastIndex = typeof options.lastIndex === 'number' ? options.lastIndex : regexp.lastIndex;
    return clonedRegexp;
  }

  var _$exec;
  var supportsGroups = ('groups' in ((_$exec = /a/.exec('a')) != null ? _$exec : {}));
  /**
   * @param {RegExpExecArray?} previousMatch
   * @param {RegExpExecArray?} match
   */

  var isInfiniteLoop = function isInfiniteLoop(previousMatch, match) {
    var isLooselyTrue = (previousMatch == null ? void 0 : previousMatch[0]) === (match == null ? void 0 : match[0]) && (previousMatch == null ? void 0 : previousMatch.index) === (match == null ? void 0 : match.index);

    if (isLooselyTrue) {
      return JSON.stringify(_extends({}, previousMatch)) === JSON.stringify(_extends({}, match));
    }

    return false;
  };

  var INFINITE_LOOP_ERROR = 'Infinite loop.';
  /**
   * @param {string|RegExp} matcher
   * @param {boolean}       skipCloning
   */

  function resolveMatcher(matcher, skipCloning) {
    if (skipCloning === void 0) {
      skipCloning = false;
    }

    if (!(matcher instanceof RegExp)) {
      return new RegExp(matcher, 'g');
    }

    if (skipCloning) {
      return matcher;
    }

    return clonedRegexp(matcher);
  }
  /**
   * Returns an iterator of all results matching a string against a regular expression, including capturing groups.
   *
   * @param   {string}                             string  String to match.
   * @param   {string|RegExp}                      matcher Value to match original string. If a non-`RegExp` object is passed, it is implicitly converted to a `RegExp` by using `new RegExp(regexp, 'g')`. The `RegExp` object must have the `global` flag, otherwise a `TypeError` will be thrown.
   *
   * @returns {IterableIterator<RegExpMatchArray>}
   */


  function ponyfill(string, matcher) {
    if (typeof string !== 'string') {
      throw new TypeError('Expected a string');
    }

    var composedMatcher = resolveMatcher(matcher);
    var globalFlag = composedMatcher.global;

    if (!globalFlag) {
      throw new TypeError('`String.prototype.matchAll` ponyfill called with a non-global RegExp argument');
    }
    /** @type {RegExpMatchArray[]} */


    var matches = [];
    var match, previousMatch;

    try {
      previousMatch = null;

      while ((match = composedMatcher.exec(string)) !== null) {
        if (isInfiniteLoop(previousMatch, match)) {
          throw new Error(INFINITE_LOOP_ERROR);
        }

        previousMatch = match;
        matches.push(match);
      }
    } catch (error) {
      /* istanbul ignore if */
      if (!(error instanceof Error && error.message === INFINITE_LOOP_ERROR)) {
        throw error;
      }

      matches.pop();
      string.replace(composedMatcher, function (value, index, input, groups) {
        /** @type {RegExpMatchArray} */
        var match = [value];
        match.index = index;
        match.input = input;

        if (supportsGroups) {
          match.groups = groups;
        }

        matches.push(match);
        return value;
      });
    }

    if (typeof Symbol === 'undefined') {
      // @ts-ignore
      return matches[iterator]();
    }

    return matches[Symbol.iterator]();
  }
  /**
   * Returns an iterator of all results matching a string against a regular expression, including capturing groups. Uses native implementation if available.
   *
   * @param   {string}                             string  String to match.
   * @param   {string|RegExp}                      matcher Value to match original string. If a non-`RegExp` object is passed, it is implicitly converted to a `RegExp` by using `new RegExp(regexp, 'g')`. The `RegExp` object must have the `global` flag, otherwise a `TypeError` will be thrown.
   *
   * @returns {IterableIterator<RegExpMatchArray>}
   */


  function preferNative(string, matcher) {
    if (typeof String.prototype.matchAll !== 'undefined') {
      var composedMatcher = resolveMatcher(matcher, true);
      return string.matchAll(composedMatcher);
    }
    /* istanbul ignore next */


    return ponyfill(string, matcher);
  }

  /* eslint-disable quote-props */
  function invertMapping(obj) {
    var result = {};

    var _keys = Object.keys(obj);

    for (var i = 0, length = _keys.length; i < length; i++) {
      result[obj[_keys[i]]] = _keys[i];
    }

    return result;
  }

  var CarakanConst;

  (function (_CarakanConst) {
    var LATIN = _CarakanConst.LATIN = {
      CONSONANTS: "dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB]",
      CONSONANTS_PANYIGEG: "ng|[rh]",
      CONSONANTS_MURDA: "NY|[NKTSPGB]",
      CONSONANTS_UPPERCASE_WITHOUT_MURDA: "DH|TH|NG|KH|DZ|SY|GH|[^N]Y|[HCRDWLJMZFV]",
      CONSONANTS_WITHOUT_PANYIGEG: "dh|ny|th|kh|dz|sy|gh|NY|[nckdtswlpjymgbzfvNKTSPGB]",
      DIGITS: "[\\d]",
      DIGITS_PUNC: "[\\d]+|[:()'\"|<>{}?!]",
      DOT_COMMA: "[.,]",
      SPACE: "[\\u0020]",
      VOWELS: "[aiueoxAIUEOX\xC9\xCA\xC8\xE9\xEA\xE8]",
      VOWELS_SWARA: "[AIUEO]",
      EXCEPT_SWARA: "[^AIUEO]",
      CAPTURE_RESIDUE: "(?=[A-Za-zÀ-ÿ])(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?(dh|ny|th|ng|kh|dz|sy|gh|NY|[hncrkdtswlpjymgbzfvNKTSPGB])?([aiueoxAIUEOXÉÈéè])?"
    };
    var CARAKAN = _CarakanConst.CARAKAN = {
      ANGKA: "[\\uA9D0-\\uA9D9]",
      NGLEGENA: "[\\uA98F-\\uA9B2]",
      CECAK_TELU: "[\\uA9B3]",
      SANDHANGAN_FINAL: "[\\uA980-\\uA983]",
      SWARA: "[\\uA984-\\uA98E]",
      SANDHANGAN: "[\\uA9B4-\\uA9BD]",
      CONSONANT_SIGN: "[\\uA9BE-\\uA9BF]",
      PANGKON: "[\\uA9C0]",
      PADA: "[\\uA9C1-\\uA9C6\\uA9C8-\\uA9CF]",
      PANGKAT: "[\\uA9C7]"
    };
    _CarakanConst.REGEX = {
      CAPTURE_LATIN: ["(".concat(LATIN.DIGITS_PUNC, ")"), "|", "(".concat(LATIN.CONSONANTS, ")?"), "(?!".concat(LATIN.SPACE, "(?!").concat(LATIN.VOWELS, "))"), "(".concat(LATIN.CONSONANTS, ")?"), "(".concat(LATIN.VOWELS, ")"), "(".concat(LATIN.CONSONANTS_PANYIGEG, ")?"), "(?!".concat(LATIN.VOWELS, ")"), "|", "(".concat(LATIN.CONSONANTS_WITHOUT_PANYIGEG, ")?"), "(".concat(LATIN.DOT_COMMA, ")"), "(?:".concat(LATIN.SPACE, ")?")].join(""),
      CAPTURE_CARAKAN: ["(".concat(LATIN.SPACE, ")"), "|(?:".concat(CARAKAN.PANGKAT, ")?(").concat(CARAKAN.ANGKA, ")(?:").concat(CARAKAN.PANGKAT, ")?"), "|(".concat(CARAKAN.NGLEGENA, ")(").concat(CARAKAN.CECAK_TELU, ")?(").concat(CARAKAN.PANGKON, ")?(").concat(CARAKAN.CONSONANT_SIGN, ")?(").concat(CARAKAN.SANDHANGAN, ")?(").concat(CARAKAN.SANDHANGAN, ")?(").concat(CARAKAN.SANDHANGAN_FINAL, ")?"), "|(".concat(CARAKAN.SWARA, ")"), "|(".concat(CARAKAN.PADA, ")")].join("")
    };
  })(CarakanConst || (CarakanConst = {}));
  var LatinConst = {
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
      "é": "e"
    }
  };
  var CarakanChars;

  (function (_CarakanChars) {
    _CarakanChars.NGLEGENA = {
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
      B: "ꦨ"
    };
    _CarakanChars.SWARA = {
      A: "ꦄ",
      I: "ꦅ",
      U: "ꦈ",
      E: "ꦌ",
      O: "ꦎ",

      /* Pa Cerek, Nga Lelet */
      rx: "ꦉ",
      lx: "ꦊ"
    };
    _CarakanChars.PASANGAN = {
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
      B: "꧀ꦨ"
    };
    _CarakanChars.SANDHANGAN = {
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
      pangkon: "꧀"
    };
    _CarakanChars.PADA = {
      lingsa: "꧈",
      lungsi: "꧉",
      pangkat: "꧇",
      adeg: "꧊",
      adegadeg: "꧋",
      piseleh: "꧌",
      piselehwalik: "꧍",
      rerenggankiwa: "꧁",
      rerenggantengen: "꧂"
    };
    _CarakanChars.ANGKA = {
      1: "꧑",
      2: "꧒",
      3: "꧓",
      4: "꧔",
      5: "꧕",
      6: "꧖",
      7: "꧗",
      8: "꧘",
      9: "꧙",
      0: "꧐"
    };
    _CarakanChars.MISC = {
      zwnj: "‌"
    };
  })(CarakanChars || (CarakanChars = {}));
  var LatinChars;

  (function (_LatinChars) {
    _LatinChars.SWARA = invertMapping({
      A: "ꦄ",
      I: "ꦅ",
      U: "ꦈ",
      E: "ꦌ",
      O: "ꦎ",

      /* Pa Cerek, Nga Lelet */
      re: "ꦉ",
      le: "ꦊ"
    });
    _LatinChars.NGLEGENA = invertMapping(CarakanChars.NGLEGENA);
    _LatinChars.PASANGAN = invertMapping(CarakanChars.PASANGAN);
    _LatinChars.SANDHANGAN = invertMapping({
      'i': "ꦶ",
      'u': "ꦸ",
      'é': "ꦺ",
      'o': "ꦺꦴ",
      'e': "ꦼ",
      'ng': "ꦁ",
      'h': "ꦃ",
      'r': "ꦂ",
      're': "ꦽ"
    });
    _LatinChars.CONSONANT_SIGN = invertMapping({
      'r': "ꦿ",
      'y': "ꦾ"
    });
    _LatinChars.PADA = invertMapping({
      ',': "꧈",
      '.': "꧉",
      ':': "꧇",
      '"': "꧊",
      '|': "꧋",
      '<': "꧌",
      '>': "꧍",
      '{': "꧁",
      '}': "꧂"
    });
    _LatinChars.ANGKA = invertMapping(CarakanChars.ANGKA);
    _LatinChars.MISC = invertMapping(CarakanChars.MISC);
  })(LatinChars || (LatinChars = {}));

  /**
   * @description Provides many helper function to get Javanese unicode characters
   */

  var CarakanHelper;

  (function (_CarakanHelper) {
    _CarakanHelper.isDigit = function (str) {
      return RegExp(CarakanConst.LATIN.DIGITS, "g").test(str);
    };

    _CarakanHelper.isSpace = function (str) {
      return RegExp(CarakanConst.LATIN.SPACE, "g").test(str);
    };

    var getMain = _CarakanHelper.getMain = function (_char) {
      if (_char == null) return "";
      if (_char in CarakanChars.SWARA) return CarakanChars.SWARA[_char];
      if (_char in CarakanChars.NGLEGENA) return CarakanChars.NGLEGENA[_char];
      return _char;
    };

    var getSonorant = _CarakanHelper.getSonorant = function (_char2) {
      if (_char2 == null) return "";
      if (_char2 === "r") return CarakanChars.SANDHANGAN["cakra"];
      if (_char2 === "y") return CarakanChars.SANDHANGAN["pengkal"];
      if (_char2 === "rx") return CarakanChars.SANDHANGAN["keret"];
      if (_char2 in CarakanChars.PASANGAN) return CarakanChars.PASANGAN[_char2];
      return _char2;
    };

    var getVowel = _CarakanHelper.getVowel = function (_char3) {
      if (_char3 == null) return "";

      switch (_char3.toLowerCase()) {
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

      return _char3;
    };

    var getFinal = _CarakanHelper.getFinal = function (_char4) {
      if (_char4 == null) return "";
      if (_char4 === "r") return CarakanChars.SANDHANGAN["layar"];
      if (_char4 === "h") return CarakanChars.SANDHANGAN["wignyan"];
      if (_char4 === "ng") return CarakanChars.SANDHANGAN["cecak"];
      if (_char4 === "pangkon") return CarakanChars.SANDHANGAN["pangkon"];
      return CarakanChars.PASANGAN[_char4];
    };

    _CarakanHelper.getPunctuation = function (_char5) {
      if (_char5 == null) return "";

      switch (_char5) {
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

      return _char5;
    };

    _CarakanHelper.getNumber = function (_char6) {
      if (_char6 == null) return "";
      if (_char6 in CarakanChars.ANGKA) return CarakanChars.ANGKA[_char6];
      return "";
    };

    _CarakanHelper.getMisc = function (_char7) {
      if (_char7 == null) return "";
      if (_char7 in CarakanChars.MISC) return CarakanChars.MISC[_char7];
      return "";
    };

    _CarakanHelper.returnResidue = function (residue) {
      var _ref;

      var groups = (_ref = _toConsumableArray(preferNative(residue, RegExp(CarakanConst.LATIN.CAPTURE_RESIDUE, "g")))) === null || _ref === void 0 ? void 0 : _ref[0];
      if (groups == null) return "";

      if (groups[3] == null) {
        return getMain(groups[1]) + getFinal("pangkon");
      } else {
        return getMain(groups[1]) + getSonorant(groups[2]) + getVowel(groups[3]);
      }
    };

    _CarakanHelper.normalizeAccents = function (text) {
      var pattern = new RegExp(Object.keys(LatinConst.ACCENTS_MAP).join("|"), "g");
      return text.replace(pattern, function (matched) {
        if (matched === "E") matched = "E(?!`)";
        if (matched === "e") matched = "e(?!`)";
        return LatinConst.ACCENTS_MAP[matched];
      });
    };
  })(CarakanHelper || (CarakanHelper = {}));

  var CarakanHelper$1 = CarakanHelper;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * @classdesc Compiles and build the transliterated syllable into a defined order
   */

  var SyllableBuilder = /*#__PURE__*/function () {
    /* Parameters */

    /* Building blocks */
    function SyllableBuilder(matchGroups, residue, input, isLastOfInput) {
      _classCallCheck(this, SyllableBuilder);

      _defineProperty(this, "matchGroups", void 0);

      _defineProperty(this, "residue", void 0);

      _defineProperty(this, "input", void 0);

      _defineProperty(this, "isLastOfInput", void 0);

      _defineProperty(this, "nonLetter", void 0);

      _defineProperty(this, "preMain", void 0);

      _defineProperty(this, "main", void 0);

      _defineProperty(this, "sonorant", void 0);

      _defineProperty(this, "afterSonorant", void 0);

      _defineProperty(this, "vowel", void 0);

      _defineProperty(this, "final", void 0);

      _defineProperty(this, "postFinal", void 0);

      this.matchGroups = matchGroups;
      this.residue = residue;
      this.input = input;
      this.isLastOfInput = isLastOfInput;
      this.nonLetter = "";
      this.preMain = "";
      this.main = "";
      this.sonorant = "";
      this.afterSonorant = "";
      this.vowel = "";
      this["final"] = "";
      this.postFinal = "";
    }

    _createClass(SyllableBuilder, [{
      key: "build",
      value: function build() {
        var useResidue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (useResidue) {
          this.preMain = CarakanHelper$1.returnResidue(this.residue);
        }
        /* Get last residue on the end of input string which isn't picked up yet */


        var finalIndex = this.matchGroups.index + this.matchGroups[0].length;

        if (this.isLastOfInput && this.input.length > finalIndex) {
          var lastResidue = this.input.slice(finalIndex);

          if (!CarakanHelper$1.isSpace(lastResidue)) {
            this.postFinal = CarakanHelper$1.getMain(lastResidue) + CarakanHelper$1.getFinal("pangkon");
          }
        }

        if (this.nonLetter.length > 0) return this.preMain + this.nonLetter;
        return this.preMain + this.main + this.sonorant + this.afterSonorant + // Cakra and Cakra Keret below Sandhangan
        this.vowel + this["final"] + this.postFinal;
      }
    }]);

    return SyllableBuilder;
  }();
  /**
   * @description A simple class that helps to compile and build the transliterated syllable to Latin.
   */

  var LatinBuilder = /*#__PURE__*/function () {
    function LatinBuilder() {
      _classCallCheck(this, LatinBuilder);

      _defineProperty(this, "result", void 0);

      this.result = "";
    }

    _createClass(LatinBuilder, [{
      key: "add",
      value: function add(input) {
        this.result += input;
      }
    }, {
      key: "build",
      value: function build(input) {
        if (input) this.result = input;
        return this.result;
      }
    }]);

    return LatinBuilder;
  }();

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  /* TYPES */

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
  var toJavanese = function toJavanese(input, config) {
    config = _objectSpread({
      useAccents: false,
      useSwara: true,
      useMurda: true
    }, config);
    /* Normalize whitespaces */

    input = input.trim().replace(/\s+/g, " ");
    /* Lowercase all consonants except Aksara Murda */

    input = input.replace(RegExp(CarakanConst.LATIN.CONSONANTS_UPPERCASE_WITHOUT_MURDA, "g"), function (_char) {
      return _char.toLowerCase();
    });
    /* Normalize accents in accented mode */

    if (config.useAccents) input = CarakanHelper$1.normalizeAccents(input);
    /* Make all vowels lowercase if Aksara Swara is disabled */

    if (!config.useSwara) input = input.replace(RegExp(CarakanConst.LATIN.VOWELS_SWARA, "g"), function (_char2) {
      return _char2.toLowerCase();
    });
    /* Make all Aksara Murda consonants lowercase if Aksara Murda is disabled */

    if (!config.useMurda) input = input.replace(RegExp(CarakanConst.LATIN.CONSONANTS_MURDA, "g"), function (_char3) {
      return _char3.toLowerCase();
    });
    /*
     * Here, we break down the input on a per syllable basis using RegEx,
     * iterate and feed it into the syllable converter,
     * and append the result to the output string.
     */

    var syllables = _toConsumableArray(preferNative(input, RegExp(CarakanConst.REGEX.CAPTURE_LATIN, "g")));

    var output = "";

    if (syllables.length > 0) {
      var _iterator = _createForOfIteratorHelper$1(syllables.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _syllables;

          var _step$value = _slicedToArray(_step.value, 2),
              i = _step$value[0],
              current = _step$value[1];

          var previous = (_syllables = syllables[i - 1]) !== null && _syllables !== void 0 ? _syllables : null;
          var isLastOfInput = i === syllables.length - 1;
          var residue = "";

          if (previous != null && previous.index != null) {
            var residueIndex = previous.index + previous[0].length;
            residue = input.slice(residueIndex, current.index);
          } else {
            residue = input.slice(0, current.index);
          }

          output += getTransliteration$1(current, residue, isLastOfInput);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return output;
  };
  /**
   * @description Converts the already broken down syllable into Javanese script
   */

  var getTransliteration$1 = function getTransliteration(matchGroups, residue, isLastOfInput) {
    /* Assign each capture groups into variable names */
    var _matchGroups$slice = matchGroups.slice(1, 9),
        _matchGroups$slice2 = _slicedToArray(_matchGroups$slice, 7),
        digits_or_punc = _matchGroups$slice2[0],
        consonant_initial = _matchGroups$slice2[1],
        consonant_sonorant = _matchGroups$slice2[2],
        vowel = _matchGroups$slice2[3],
        consonant_panyigeg = _matchGroups$slice2[4],
        consonant_final = _matchGroups$slice2[5],
        dot_or_comma = _matchGroups$slice2[6];

    var builder = new SyllableBuilder(matchGroups, residue, matchGroups.input, isLastOfInput);
    /* Converts syllable containing numbers or punctuation */

    if (digits_or_punc != null) {
      if (CarakanHelper$1.isDigit(digits_or_punc)) {
        var numbers = digits_or_punc.split("").map(function (digit) {
          return CarakanHelper$1.getNumber(digit);
        }).join("");
        var padaPangkat = CarakanHelper$1.getPunctuation(":");
        builder.nonLetter = padaPangkat + numbers + padaPangkat;
      } else {
        builder.nonLetter = CarakanHelper$1.getPunctuation(digits_or_punc);
      }

      return builder.build();
    }
    /* Converts syllable containing dots and commas */


    if (dot_or_comma != null) {
      if (dot_or_comma === ",") {
        if (consonant_final != null) {
          builder.nonLetter = CarakanHelper$1.getMain(consonant_final) + CarakanHelper$1.getFinal("pangkon") + CarakanHelper$1.getMisc("zwnj");
        } else {
          builder.nonLetter = CarakanHelper$1.getPunctuation(",");
        }
      } else {
        if (consonant_final != null) {
          builder.nonLetter = CarakanHelper$1.getMain(consonant_final) + CarakanHelper$1.getFinal("pangkon") + CarakanHelper$1.getPunctuation(",");
        } else {
          builder.nonLetter = CarakanHelper$1.getPunctuation(".");
        }
      }

      return builder.build();
    }
    /* Converts syllable containing only vowels, without any initial consonants */


    if (consonant_initial == null) {
      if (vowel.match(RegExp(CarakanConst.LATIN.VOWELS_SWARA, "g"))) {
        builder.main = CarakanHelper$1.getMain(vowel);
      } else {
        builder.main = CarakanHelper$1.getMain("h") + CarakanHelper$1.getVowel(vowel);
      }

      builder["final"] = CarakanHelper$1.getFinal(consonant_panyigeg);
      return builder.build();
    }
    /* Converts syllable with Cakra and Cakra Keret */


    if (consonant_sonorant === "r") {
      var useResidue = true;

      if (residue.length > 0 && !CarakanHelper$1.isSpace(residue)) {
        /* Place the Cakra/Cakra keret on the bottom of pasangan */
        builder.main = CarakanHelper$1.getMain(residue);
        builder.sonorant = CarakanHelper$1.getSonorant(consonant_initial);

        if (vowel !== "x") {
          builder.afterSonorant = CarakanHelper$1.getSonorant("r");
          builder.vowel = CarakanHelper$1.getVowel(vowel);
        } else {
          builder.afterSonorant = CarakanHelper$1.getSonorant("rx");
        }

        useResidue = false;
      } else {
        /* Place the Cakra/Cakra keret on the bottom of main letter */
        builder.main = CarakanHelper$1.getMain(consonant_initial);

        if (vowel === "x") {
          builder.sonorant = CarakanHelper$1.getSonorant("rx");
        } else {
          builder.sonorant = CarakanHelper$1.getSonorant(consonant_sonorant);
          builder.vowel = CarakanHelper$1.getVowel(vowel);
        }
      }

      builder["final"] = CarakanHelper$1.getFinal(consonant_panyigeg);
      return builder.build(useResidue);
    }

    var useGanten = consonant_initial.match(/[rl]/g) && consonant_sonorant == null && vowel === "x";

    if (useGanten) {
      builder.main = CarakanHelper$1.getMain("".concat(consonant_initial, "x"));
      builder["final"] = CarakanHelper$1.getFinal(consonant_panyigeg);
      return builder.build();
    }

    builder.main = CarakanHelper$1.getMain(consonant_initial);
    builder.sonorant = CarakanHelper$1.getSonorant(consonant_sonorant);
    builder.vowel = CarakanHelper$1.getVowel(vowel);
    builder["final"] = CarakanHelper$1.getFinal(consonant_panyigeg);
    return builder.build();
  };

  /**
   * @description Provides many helper function to get Latin characters from Sundanese characters
   */

  var LatinHelper;

  (function (_LatinHelper) {
    _LatinHelper.getLetter = function (_char) {
      if (_char == null) return "";
      if (_char in LatinChars.SWARA) return LatinChars.SWARA[_char];
      if (_char in LatinChars.NGLEGENA) return LatinChars.NGLEGENA[_char];
      return _char;
    };

    _LatinHelper.getPasangan = function (_char2) {
      if (_char2 == null) return "";
      if (_char2 in LatinChars.PASANGAN) return LatinChars.PASANGAN[_char2];
      return _char2;
    };

    _LatinHelper.getSandhangan = function (_char3) {
      if (_char3 == null) return "";
      if (_char3 in LatinChars.SANDHANGAN) return LatinChars.SANDHANGAN[_char3];
      return _char3;
    };

    _LatinHelper.getConsonantSign = function (_char4) {
      if (_char4 == null) return "";
      if (_char4 in LatinChars.CONSONANT_SIGN) return LatinChars.CONSONANT_SIGN[_char4];
      return _char4;
    };

    _LatinHelper.getPada = function (_char5) {
      if (_char5 == null) return "";
      if (_char5 in LatinChars.PADA) return LatinChars.PADA[_char5];
      return _char5;
    };

    _LatinHelper.getNumber = function (_char6) {
      if (_char6 == null) return "";
      if (_char6 in LatinChars.ANGKA) return LatinChars.ANGKA[_char6];
      return _char6;
    };

    _LatinHelper.getMisc = function (_char7) {
      if (_char7 == null) return "";
      if (_char7 in LatinChars.MISC) return LatinChars.MISC[_char7];
      return _char7;
    };
  })(LatinHelper || (LatinHelper = {}));

  var LatinHelper$1 = LatinHelper;

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  /**
   * @function toLatin
   * @description Transliterate a string in Javanese characters into its corresponding form in Latin.
   * @param input The input string in Javanese script to be converted.
   * @returns The converted string in Latin.
   * @example
   * toLatin("ꦏꦂꦪ")
   * // => karya
   */

  var toLatin = function toLatin(input) {
    /* Trim input */
    input = input.trim();
    /*
     * Here, we break down the input on a per-syllable basis using RegEx,
     * iterate and feed it into the syllable transliterator,
     * and append the result to the output string.
     */

    var syllables = _toConsumableArray(preferNative(input, RegExp(CarakanConst.REGEX.CAPTURE_CARAKAN, "g")));

    var output = "";

    if (syllables.length > 0) {
      var _iterator = _createForOfIteratorHelper(syllables),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var group = _step.value;
          output += getTransliteration(group);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return output;
  };
  /**
   * @description Converts the already broken down syllable into Sundanese script
   */

  var getTransliteration = function getTransliteration(groups) {
    /* Assign each capture groups into variable names */
    var _groups$slice = groups.slice(1, 12),
        _groups$slice2 = _slicedToArray(_groups$slice, 11),
        space = _groups$slice2[0],
        angka = _groups$slice2[1],
        ngalagena = _groups$slice2[2],
        cecak_telu = _groups$slice2[3],
        pangkon = _groups$slice2[4],
        con_sign = _groups$slice2[5],
        sandhangan1 = _groups$slice2[6],
        sandhangan2 = _groups$slice2[7],
        sandhangan_final = _groups$slice2[8],
        swara = _groups$slice2[9],
        pada = _groups$slice2[10];

    var builder = new LatinBuilder();
    /* Converts syllable containing numbers */

    if (angka != null) {
      return builder.build(LatinHelper$1.getNumber(angka));
    }
    /* Converts syllable containing letters */


    if (ngalagena != null) {
      /* Add cecak telu to get loan letter if cecak telu indeed exists in the syllable */
      builder.add(LatinHelper$1.getLetter(ngalagena + (cecak_telu !== null && cecak_telu !== void 0 ? cecak_telu : "")));
      /* if there's no pangkon, there might be consonant sign or sandhangan*/

      if (pangkon == null) {
        /* Converts consonant sign */
        if (con_sign != null) {
          builder.add(LatinHelper$1.getConsonantSign(con_sign));
        }
        /* Converts sandhangan */


        if (sandhangan1 != null && sandhangan2 == null) {
          builder.add(LatinHelper$1.getSandhangan(sandhangan1));
        } else if (sandhangan1 != null && sandhangan2 != null) {
          /* Sandhangan2 in case of taling-tarung */
          builder.add(LatinHelper$1.getSandhangan(sandhangan1 + sandhangan2));
        } else {
          builder.add("a");
        }
        /* Converts final sandhangan */


        if (sandhangan_final != null) {
          builder.add(LatinHelper$1.getSandhangan(sandhangan_final));
        }
      }
    }

    if (swara != null) {
      /* Converts swara */
      builder.add(LatinHelper$1.getLetter(swara));
    }

    if (pada != null) {
      /* Converts pada */
      builder.add(LatinHelper$1.getPada(pada));
    }

    if (space != null) {
      /* Modern Carakan is not scriptio continuo, so add space if it exists */
      builder.add(" ");
    }

    return builder.build();
  };

  exports.CarakanHelper = CarakanHelper$1;
  exports.toJavanese = toJavanese;
  exports.toLatin = toLatin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
