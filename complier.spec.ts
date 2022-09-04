import { expect, test } from "vitest";
import { complier } from "./complier";

test("complier", () => {
	let token = `(add 2 (subtract 4 2))`;

	expect(complier(token)).toEqual(`add(2, subtract(4, 2));`);
});
