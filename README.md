# carakan.js

[![npm](https://img.shields.io/npm/v/carakanjs?color=green)](https://www.npmjs.com/package/carakanjs)
[![size](https://img.shields.io/github/repo-size/masnormen/carakanjs?color=green)](https://github.com/masnormen/carakanjs)

**carakan.js** is a small library for converting Latin script into Javanese script, also known as Aksara Jawa/Carakan.


### Why this library?

Yes, I know there are already many Javanese script transliterating library out there. But they are **not accurate**. At least for some words with complicated syllable structure due to the nature of Javanese language. Like "ngglembyar", "nggrambyang".

It is caused by the complexity of Javanese script writing rules. Therefore I want to create a library to create a more accurate transliteration from Latin into Javanese script and vice versa with the linguistic complexity and ease of use in mind.

## Usage

**Normal Usage**
```js
import { toCarakan } from "carakanjs";

// Example input with default options

const example = toCarakan("aku ambyar", {
  diacritics: false,
  swaraMurda: true
});  // ꦲꦏꦸꦲꦩ꧀ꦧꦾꦂ
```

**Writing pepet and taling (/ə/ and /e/ sound)**
```js
const esDawet1 = toCarakan("es dawxt"); // ꦲꦺꦱ꧀ꦢꦮꦼꦠ꧀
const gembeng1 = toCarakan("gxmbeng"); // ꦒꦼꦩ꧀ꦧꦺꦁ

// "Diacritics" mode, false by default. You can use grave accent or accented 'e'.

const esDawet2 = toCarakan("e\`s dawet", {diacritics: true}); // ꦲꦺꦱ꧀ꦢꦮꦼꦠ꧀
const gembeng2 = toCarakan("gembe\`ng", {diacritics: true}); // ꦒꦼꦩ꧀ꦧꦺꦁ

// Another example. Useful when copy-pasting from Wikipedia Basa Jawa

const esDawet3 = toCarakan("és dawet", {diacritics: true}); // ꦲꦺꦱ꧀ꦢꦮꦼꦠ꧀
const gembeng3 = toCarakan("gembéng", {diacritics: true}); // ꦒꦼꦩ꧀ꦧꦺꦁ
```

**Writing aksara Murda and Swara**

Remember that aksara Murda only contains na, ka, ta, sa, pa, nya, ga, and ba.
```js
// true by default

const example1 = toCarakan("GuSTiAllah"); // ꦓꦸꦯ꧀ꦡꦶꦄꦭ꧀ꦭꦃ
const example2 = toCarakan("Banjar"); // ꦨꦤ꧀ꦗꦂ
const example3 = toCarakan("Banjar", {swaraMurda: false}); // ꦧꦤ꧀ꦗꦂ
```

**Writing punctuations (pada)**

|Name              |Typed              |Aksara Jawa|
|------------------|-------------------|-----------|
|Pada lingsa *     |,                  |꧈          |
|Pada lungsi *     |.                  |꧉          |
|Pada pangkat      |:                  |꧇          |
|Pada adeg         |" or ' or ( or )  |꧊          |
|Pada adeg-adeg    |&#124;                |꧋         |
|Pada piseleh      |<                  |꧌ ......    |
|Pada piseleh walik|\>                  |...... ꧍     |
|Rerengan kiwa     |{                  |꧁ ...     |
|Rerengan tengen   |}                  |... ꧂      |

*) Pada lingsa (comma) will not render if a pangkon is next to it. And pada lungsi (period) will become pada lingsa if a pangkon is next to it

This behavior is expected and actually adheres to the rules of Javanese writing.

## References

- https://id.wikipedia.org/wiki/Bahasa_Jawa#Fonotaktik
- https://en.wikipedia.org/wiki/Javanese_language#Consonants
- https://en.wikipedia.org/wiki/Javanese_script
