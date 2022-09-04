import { NodeType, ProgramNode } from "./parser";
import { expect, test } from "vitest";
import {
	TransformerType,
	transformer,
	RootNode,
	ExpressionArgument,
	NumArgument,
} from "./transformer";

test("transformer", () => {
	const originalAST: ProgramNode = {
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
	const transformerAST: RootNode = {
		type: TransformerType.Program,
		body: [
			{
				type: TransformerType.ExpressionStatement,
				expression: {
					type: TransformerType.CallExpression,
					callee: {
						type: TransformerType.Identifier,
						name: "add",
					},
					arguments: [
						{
							type: TransformerType.NumberLiteral,
							value: 2,
						},
						{
							type: TransformerType.CallExpression,
							callee: {
								type: TransformerType.Identifier,
								name: "subtract",
							},
							arguments: [
								{
									type: TransformerType.NumberLiteral,
									value: 4,
								},
								{
									type: TransformerType.NumberLiteral,
									value: 2,
								},
							],
						},
					],
				},
			},
		],
	};

	expect(transformer(originalAST)).toEqual(transformerAST);
});
