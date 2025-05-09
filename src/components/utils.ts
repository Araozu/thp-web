/**
 * Removes leading/trailing empty lines,
 * uses the first non-empty line to determine indentation level,
 * and dedents all lines by that amount.
 * (Tabs count as 1)
 */
export function leftTrimDedent(input: string): string[] {
  let lines = input.split('\n');

  // Remove leading empty lines
  while (lines.length && lines[0].trim() === "") lines.shift();
  // Remove trailing empty lines
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  if (!lines.length) return [];

  // Find indent of first non-empty line
  const firstContentLine = lines.find(line => line.trim() !== "")!;
  const indentMatch = firstContentLine.match(/^([ \t]*)/);
  const minIndent = (indentMatch ? indentMatch[1] : "") ?? "";

  // Remove that indent from each line (if present)
  return lines.map(line =>
    // Only remove if line starts with minIndent
    line.startsWith(minIndent) ? line.slice(minIndent.length) : line
  );
}

export function splitAndLast(s: string): string {
  const segments = s.split("/");
  return segments[segments.length - 1]!;
}
