import { test, expect } from "vitest";
import { CallNode, NodeType, NumNode, ProgramNode } from "./parser";
import { traverser, Visitor } from "./traverser";

let callArr = [] as Array<(string | undefined)[]>;
const visitor: Visitor = {
	Program: {
		enter(node, parent) {
			callArr.push(["program-enter", node.type]);
		},
		exit(node, parent) {
			callArr.push(["program-exit", node.type]);
		},
	},
	CallExpression: {
		enter(node, parent) {
			callArr.push(["callExpression-enter", node.type, parent!.type]);
		},
		exit(node, parent) {
			callArr.push(["callExpression-exit", node.type, parent!.type]);
		},
	},
	NumberLiteral: {
		enter(node, parent) {
			callArr.push(["numberLiteral-enter", node.type, parent!.type]);
		},
		exit(node, parent) {
			callArr.push(["numberLiteral-exit", node.type, parent!.type]);
		},
	},
};

test("traverser", () => {
	callArr = [];
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

	traverser(ast, visitor);

	expect(callArr).toEqual([
		["program-enter", NodeType.Program],
		["callExpression-enter", NodeType.CallExpression, NodeType.Program],
		[
			"numberLiteral-enter",
			NodeType.NumberLiteral,
			NodeType.CallExpression,
		],
		["numberLiteral-exit", NodeType.NumberLiteral, NodeType.CallExpression],
		[
			"callExpression-enter",
			NodeType.CallExpression,
			NodeType.CallExpression,
		],
		[
			"numberLiteral-enter",
			NodeType.NumberLiteral,
			NodeType.CallExpression,
		],
		["numberLiteral-exit", NodeType.NumberLiteral, NodeType.CallExpression],
		[
			"numberLiteral-enter",
			NodeType.NumberLiteral,
			NodeType.CallExpression,
		],
		["numberLiteral-exit", NodeType.NumberLiteral, NodeType.CallExpression],
		[
			"callExpression-exit",
			NodeType.CallExpression,
			NodeType.CallExpression,
		],
		["callExpression-exit", NodeType.CallExpression, NodeType.Program],
		["program-exit", NodeType.Program],
	]);
});

test("Program", () => {
	callArr = [];
	const ast: ProgramNode = {
		type: NodeType.Program,
		body: [],
	};
	traverser(ast, visitor);
	expect(callArr).toEqual([
		["program-enter", NodeType.Program],
		["program-exit", NodeType.Program],
	]);
});
