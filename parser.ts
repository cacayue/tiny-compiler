import { Token, TokenType } from "./tokenizer";

export enum NodeType {
	Program = "Program",
	CallExpression = "CallExpression",
	NumberLiteral = "NumberLiteral",
}

export interface Node {
	type: NodeType;
	context?: any[];
}

export type ChildNode = CallNode | NumNode;

export interface CallNode extends Node {
	name: string;
	params: ChildNode[];
	context?: any[];
}

export interface NumNode extends Node {
	value: string;
}

export interface ProgramNode extends Node {
	body: ChildNode[];
}

function createProgramNode(): ProgramNode {
	return {
		type: NodeType.Program,
		body: [],
	};
}

function createCallNode(token: Token): CallNode {
	return {
		type: NodeType.CallExpression,
		name: token.value,
		params: [],
	};
}

function createNumNode(value: string): NumNode {
	return {
		type: NodeType.NumberLiteral,
		value,
	};
}

export function parser(tokens: Token[]): ProgramNode | undefined {
	let current = 0;
	let programNode = createProgramNode();
	function walk() {
		let token = tokens[current];
		if (token.type === TokenType.Number) {
			// programNode.body.push(createNumNode(token.value));
			current++;
			return createNumNode(token.value);
		}
		if (token.type === TokenType.Paren && token.value === "(") {
			token = tokens[++current];
			if (token.type === TokenType.Name) {
				let callNode = createCallNode(token);
				token = tokens[++current];
				while (
					!(token.type === TokenType.Paren && token.value === ")")
				) {
					callNode.params.push(walk());
					token = tokens[current];
				}
				current++;
				return callNode;
			}
		}

		throw new Error("类型错误");
	}

	while (current < tokens.length) {
		programNode.body.push(walk());
	}

	return programNode;
}
