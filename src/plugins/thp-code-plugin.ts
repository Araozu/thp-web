import { visit } from 'unist-util-visit';
import { native_highlighter_sync } from "../lexer/highlighter";

/**
 * A remark plugin to process 'xyz' language code blocks.
 */
export default function remarkCustomXyzCompiler() {
	return function transformer(tree, file) {
		visit(tree, 'code', (node, index, parent) => {
			if (node.lang === 'thp') {
				const codeContent: string = node.value;

				const [native_html, error_message] = native_highlighter_sync(
					codeContent,
				);

				if (error_message) {
					console.error(`Error in code block: ${error_message}`);
				}

				// Create a new HTML node with the compiled output
				const newNode = {
					type: 'html',
					value: `
<pre class="language-thp"><code class="language-thp">${native_html}</code>
<span class="absolute top-1 right-1 text-right inline-block text-sm select-none opacity-75">thp</span></pre>
` ,
				};

				// Replace the original 'code' node with the new 'html' node
				// parent.children is the array holding the current node.
				// index is the position of the current node in that array.
				parent.children.splice(index, 1, newNode);

				// Skip this children on further processing
				return [visit.SKIP, index];
			}
		});
	};
}
