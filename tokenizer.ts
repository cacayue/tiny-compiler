export enum TokenType {
	Name,
	Number,
	Paren,
}

export type Token = {
	type: TokenType;
	value: string;
};

export function tokenizer(code: string) {
	let tokens: Token[] = [];
	let current = 0;
	while (current < code.length) {
		let char = code[current];

		const WHITESPACE = /\s/;
		if (WHITESPACE.test(char)) {
			current++;
			continue;
		}

		const LEFT_PAREN = /\(/;
		if (LEFT_PAREN.test(char)) {
			tokens.push({
				type: TokenType.Paren,
				value: char,
			});
			current++;
			continue;
		}

		const RIGHT_PAREN = /\)/;
		if (RIGHT_PAREN.test(char)) {
			tokens.push({
				type: TokenType.Paren,
				value: char,
			});
			current++;
			continue;
		}

		const NAME = /[a-z]/i;
		if (NAME.test(char)) {
			let name = "";
			while (NAME.test(char) && current < code.length) {
				name += char;
				current++;
				char = code[current];
			}
			tokens.push({
				type: TokenType.Name,
				value: name,
			});
		}

		const NUMBER = /[0-9]/;
		if (NUMBER.test(char)) {
			let number = "";
			while (NUMBER.test(char) && current < code.length) {
				number += char;
				current++;
				char = code[current];
			}
			tokens.push({
				type: TokenType.Number,
				value: number,
			});
		}
	}

	return tokens;
}
