import { JSX } from "react";

export const PY_KEYWORDS = new Set([
  "import",
  "from",
  "as",
  "def",
  "return",
  "if",
  "else",
  "elif",
  "for",
  "in",
  "while",
  "class",
  "try",
  "except",
  "finally",
  "with",
  "pass",
  "break",
  "continue",
  "and",
  "or",
  "not",
  "is",
  "None",
  "True",
  "False",
  "raise",
  "yield",
  "lambda",
  "global",
  "nonlocal",
  "assert",
  "del",
]);
export const RUST_KEYWORDS = new Set([
  "use",
  "fn",
  "let",
  "mut",
  "return",
  "if",
  "else",
  "for",
  "in",
  "while",
  "loop",
  "match",
  "struct",
  "enum",
  "impl",
  "trait",
  "pub",
  "self",
  "super",
  "crate",
  "where",
  "as",
  "ref",
  "move",
  "async",
  "await",
  "unsafe",
  "type",
  "const",
  "static",
  "true",
  "false",
  "Some",
  "None",
  "Ok",
  "Err",
]);
const PY_BUILTINS = new Set([
  "print",
  "len",
  "range",
  "int",
  "str",
  "float",
  "list",
  "dict",
  "set",
  "tuple",
  "type",
  "isinstance",
  "hasattr",
  "getattr",
  "open",
  "map",
  "filter",
  "sorted",
  "enumerate",
  "zip",
  "reversed",
  "super",
]);

interface Token {
  t: string;
  v: string;
}

function tokenizePython(line: string): Token[] {
  const parts: Token[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "#") {
      parts.push({ t: "comment", v: line.slice(i) });
      break;
    }
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== q) j++;
      if (line[j] === q) j++;
      parts.push({ t: "string", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[\d]/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      parts.push({ t: "number", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/\w/.test(line[i]) || line[i] === "_") {
      let j = i;
      while (j < line.length && (/\w/.test(line[j]) || line[j] === "_")) j++;
      const word = line.slice(i, j);
      if (PY_KEYWORDS.has(word)) parts.push({ t: "keyword", v: word });
      else if (PY_BUILTINS.has(word)) parts.push({ t: "builtin", v: word });
      else if (i > 0 && line[i - 1] === ".") parts.push({ t: "function", v: word });
      else if (j < line.length && line[j] === "(") parts.push({ t: "function", v: word });
      else parts.push({ t: "plain", v: word });
      i = j;
      continue;
    }
    if ("[](){},.".includes(line[i])) {
      parts.push({ t: "punctuation", v: line[i] });
      i++;
      continue;
    }
    if (/[=+\-*/<>!&|%^~?:@]/.test(line[i])) {
      parts.push({ t: "operator", v: line[i] });
      i++;
      continue;
    }
    parts.push({ t: "plain", v: line[i] });
    i++;
  }
  return parts;
}

function tokenizeRust(line: string): Token[] {
  const parts: Token[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === "/" && line[i + 1] === "/") {
      parts.push({ t: "comment", v: line.slice(i) });
      break;
    }
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === "\\") j++;
        j++;
      }
      if (line[j] === '"') j++;
      parts.push({ t: "string", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (line[i] === "#" && line[i + 1] === "[") {
      let j = i;
      while (j < line.length && line[j] !== "]") j++;
      if (j < line.length) j++;
      parts.push({ t: "attribute", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/[\d]/.test(line[i]) && (i === 0 || !/\w/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d._]/.test(line[j])) j++;
      parts.push({ t: "number", v: line.slice(i, j) });
      i = j;
      continue;
    }
    if (/\w/.test(line[i]) || line[i] === "_") {
      let j = i;
      while (j < line.length && (/\w/.test(line[j]) || line[j] === "_")) j++;
      const word = line.slice(i, j);
      if (RUST_KEYWORDS.has(word)) parts.push({ t: "keyword", v: word });
      else if (j < line.length && line[j] === "(") parts.push({ t: "function", v: word });
      else if (word.endsWith("!")) parts.push({ t: "builtin", v: word });
      else parts.push({ t: "plain", v: word });
      i = j;
      continue;
    }
    if ("[](){},.;:".includes(line[i])) {
      parts.push({ t: "punctuation", v: line[i] });
      i++;
      continue;
    }
    if (/[=+\-*/<>!&|%^~?:@]/.test(line[i])) {
      parts.push({ t: "operator", v: line[i] });
      i++;
      continue;
    }
    parts.push({ t: "plain", v: line[i] });
    i++;
  }
  return parts;
}

export function highlightCode(code: string, lang: string): JSX.Element[] {
  const lines = code.split("\n");
  const tokenizer = lang === "python" ? tokenizePython : tokenizeRust;
  return lines.map((line, lIdx) => {
    const tokens = tokenizer(line);
    return (
      <div key={lIdx} className="code-line">
        {tokens.map((t, tIdx) => (
          <span key={tIdx} className={`token-${t.t}`}>
            {t.v}
          </span>
        ))}
      </div>
    );
  });
}

export function liveHighlight(
  code: string,
  typed: number,
  lang: string,
  cursor: boolean,
): JSX.Element[] {
  const visible = code.slice(0, typed);
  const lines = visible.split("\n");
  const tokenizer = lang === "python" ? tokenizePython : tokenizeRust;
  return lines.map((line, lIdx) => {
    const isLast = lIdx === lines.length - 1;
    const tokens = tokenizer(line);
    return (
      <div key={lIdx} className="code-line">
        {tokens.map((t, tIdx) => (
          <span key={tIdx} className={`token-${t.t}`}>
            {t.v}
          </span>
        ))}
        {isLast && cursor && <span className="typing-cursor">▊</span>}
      </div>
    );
  });
}
