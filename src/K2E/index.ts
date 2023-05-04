
const ENG_KEY = "rRseEfaqQtTdwWczxvgkoiOjpuPhynbml";
const KOR_KEY = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
const CHO_DATA = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const JUNG_DATA = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const JONG_DATA = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

export const korTypeToEng = (src: string) => {
	let res = "";
	if (src.length == 0)
		return res;

	for (let i = 0; i < src.length; i++) {
		const ch: string = src.charAt(i);
		let nCode: number = ch.charCodeAt(0);
		const nCho: number = CHO_DATA.indexOf(ch), nJung = JUNG_DATA.indexOf(ch), nJong = JONG_DATA.indexOf(ch);
		const arrKeyIndex: number[] = [-1, -1, -1, -1, -1];

		if (0xac00 <= nCode && nCode <= 0xd7a3) {
			nCode -= 0xac00;
			arrKeyIndex[0] = Math.floor(nCode / (21 * 28));
			arrKeyIndex[1] = Math.floor(nCode / 28) % 21;
			arrKeyIndex[3] = nCode % 28 - 1;
		} else if (nCho != -1)
			arrKeyIndex[0] = nCho;
		else if (nJung != -1)
			arrKeyIndex[1] = nJung;
		else if (nJong != -1)
			arrKeyIndex[3] = nJong;
		else
			res += ch;

		if (arrKeyIndex[1] != -1) {
			if (arrKeyIndex[1] == 9) {
				arrKeyIndex[1] = 27;
				arrKeyIndex[2] = 19;
			} else if (arrKeyIndex[1] == 10) {
				arrKeyIndex[1] = 27;
				arrKeyIndex[2] = 20;
			} else if (arrKeyIndex[1] == 11) {
				arrKeyIndex[1] = 27;
				arrKeyIndex[2] = 32;
			} else if (arrKeyIndex[1] == 14) {
				arrKeyIndex[1] = 29;
				arrKeyIndex[2] = 23;
			} else if (arrKeyIndex[1] == 15) {
				arrKeyIndex[1] = 29;
				arrKeyIndex[2] = 24;
			} else if (arrKeyIndex[1] == 16) {
				arrKeyIndex[1] = 29;
				arrKeyIndex[2] = 32;
			} else if (arrKeyIndex[1] == 19) {
				arrKeyIndex[1] = 31;
				arrKeyIndex[2] = 32;
			} else {
				arrKeyIndex[1] = KOR_KEY.indexOf(JUNG_DATA.charAt(arrKeyIndex[1]));
				arrKeyIndex[2] = -1;
			}
		}
		if (arrKeyIndex[3] != -1) {
			if (arrKeyIndex[3] == 2) {
				arrKeyIndex[3] = 0
				arrKeyIndex[4] = 9;
			} else if (arrKeyIndex[3] == 4) {
				arrKeyIndex[3] = 2;
				arrKeyIndex[4] = 12;
			} else if (arrKeyIndex[3] == 5) {
				arrKeyIndex[3] = 2;
				arrKeyIndex[4] = 18;
			} else if (arrKeyIndex[3] == 8) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 0;
			} else if (arrKeyIndex[3] == 9) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 6;
			} else if (arrKeyIndex[3] == 10) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 7;
			} else if (arrKeyIndex[3] == 11) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 9;
			} else if (arrKeyIndex[3] == 12) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 16;
			} else if (arrKeyIndex[3] == 13) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 17;
			} else if (arrKeyIndex[3] == 14) {
				arrKeyIndex[3] = 5;
				arrKeyIndex[4] = 18;
			} else if (arrKeyIndex[3] == 17) {
				arrKeyIndex[3] = 7;
				arrKeyIndex[4] = 9;
			} else {
				arrKeyIndex[3] = KOR_KEY.indexOf(JONG_DATA.charAt(arrKeyIndex[3]));
				arrKeyIndex[4] = -1;
			}
		}

		for (let j = 0; j < 5; j++) {
			if (arrKeyIndex[j] != -1)
				res += ENG_KEY.charAt(arrKeyIndex[j]);
		}
	}

	return res;
}