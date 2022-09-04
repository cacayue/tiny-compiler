import { CallNode, ChildNode, NodeType, NumNode, ProgramNode } from "./parser";

export type visitorFunc = {
	enter: (
		node: ChildNode | ProgramNode,
		parent: ChildNode | ProgramNode | undefined
	) => void;
	exit?: (
		node: ChildNode | ProgramNode,
		parent: ChildNode | ProgramNode | undefined
	) => void;
};

export interface Visitor {
	Program?: visitorFunc;
	CallExpression?: visitorFunc;
	NumberLiteral?: visitorFunc;
}

export function traverser(node: ProgramNode, visitor: Visitor) {
	function traverserArray(
		array: ChildNode[],
		parent: ChildNode | ProgramNode | undefined
	) {
		array.forEach((node) => {
			traverserNode(node, parent);
		});
	}

	function traverserNode(
		node: ChildNode | ProgramNode,
		parent: ChildNode | ProgramNode | undefined
	) {
		let visitorObj = visitor[node.type];
		if (visitorObj) {
			visitorObj.enter(node, parent);
		}
		switch (node.type) {
			case NodeType.Program:
				traverserArray((node as ProgramNode).body, node);
				break;
			case NodeType.CallExpression:
				traverserArray((node as CallNode).params, node);
				break;
			case NodeType.NumberLiteral:
				break;
		}
		if (visitorObj && visitorObj.exit) {
			visitorObj.exit(node, parent);
		}
	}
	traverserNode(node, undefined);
}
