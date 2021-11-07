import Helper from "./Helper";

/**
 * @class JavaneseBuilder
 * @classdesc Compiles and build the transliterated syllable into a defined order
 */
export class SyllableBuilder {
  /* Parameters */
  matchGroups: RegExpMatchArray;
  residue: string;
  input: string;
  isLastOfInput: boolean;
  /* Building blocks */
  nonLetter: string;
  preMain: string;
  main: string;
  sonorant: string;
  afterSonorant: string;
  vowel: string;
  final: string;
  postFinal: string;

  constructor(matchGroups: RegExpMatchArray, residue: string, input: string, isLastOfInput: boolean) {
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
    this.final = "";
    this.postFinal = "";
  }

  build(useResidue: boolean = true): string {
    if (useResidue) {
      this.preMain = Helper.returnConsonant(this.residue);
    }
    /* Get last residue on the end of input string which isn't picked up yet */
    let finalIndex = (this.matchGroups.index as number) + this.matchGroups[0].length;
    if (this.isLastOfInput && this.input.length > finalIndex) {
      let lastResidue = this.input.slice(finalIndex);
      if (!Helper.isSpace(lastResidue)) {
        this.postFinal = Helper.getInitial(lastResidue) + Helper.getFinal("pangkon");
      }
    }

    if (this.nonLetter.length > 0) return this.preMain + this.nonLetter;

    return (
      this.preMain +
      this.main +
      this.sonorant +
      this.afterSonorant + // Cakra and Cakra Keret
      this.vowel +
      this.final +
      this.postFinal
    );
  }
}
