import {
	ChildArgument,
	ExpressionArgument,
	NumArgument,
	RootNode,
	TransformerType,
	TransformNode,
} from "./transformer";

export function codegen(node) {
	switch (node.type) {
		case TransformerType.Program:
			return node.body.map(codegen).join("");
		case TransformerType.ExpressionStatement:
			return codegen(node.expression) + ";";
		case TransformerType.CallExpression:
			return (
				node.callee.name +
				"(" +
				node.arguments.map(codegen).join(", ") +
				")"
			);
		case TransformerType.NumberLiteral:
			return node.value;
	}
}

export function codegen1(ast: RootNode): string {
	let code = "";

	function buildArray(nodes: (ChildArgument | undefined)[] | undefined) {
		if (!nodes) {
			return;
		}
		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];
			let nextNode;
			if (i + 1 < nodes.length) {
				nextNode = nodes[i + 1];
			}
			buildExpression(node, nextNode);
		}
	}

	function buildExpression(node?: ChildArgument, nextNode?: ChildArgument) {
		if (!node) {
			return;
		}
		switch (node.type) {
			case TransformerType.CallExpression:
				code = code + (node as ExpressionArgument).callee.name + "(";
				buildArray((node as ExpressionArgument).arguments);
				code += ")";
				break;
			case TransformerType.NumberLiteral:
				code = code + (node as NumArgument).value;
				if (nextNode) {
					code += ", ";
				}
				break;
		}
	}

	ast.body.forEach((node) => {
		buildExpression(node.expression);
		code += ";";
	});
	return code;
}
