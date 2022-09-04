import { codegen } from "./codegen";
import { parser } from "./parser";
import { tokenizer } from "./tokenizer";
import { transformer } from "./transformer";

export function complier(token: string): string {
	let tokens = tokenizer(token);
	let parsers = parser(tokens);
	let targetAst = transformer(parsers!);
	return codegen(targetAst);
}
