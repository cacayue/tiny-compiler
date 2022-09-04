import { CallNode, ChildNode, NodeType, NumNode, ProgramNode } from "./parser";
import { traverser, Visitor } from "./traverser";

export enum TransformerType {
	Program,
	ExpressionStatement,
	CallExpression,
	Identifier,
	NumberLiteral,
}

export interface Argument {
	type: TransformerType;
}

export interface NumArgument extends Argument {
	value: number;
}

export interface ExpressionArgument extends Argument {
	callee: Callee;
	arguments?: (ChildArgument | undefined)[];
}

export type ChildArgument = ExpressionArgument | NumArgument;

export interface Callee {
	type: TransformerType;
	name: string;
}

export interface TransformNode {
	type: TransformerType.ExpressionStatement;
	expression?: ChildArgument;
}

export interface RootNode {
	type: TransformerType.Program;
	body: TransformNode[];
}

export function transformer(originalAST: ProgramNode): RootNode {
	let newAst: RootNode = {
		type: TransformerType.Program,
		body: [],
	};

	originalAST.context = newAst.body;

	const visitor: Visitor = {
		CallExpression: {
			enter(node, parent) {
				if (node.type === NodeType.CallExpression) {
					let expression: ExpressionArgument | TransformNode = {
						type: TransformerType.CallExpression,
						callee: {
							type: TransformerType.Identifier,
							name: (node as CallNode).name,
						},
						arguments: [],
					};

					node.context = expression.arguments;

					if (parent?.type !== NodeType.CallExpression) {
						expression = {
							type: TransformerType.ExpressionStatement,
							expression,
						};
					}

					parent?.context?.push(expression);
				}
			},
		},
		NumberLiteral: {
			enter(node, parent) {
				if (node.type === NodeType.NumberLiteral) {
					let expression: NumArgument = {
						type: TransformerType.NumberLiteral,
						value: Number.parseInt((node as NumNode).value),
					};
					parent?.context?.push(expression);
				}
			},
		},
	};
	traverser(originalAST, visitor);
	return newAst;
}
