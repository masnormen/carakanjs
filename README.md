<p align="center">
<img src="https://user-images.githubusercontent.com/3425302/140653792-488f6da0-b934-4f4a-bb2d-84aad6a88e9d.png">
</p>

# Carakan.js

[![npm](https://img.shields.io/npm/v/carakanjs?color=green)](https://www.npmjs.com/package/carakanjs)
[![size](https://img.shields.io/github/repo-size/masnormen/carakanjs?color=green)](https://github.com/masnormen/carakanjs)
[![madein](https://img.shields.io/badge/made%20in-Indonesia-red)](https://github.com/masnormen/carakanjs)

**Carakan.js** is a small library for converting/transliterating Latin script into Javanese script, also known as Aksara Jawa or Carakan.

## :eyes: Why this library?

Yes, I know there are already many Javanese script transliterating library out there, but they are **not accurate**. At least for some words with complicated syllable structure due to the nature of Javanese language. Like "ngglembyar", "nggrambyang".

The complexity of Javanese script writing rules made things difficult. Therefore, I want to create a library to create a more accurate transliteration from Latin into Javanese script and vice versa with the linguistic complexity and ease of use in mind, so we can just input the regular Javanese text we usually read and write in Latin text in our everyday conversations.

Carakan.js is also fast, needing only less than ***2 milliseconds*** to convert a simple sentence. The library is also ***extensively tested*** using various sentences and use cases. You can see the tests [here](https://github.com/masnormen/carakanjs/blob/master/tests/index.spec.ts).

## :open_book: Table of Contents

- [Carakan.js](#carakanjs)
  * [:eyes: Why this library?](#eyes-why-this-library)
  * [:open_book: Table of Contents](#open_book-table-of-contents)
  * [:rocket: Features](#rocket-features)
  * [:package: Installation](#package-installation)
  * [:keyboard: Usage](#keyboard-usage)
  * [:asterisk: Table of Punctuations](#asterisk-table-of-punctuations)
  * [:fire: API](#fire-api)
    + [toJavanese(input, config?)](#tojavaneseinput-config)
      - [input](#input)
      - [config.useAccents](#configuseaccents)
      - [config.useSwara](#configuseswara)
      - [config.useMurda](#configusemurda)
    + [CarakanHelper](#carakanhelper)
  * [:toolbox: TODO](#toolbox-todo)
  * [:books: References](#books-references)

## :rocket: Features

Currently, Carakan.js can handle:

- Basic Hanacaraka (20 basic characters) and its Pasangan
- Sandhangan Swara (wulu, taling, pepet, suku, taling tarung) 
- Sandhangan Wyanjana (cakra, wignyan, etc) and Panjingan
- Angka
- Aksara Swara
- Aksara Rekan
- Aksara Murda
- Aksara Ganten
- Pada (Punctuations)
- Supports accents (like Wikipedia Basa Jawa)
- ...and many more (see the code yourself!)

## :package: Installation

NPM:

```sh
$ npm install carakanjs
```

Yarn:

```sh
$ yarn add carakanjs
```

## :keyboard: Usage

**Example with default options**

```js
import { toJavanese } from "carakanjs";

let x = toJavanese("blumbang gxmblundhung kxmambang");

// with default configs (optional)
let x = toJavanese("blumbang gxmblundhung kxmambang", {useAccents: false, useSwara: true, useMurda: true})

console.log(x)

// => ꦧ꧀ꦭꦸꦩ꧀ꦧꦁꦒꦼꦩ꧀ꦧ꧀ꦭꦸꦤ꧀ꦝꦸꦁꦏꦼꦩꦩ꧀ꦧꦁ
```

**Writing Pepet and Taling sounds (with default config)**

```js
// pepet is "x"
// taling is "e"

toJavanese("es dawxt");
// => ꦲꦺꦱ꧀ꦢꦮꦼꦠ꧀
```

**Writing Pepet and Taling sounds (with `useAccents = true`)**

```js
// pepet is "e"
// taling is "é", "è", or "e`" (e + backtick)


toJavanese("e`s dawet", {useAccents: true});
// or
toJavanese("és dawet", {useAccents: true});
// => ꦲꦺꦱ꧀ꦢꦮꦼꦠ꧀

// example text from Wikipedia basa Jawa
toJavanese(
  "référèndhum menika mutusaken Timor Wétan pisah",
  {useAccents: true}
);
// => ꦫꦺꦥ꦳ꦺꦫꦺꦤ꧀ꦝꦸꦩ꧀ꦩꦼꦤꦶꦏꦩꦸꦠꦸꦱꦏꦼꦤ꧀ꦡꦶꦩꦺꦴꦂꦮꦺꦠꦤ꧀ꦥꦶꦱꦃ
```

**Writing Aksara Swara, Murda, and Rekan**

```js
toJavanese("GUSTI ALLAH YA KHALIK");

// => ꦓꦸꦯ꧀ꦡꦶꦄꦭ꧀ꦭꦃꦪꦏ꦳ꦭꦶꦑ꧀
```

**Writing Angka (Numbers)**

```js
// pada pangkat (꧇) will be automatically added around numbers
toJavanese("tanggal 17 bulan 8 taun 1945");

// => ꦠꦁꦒꦭ꧀꧇꧑꧗꧇ꦧꦸꦭꦤ꧀꧇꧘꧇ꦠꦲꦸꦤ꧀꧇꧑꧙꧔꧕꧇
```

**Writing Pada (Punctuations)**

```js
toJavanese("{<||,:.'\":()>}");

// => ꧁꧌꧋꧋꧈꧇꧉꧊꧊꧇꧊꧊꧍꧂
```

**Writing Aksara Ganten & Panjingan**

```js
toJavanese("kreta krxtxg, lxmah rxgxd");

// => ꦏꦿꦺꦠꦏꦽꦠꦼꦒ꧀‌ꦊꦩꦃꦉꦒꦼꦢ꧀
```

## :asterisk: Table of Punctuations

|Name              |Input              |Output     |
|------------------|-------------------|-----------|
|Pada lingsa *     |,                  |꧈          |
|Pada lungsi *     |.                  |꧉          |
|Pada pangkat      |:                  |꧇          |
|Pada adeg         |" or ' or ( or )  |꧊          |
|Pada adeg-adeg    |&#124;                |꧋         |
|Pada piseleh      |<                  |꧌ ......    |
|Pada piseleh walik|\>                  |...... ꧍     |
|Rerenggan kiwa     |{                  |꧁ ...     |
|Rerenggan tengen   |}                  |... ꧂      |

*) Pada Lingsa (comma) will not be rendered if a Pangkon is next to it. Pada Lungsi (period) will be reduced into Pada Lingsa if a Pangkon is next to it. This behavior is adheres to the rules of Javanese writing.

## :fire: API

Carakan.js package exports two things: `toJavanese()` function and `CarakanHelper` namespace which contains various helper.

### toJavanese(input, config?)

Returns a string of Javanese script converted from `input`, using the set `config`s.

#### input
Type: `string`

A string of Latin character which will be transliterated into Javanese script.

#### config.useAccents
Type: `boolean`, default: `false`

A boolean indicating whether Carakan.js should convert the input string with accents. There are two modes of input: 

- **Non-accented mode (default)**
  In this mode, Carakan.js will treat the letter "x" as Pepet (schwa sound) and "e" as Taling (see examples above).
- **Accented mode**
  The "formally and academically correct" way to write Javanese in Latin. Typically used in Wikipedia basa Jawa texts. In this mode, Carakan.js will treat the letter "e" as Pepet, "é"/"è"/"e\`" as Taling. "x" will still be treated as Pepet (see examples above).
  
Basically, the transliterator engine can only read string in non-accented mode. When `useAccents` is set to `true`, Carakan.js will convert the accented input into non-accented mode first, so then it can convert them into Javanese script.

#### config.useSwara
Type: `boolean`, default: `true`

A boolean indicating whether Carakan.js should convert uppercase vowels (A, I, U, E, O) into Aksara Swara. If set to `false`, Carakan.js will render them as regular vowels sound written with the letter "ha".

#### config.useMurda
Type: `boolean`, default: `true`

A boolean indicating whether Carakan.js should convert some uppercase consonants (N, K, T, S, P, NY, G, B) into Aksara Murda. If set to `false`, Carakan.js will render them with their regular Javanese script character.

### CarakanHelper

A namespace which contains various helper for the engine to convert latin letters into Javanese Script.

## :toolbox: TODO

- [ ] support transliteration of Javanese script back to Latin
- [ ] support more Sandhangan: Swara Dirga (for long vowels, typically used to  write Sanskrit)
- [ ] support more punctuations: Pangrangkep, Pada Luhur, Pada Windu, Purwa Pada, Madya Pada, Wasana Pada

## :books: References

- [Panduan Singkat Tipografi Aksara Jawa (Kongres Bahasa Jawa/Bayu, 2019)](https://kongresaksarajawa.id/bayu%20(2019)%20tabel%20dan%20panduan%20singkat%20tipografi%20aksara%20jawa%20(1).pdf)
- [Pedoman Umum Ejaan Bahasa Jawa Huruf Latin (Kemdikbud, 2006)](http://repositori.kemdikbud.go.id/1672/1/Pedoman%20Umum%20Ejaan%20Bahasa%20Jawa%20Huruf%20Latin%202006.pdf)
- [Fonotaktik bahasa Jawa (Wikipedia ID)](https://id.wikipedia.org/wiki/Bahasa_Jawa#Fonotaktik)
- [Consonants in Javanese (Wikipedia EN)](https://en.wikipedia.org/wiki/Javanese_language#Consonants)
- [Javanese script (Wikipedia EN)](https://en.wikipedia.org/wiki/Javanese_script)
