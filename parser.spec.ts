import { expect, test } from "vitest";
import { NodeType, parser, ProgramNode } from "./parser";
import { Token, TokenType } from "./tokenizer";

test("parser", () => {
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

	const ast = {
		type: NodeType.Program,
		body: [
			{
				type: NodeType.CallExpression,
				name: "add",
				params: [
					{
						type: NodeType.NumberLiteral,
						value: "2",
					},
					{
						type: NodeType.CallExpression,
						name: "subtract",
						params: [
							{
								type: NodeType.NumberLiteral,
								value: "4",
							},
							{
								type: NodeType.NumberLiteral,
								value: "2",
							},
						],
					},
				],
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});

test.skip("num", () => {
	const tokens = [{ type: TokenType.Number, value: "2" }];

	const ast = {
		type: NodeType.Program,
		body: [
			{
				type: NodeType.NumberLiteral,
				value: "2",
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});

test("call", () => {
	const tokens: Token[] = [
		{ type: TokenType.Paren, value: "(" },
		{ type: TokenType.Name, value: "add" },
		{ type: TokenType.Number, value: "2" },
		{ type: TokenType.Number, value: "4" },
		{ type: TokenType.Paren, value: ")" },
	];

	const ast: ProgramNode = {
		type: NodeType.Program,
		body: [
			{
				type: NodeType.CallExpression,
				name: "add",
				params: [
					{
						type: NodeType.NumberLiteral,
						value: "2",
					},
					{
						type: NodeType.NumberLiteral,
						value: "4",
					},
				],
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});

test("two call", () => {
	const tokens: Token[] = [
		{ type: TokenType.Paren, value: "(" },
		{ type: TokenType.Name, value: "add" },
		{ type: TokenType.Number, value: "2" },
		{ type: TokenType.Number, value: "4" },
		{ type: TokenType.Paren, value: ")" },
		{ type: TokenType.Paren, value: "(" },
		{ type: TokenType.Name, value: "add" },
		{ type: TokenType.Number, value: "2" },
		{ type: TokenType.Number, value: "4" },
		{ type: TokenType.Paren, value: ")" },
	];

	const ast: ProgramNode = {
		type: NodeType.Program,
		body: [
			{
				type: NodeType.CallExpression,
				name: "add",
				params: [
					{
						type: NodeType.NumberLiteral,
						value: "2",
					},
					{
						type: NodeType.NumberLiteral,
						value: "4",
					},
				],
			},
			{
				type: NodeType.CallExpression,
				name: "add",
				params: [
					{
						type: NodeType.NumberLiteral,
						value: "2",
					},
					{
						type: NodeType.NumberLiteral,
						value: "4",
					},
				],
			},
		],
	};

	expect(parser(tokens)).toEqual(ast);
});
