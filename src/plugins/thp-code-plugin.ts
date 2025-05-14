import { visit, SKIP } from 'unist-util-visit';
import { native_highlighter_sync } from "../lexer/highlighter";

/**
 * A remark plugin to process 'thp' language code blocks.
 */
export default function remarkCustomXyzCompiler() {
	return function transformer(tree: any) {
		visit(tree, 'code', (node: any, index, parent) => {
			if (node.lang === 'thp') {
				const codeContent: string = node.value;

				const [native_html, error_message, zig_data] = native_highlighter_sync(codeContent);

				if (error_message) {
					console.error(`Error in code block: ${error_message}`);
				}
				// FIXME: actually render the error messages like in the Code astro component

				let errorHtml = ""
				if (!!error_message) {
					errorHtml = `
<div class="px-4 py-2 rounded bg-red-200 dark:bg-red-950">
	<span class="inline-block font-bold">Compilation error:</span>
	<span class="whitespace-pre-wrap">${error_message}</span>
</div>
`
				}

				if (import.meta.env.DEV) {
					const tokens = JSON.stringify(zig_data.tokens, null, 2);
					const errors = JSON.stringify(zig_data.errors, null, 2);
					errorHtml += `
<div x-data="{ open: false }">
	<button @click="open = !open" class="bg-zinc-900 text-zinc-600 py-1 px-2 rounded text-sm">
		Toggle compiler output
	</button>
	<div x-show="open" class="grid grid-cols-2">
		<pre class="text-xs">${tokens}</pre>
		<pre class="text-xs">${errors}</pre>
	</div>
</div>
`;
				}

				// Create a new HTML node with the compiled output
				const newNode = {
					type: 'html',
					value: `
<pre class="language-thp"><code class="language-thp">${native_html}</code>
<span class="absolute top-1 right-1 text-right inline-block text-sm select-none opacity-75">thp</span></pre>
${errorHtml}
`,
				};

				// Replace the original 'code' node with the new 'html' node
				// parent.children is the array holding the current node.
				// index is the position of the current node in that array.
				parent.children.splice(index, 1, newNode);

				// Skip this children on further processing
				return [SKIP, index];
			}

			return undefined
		});
	};
}
