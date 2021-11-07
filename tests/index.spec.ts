import { toJavanese } from "../src";

describe("Basic functionality tests", () => {
  it("should convert all 20 Aksara Nglegena", () => {
    const result = toJavanese(
      "hanacaraka datasawala padhajayanya magabathanga"
    );
    const expected = "ꦲꦤꦕꦫꦏꦢꦠꦱꦮꦭꦥꦝꦗꦪꦚꦩꦒꦧꦛꦔ";
    expect(result).toEqual(expected);
  });

  it("should convert all Sandhangan Swara", () => {
    const result = toJavanese("sxlikur kadone");
    const expected = "ꦱꦼꦭꦶꦏꦸꦂꦏꦢꦺꦴꦤꦺ";
    expect(result).toEqual(expected);
  });

  it("should convert all Sandhangan Wyanjana", () => {
    const result = toJavanese(
      "kyai pangling kalih santri ingkang srxgxp nalika sasi ruwah"
    );
    const expected = "ꦏꦾꦲꦶꦥꦁꦭꦶꦁꦏꦭꦶꦃꦱꦤ꧀ꦠꦿꦶꦲꦶꦁꦏꦁꦱꦽꦒꦼꦥ꧀ꦤꦭꦶꦏꦱꦱꦶꦫꦸꦮꦃ";
    expect(result).toEqual(expected);
  });

  it("should convert all Pasangan of 20 basic characters", () => {
    const result = toJavanese(
      "alhalnalcal ralkal daltalsalwallal paldhaljalyalnyal malgalbalthalnga"
    );
    const expected =
      "ꦲꦭ꧀ꦲꦭ꧀ꦤꦭ꧀ꦕꦭ꧀ꦫꦭ꧀ꦏꦭ꧀ꦢꦭ꧀ꦠꦭ꧀ꦱꦭ꧀ꦮꦭ꧀ꦭꦭ꧀ꦥꦭ꧀ꦝꦭ꧀ꦗꦭꦾꦭ꧀ꦚꦭ꧀ꦩꦭ꧀ꦒꦭ꧀ꦧꦭ꧀ꦛꦭ꧀ꦔ";
    expect(result).toEqual(expected);
  });

  it("should convert all Pasangan of 20 basic characters with sandhangan swara", () => {
    const result = toJavanese(
      "alhilnelcul rolkxl daltilsulwellol pxldholjelyulnyil malgilbulthelngo"
    );
    const expected =
      "ꦲꦭ꧀ꦲꦶꦭ꧀ꦤꦺꦭ꧀ꦕꦸꦭ꧀ꦫꦺꦴꦭ꧀ꦏꦼꦭ꧀ꦢꦭ꧀ꦠꦶꦭ꧀ꦱꦸꦭ꧀ꦮꦺꦭ꧀ꦭꦺꦴꦭ꧀ꦥꦼꦭ꧀ꦝꦺꦴꦭ꧀ꦗꦺꦭꦾꦸꦭ꧀ꦚꦶꦭ꧀ꦩꦭ꧀ꦒꦶꦭ꧀ꦧꦸꦭ꧀ꦛꦺꦭ꧀ꦔꦺꦴ";
    expect(result).toEqual(expected);
  });

  it("should convert all Aksara Swara", () => {
    const result = toJavanese("Amerika Italia Uganda Oman Ekuador");
    const expected = "ꦄꦩꦺꦫꦶꦏꦅꦠꦭꦶꦲꦈꦒꦤ꧀ꦢꦎꦩꦤ꧀ꦌꦏꦸꦲꦢꦺꦴꦂ";
    expect(result).toEqual(expected);
  });

  it("should convert all Aksara Rekan", () => {
    const result = toJavanese("khabi adzan idgham zora fifa vivo");
    const expected = "ꦏ꦳ꦧꦶꦲꦢ꦳ꦤ꧀ꦲꦶꦢ꧀ꦒ꦳ꦩ꧀ꦗ꦳ꦺꦴꦫꦥ꦳ꦶꦥ꦳ꦮ꦳ꦶꦮ꦳ꦺꦴ";
    expect(result).toEqual(expected);
  });

  it("should convert all Aksara Murda", () => {
    const result = toJavanese("Na Ka Ta Sa Pa NYa Ga Ba");
    const expected = "ꦟꦑꦡꦯꦦꦘꦓꦨ";
    expect(result).toEqual(expected);
  });

  it("should convert combination of Aksara Swara, Rekan, and Murda", () => {
    const result = toJavanese("GUSTI ALLAH YA KHALIK");
    const expected = "ꦓꦸꦯ꧀ꦡꦶꦄꦭ꧀ꦭꦃꦪꦏ꦳ꦭꦶꦑ꧀";
    expect(result).toEqual(expected);
  });

  it("should convert sonorant sound 'r' into Cakra and Cakra Keret", () => {
    const result = toJavanese("krxtxg priyayi pratama kreta brutu kroto");
    const expected = "ꦏꦽꦠꦼꦒ꧀ꦥꦿꦶꦪꦪꦶꦥꦿꦠꦩꦏꦿꦺꦠꦧꦿꦸꦠꦸꦏꦿꦺꦴꦠꦺꦴ";
    expect(result).toEqual(expected);
  });
});

describe("Advanced functionality tests", () => {
  it("should convert Wikipedia-style accents when useAccents == true", () => {
    const result = toJavanese(
      "référèndhum menika mutusaken Timor Wétan pisah negari",
      { useAccents: true }
    );
    const expected = "ꦫꦺꦥ꦳ꦺꦫꦺꦤ꧀ꦝꦸꦩ꧀ꦩꦼꦤꦶꦏꦩꦸꦠꦸꦱꦏꦼꦤ꧀ꦡꦶꦩꦺꦴꦂꦮꦺꦠꦤ꧀ꦥꦶꦱꦃꦤꦼꦒꦫꦶ";
    expect(result).toEqual(expected);
  });

  it("should convert vowels correctly when useSwara == false", () => {
    const result = toJavanese(
      "Amerika Italia Uganda Oman Ekuador",
      { useSwara: false }
    );
    const expected = "ꦲꦩꦺꦫꦶꦏꦲꦶꦠꦭꦶꦲꦲꦸꦒꦤ꧀ꦢꦲꦺꦴꦩꦤ꧀ꦲꦺꦏꦸꦲꦢꦺꦴꦂ";
    expect(result).toEqual(expected);
  });

  it("should convert consonants correctly when useMurda == false", () => {
    const result = toJavanese(
      "Na Ka Ta Sa Pa NYa Ga Ba",
      { useMurda: false }
    );
    const expected = "ꦤꦏꦠꦱꦥꦚꦒꦧ";
    expect(result).toEqual(expected);
  });

  it("should convert Pa Cerek and Nga Lelet (Aksara Ganten)", () => {
    const result = toJavanese("lxmah rxsapan");
    const expected = "ꦊꦩꦃꦉꦱꦥꦤ꧀";
    expect(result).toEqual(expected);
  });

  it("should convert all punctuations", () => {
    const result = toJavanese("{<||,:.'\":()>}");
    const expected = "꧁꧌꧋꧋꧈꧇꧉꧊꧊꧇꧊꧊꧍꧂";
    expect(result).toEqual(expected);
  });

  it("should convert numbers and add Pada Pangkat", () => {
    const result = toJavanese("tanggal 17 bulan 8 taun 1945");
    const expected = "ꦠꦁꦒꦭ꧀꧇꧑꧗꧇ꦧꦸꦭꦤ꧀꧇꧘꧇ꦠꦲꦸꦤ꧀꧇꧑꧙꧔꧕꧇";
    expect(result).toEqual(expected);
  });

  it("should not convert comma into Pada Lingsa if after a Pangkon", () => {
    const result = toJavanese("nyaman, aman, txntram,");
    const expected = "ꦚꦩꦤ꧀‌ꦲꦩꦤ꧀‌ꦠꦼꦤ꧀ꦠꦿꦩ꧀‌";
    expect(result).toEqual(expected);
  });

  it("should convert dot into Pada Lingsa if after a Pangkon", () => {
    const result = toJavanese("nyaman. aman. txntram.");
    const expected = "ꦚꦩꦤ꧀꧈ꦲꦩꦤ꧀꧈ꦠꦼꦤ꧀ꦠꦿꦩ꧀꧈";
    expect(result).toEqual(expected);
  });
});

describe("Tests with miscellaneous sentences", () => {
  it("should convert this sentence correctly (1)", () => {
    const result = toJavanese(
      "Am,stxrdam not Amstxrdam"
    );
    const expected = "ꦄꦩ꧀‌ꦱ꧀ꦠꦼꦂꦢꦩ꧀ꦤꦺꦴꦠ꧀ꦄꦩ꧀ꦱ꧀ꦠꦼꦂꦢꦩ꧀";
    expect(result).toEqual(expected);
  });

  it("should convert this sentence correctly (2)", () => {
    const result = toJavanese(
      "jxr basuki mawa beya"
    );
    const expected = "ꦗꦼꦂꦧꦱꦸꦏꦶꦩꦮꦧꦺꦪ";
    expect(result).toEqual(expected);
  });

  it("should convert this sentence correctly (3)", () => {
    const result = toJavanese(
      "flamboyan wungu"
    );
    const expected = "ꦥ꦳꧀ꦭꦩ꧀ꦧꦺꦴꦪꦤ꧀ꦮꦸꦔꦸ";
    expect(result).toEqual(expected);
  });

  it("should convert this sentence correctly (4)", () => {
    const result = toJavanese(
      "mangan krupuk lan klxpon"
    );
    const expected = "ꦩꦔꦤ꧀ꦏꦿꦸꦥꦸꦏ꧀ꦭꦤ꧀ꦏ꧀ꦭꦼꦥꦺꦴꦤ꧀";
    expect(result).toEqual(expected);
  });

  it("should convert this sentence correctly (5)", () => {
    const result = toJavanese(
      "cumplung kxcxmplung blumbang gxmblundhung kxmambang"
    );
    const expected = "ꦕꦸꦩ꧀ꦥ꧀ꦭꦸꦁꦏꦼꦕꦼꦩ꧀ꦥ꧀ꦭꦸꦁꦧ꧀ꦭꦸꦩ꧀ꦧꦁꦒꦼꦩ꧀ꦧ꧀ꦭꦸꦤ꧀ꦝꦸꦁꦏꦼꦩꦩ꧀ꦧꦁ";
    expect(result).toEqual(expected);
  });

  it("should convert this sentence correctly (6)", () => {
    const result = toJavanese(
      "nggrombyang ngglembyar"
    );
    const expected = "ꦔ꧀ꦒꦿꦺꦴꦩ꧀ꦧꦾꦁꦔ꧀ꦒ꧀ꦭꦺꦩ꧀ꦧꦾꦂ";
    expect(result).toEqual(expected);
  });
});