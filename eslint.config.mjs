import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import eslintPluginReactDom from "eslint-plugin-react-dom";
import eslintPluginReactNamingConvention from "eslint-plugin-react-naming-convention";
import eslintPluginReactX from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import { configs, parser } from "typescript-eslint";

const breakpointOrder = ["desktop", "tablet", "mobile"];

const isVariantElement = (value) =>
  value.split(/\s+/).some((token) => /^[a-zA-Z0-9_-]+:/.test(token));

const getBreakpointIndex = (value) => {
  for (const token of value.split(/\s+/)) {
    const prefixes = token.split(":").slice(0, -1);

    for (const prefix of prefixes) {
      const index = breakpointOrder.indexOf(prefix);

      if (index !== -1) return index;
    }
  }

  return -1;
};

const isBreakpointVariant = (value) => getBreakpointIndex(value) !== -1;

const getSorted = (strings) => [
  ...strings.filter((s) => !isVariantElement(s)).sort((a, b) => a.localeCompare(b)),
  ...strings
    .filter((s) => isVariantElement(s) && !isBreakpointVariant(s))
    .sort((a, b) => a.localeCompare(b)),
  ...strings
    .filter(isBreakpointVariant)
    .sort((a, b) => getBreakpointIndex(a) - getBreakpointIndex(b)),
];

const checkArray = (context, node) => {
  if (node.elements.length < 2) return;

  if (
    !node.elements.every(
      (el) => el !== null && el.type === "Literal" && typeof el.value === "string",
    )
  ) {
    return;
  }

  const strings = node.elements.map((el) => el.value);
  const sorted = getSorted(strings);

  if (sorted.every((s, i) => s === strings[i])) return;

  context.report({
    fix: (fixer) => node.elements.map((el, i) => fixer.replaceText(el, JSON.stringify(sorted[i]))),
    messageId: "unsorted",
    node,
  });
};

const sortCssArray = {
  create: (context) => ({
    CallExpression(node) {
      if (node.callee.type !== "Identifier") return;

      const { name } = node.callee;

      if (name === "css") {
        const [first] = node.arguments;

        if (first?.type === "ArrayExpression") {
          checkArray(context, first);
        }
      } else if (name === "cssVariant") {
        const [variantsArg, baseArg] = node.arguments;

        if (baseArg?.type === "ArrayExpression") {
          checkArray(context, baseArg);
        }

        if (variantsArg?.type === "ObjectExpression") {
          for (const prop of variantsArg.properties) {
            if (prop.type === "Property" && prop.value.type === "ArrayExpression") {
              checkArray(context, prop.value);
            }
          }
        }
      }
    },
  }),
  meta: {
    docs: {
      description:
        "Sort css() and cssVariant() array elements: base classes alphabetically, then non-breakpoint variants (hover:, etc.) alphabetically, then breakpoint variants largest to smallest (desktop → mobile).",
    },
    fixable: "code",
    messages: {
      unsorted:
        "Sort css() array: base classes first (alphabetical), then other variants (alphabetical), then breakpoints largest → smallest (desktop → tablet → mobile).",
    },
    schema: [],
    type: "layout",
  },
};

const config = defineConfig({
  extends: [configs.recommended, eslintConfigPrettier],
  files: ["src/**/*.{ts,tsx}", "rsbuild.config.ts"],
  ignores: ["./dist/**/*", "node_modules/**"],
  languageOptions: {
    parser,
  },
  plugins: {
    "@stylistic": eslintPluginStylistic,
    import: eslintPluginImport,
    local: { rules: { "sort-css-array": sortCssArray } },
    perfectionist: eslintPluginPerfectionist,
    "react-dom": eslintPluginReactDom,
    "react-naming-convention": eslintPluginReactNamingConvention,
    "react-x": eslintPluginReactX,
  },
  rules: {
    "func-style": ["error", "expression"],
    "local/sort-css-array": "error",
    "import/named": "off",
    "import/newline-after-import": "error",
    "import/order": "off",
    "no-multi-spaces": "error",
    "newline-after-var": "error",
    "newline-before-return": "error",
    "no-inline-comments": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-restricted-syntax": ["error", "FunctionDeclaration"],
    "no-trailing-spaces": "error",
    "no-unused-vars": "off",
    "prefer-const": "error",
    quotes: "error",
    semi: "error",
    "@stylistic/indent": [
      "error",
      2,
      {
        offsetTernaryExpressions: true,
        ignoredNodes: [
          "JSXExpressionContainer > ConditionalExpression",
          "JSXExpressionContainer > LogicalExpression",
          "TemplateLiteral *",
        ],
      },
    ],
    "@stylistic/jsx-closing-bracket-location": "error",
    "@stylistic/jsx-closing-tag-location": "error",
    "@stylistic/jsx-curly-brace-presence": "error",
    "@stylistic/jsx-curly-newline": "error",
    "@stylistic/jsx-curly-spacing": "error",
    "@stylistic/jsx-first-prop-new-line": "error",
    "@stylistic/jsx-indent-props": ["error", { indentMode: 2 }],
    "@stylistic/jsx-max-props-per-line": ["error", { maximum: 2 }],
    "@stylistic/jsx-tag-spacing": "error",
    "@stylistic/quotes": ["error", "double"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      { format: ["camelCase", "PascalCase"], selector: "property" },
      { filter: { match: true, regex: "^[@&:]" }, format: null, selector: "property" },
      { format: null, modifiers: ["requiresQuotes"], selector: "property" },
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "_", varsIgnorePattern: "_" },
    ],
    "perfectionist/sort-enums": "error",
    "perfectionist/sort-exports": "error",
    "perfectionist/sort-imports": [
      "error",
      {
        customGroups: [
          {
            groupName: "type-react",
            elementNamePattern: ["^react$", "^react-.*"],
            selector: "type",
          },
          {
            groupName: "react",
            elementNamePattern: ["^react$", "^react-.*"],
          },
          {
            groupName: "internal-alias",
            elementNamePattern: ["^@/.+"],
          },
          {
            elementNamePattern: ["\\.css$"],
            groupName: "style",
          },
        ],
        groups: [
          "builtin",
          { newlinesBetween: 1 },
          "react",
          { newlinesBetween: 0 },
          "external",
          { newlinesBetween: 1 },
          "internal-alias",
          { newlinesBetween: 1 },

          "parent",
          { newlinesBetween: 1 },
          "sibling",
          { newlinesBetween: 1 },
          "index",
          { newlinesBetween: 1 },
          "import",
          { newlinesBetween: 1 },

          "style",
          { newlinesBetween: 1 },

          "type-react",
          { newlinesBetween: 0 },
          "type-external",
          { newlinesBetween: 0 },
          "type-internal",
          { newlinesBetween: 0 },
          "type-parent",
          { newlinesBetween: 0 },
          "type-sibling",
          { newlinesBetween: 0 },
          "type-index",
          { newlinesBetween: 1 },
          "type-import",
          { newlinesBetween: 1 },
        ],
        internalPattern: ["^@/.+"],
        newlinesBetween: 1,
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-interfaces": "error",
    "perfectionist/sort-jsx-props": "error",
    "perfectionist/sort-named-exports": "error",
    "perfectionist/sort-object-types": "error",
    "perfectionist/sort-objects": [
      "error",
      {
        type: "natural",
        order: "asc",
        customGroups: [
          {
            elementNamePattern: ["^&"],
            groupName: "current",
          },
          {
            elementNamePattern: ["^:"],
            groupName: "pseudo",
          },
          {
            elementNamePattern: ["^@"],
            groupName: "media",
          },
          {
            elementNamePattern: ["^devices.desktop"],
            groupName: "devices.desktop",
          },
          {
            elementNamePattern: ["^devices.tablet"],
            groupName: "devices.tablet",
          },
          {
            elementNamePattern: ["^devices.pointerCoarse"],
            groupName: "devices.pointerCoarse",
          },
          {
            elementNamePattern: ["^devices.mobile"],
            groupName: "devices.mobile",
          },
          {
            elementNamePattern: ["\\$\\{devices\\.pointerCoarse\\}"],
            groupName: "devices.mobileAndPointerCoarse",
          },
        ],
        groups: [
          "unknown",
          "current",
          "pseudo",
          "media",
          "devices.desktop",
          "devices.tablet",
          "devices.pointerCoarse",
          "devices.mobile",
          "devices.mobileAndPointerCoarse",
        ],
      },
    ],
    "perfectionist/sort-union-types": "error",
    "react-dom/no-missing-button-type": "error",
    "react-dom/no-string-style-prop": "error",
    "react-naming-convention/context-name": "error",
    "react-naming-convention/id-name": "error",
    "react-naming-convention/ref-name": "error",
    "react-x/jsx-key-before-spread": "error",
    "react-x/jsx-shorthand-boolean": "error",
    "react-x/jsx-shorthand-fragment": "error",
    "react-x/no-array-index-key": "error",
    "react-x/no-class-component": "error",
    "react-x/no-context-provider": "error",
    "react-x/no-duplicate-key": "error",
    "react-x/no-missing-key": "error",
  },
});

export default config;
