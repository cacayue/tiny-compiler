import { test, expect } from "vitest";
import { tokenizer, TokenType } from "./tokenizer";
test("tokenizer", () => {
	const code = `(add 2 (subtract 4 2))`;
	const tokens = [
		{ type: TokenType.Paren, value: "(" },
		{ type: TokenType.Name, value: "add" },
		{ type: TokenType.Number, value: "2" },
		{ type: TokenType.Paren, value: "(" },
		{ type: TokenType.Name, value: "subtract" },
		{ type: TokenType.Number, value: "4" },
		{ type: TokenType.Number, value: "2" },
		{ type: TokenType.Paren, value: ")" },
		{ type: TokenType.Paren, value: ")" },
	];
	expect(tokenizer(code)).toEqual(tokens);
});

test("left paren", () => {
	const code = `(`;
	const tokens = [{ type: TokenType.Paren, value: "(" }];
	expect(tokenizer(code)).toEqual(tokens);
});

test("right paren", () => {
	const code = `)`;
	const tokens = [{ type: TokenType.Paren, value: ")" }];
	expect(tokenizer(code)).toEqual(tokens);
});

test("name", () => {
	const code = `add`;
	const tokens = [{ type: TokenType.Name, value: "add" }];
	expect(tokenizer(code)).toEqual(tokens);
});

test("1", () => {
	const code = `1`;
	const tokens = [{ type: TokenType.Number, value: "1" }];
	expect(tokenizer(code)).toEqual(tokens);
});

test("12190", () => {
	const code = `12190`;
	const tokens = [{ type: TokenType.Number, value: "12190" }];
	expect(tokenizer(code)).toEqual(tokens);
});

test("add 1 1", () => {
	const code = `add 1 1`;
	const tokens = [
		{ type: TokenType.Name, value: "add" },
		{ type: TokenType.Number, value: "1" },
		{ type: TokenType.Number, value: "1" },
	];
	expect(tokenizer(code)).toEqual(tokens);
});
