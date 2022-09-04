import { expect, test } from "vitest";
import { codegen } from "./codegen";
import { RootNode, TransformerType } from "./transformer";

test("codegen", () => {
	const ast: RootNode = {
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
									value: 3,
								},
								{
									type: TransformerType.NumberLiteral,
									value: 3,
								},
							],
						},
					],
				},
			},
		],
	};

	const code = `"add(2, subtract(4, 2));add(2, subtract(3, 3));"`;
	expect(codegen(ast)).toMatchInlineSnapshot(code);
});
