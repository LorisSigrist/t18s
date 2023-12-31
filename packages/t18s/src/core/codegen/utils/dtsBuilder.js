import { indent } from "./stringUtils.js";

export class DTSBuilder {
  /** @type {Set<Module>} */
  #modules = new Set();

  /** @type {string | undefined} */
  #disclaimer = undefined;

  /**
   * @param {string} name
   * @param {(module : Module) => void} moduleBuilder
   */
  addModule(name, moduleBuilder) {
    const module = new Module(name);
    moduleBuilder(module);
    this.#modules.add(module);
    return this;
  }

  /** @param {string | undefined} disclaimer */
  setDisclaimer(disclaimer) {
    this.#disclaimer = disclaimer;
    return this;
  }

  build() {
    let code = "";
    if (this.#disclaimer) {
      const lines = this.#disclaimer.split("\n");
      for (const line of lines) {
        code += `// ${line}\n`;
      }

      code += "\n";
    }

    /** @type {string[]} */
    const modulesCode = [];

    for (const module of this.#modules) {
      modulesCode.push(module.build());
    }

    code += modulesCode.join("\n\n");

    return code;
  }
}

class Module {
  /** @type {string} */
  #name;

  /** @type {string | undefined} */
  #description = undefined;

  /** @type {Statement[]} */
  #statements = [];

  /** @type {string[]} */
  #imports = [];

  /** @param {string} name */
  constructor(name) {
    this.#name = name;
  }

  /** @param {string | undefined} description */
  setDescription(description) {
    this.#description = description;
    return this;
  }

  /**
   * @param {string} code
   * @param {((statement : Statement) => void) | undefined} statementBuilder
   */
  addStatement(code, statementBuilder = undefined) {
    const statement = new Statement(code);

    if (statementBuilder) {
      statementBuilder(statement);
    }

    this.#statements.push(statement);
    return this;
  }

  /** @param {string} importStatement */
  addImport(importStatement) {
    this.#imports.push(importStatement);
    return this;
  }

  build() {
    let code = "";

    if (this.#description) {
      code += formatJSDocComment(this.#description) + "\n";
    }

    code += `declare module "${this.#name}" {\n`;

    if (this.#imports.length > 0) {
      code += indent(this.#imports.join("\n"));
      code += "\n\n";
    }

    code += indent(this.#statements.map((s) => s.build()).join("\n\n"));
    code += "\n}";
    return code;
  }
}

class Statement {
  /** @type {string} */
  #code;

  /** @type {string | undefined} */
  #description = undefined;

  /** @param {string} code */
  constructor(code) {
    this.#code = code;
  }

  /** @param {string|undefined} description */
  setDescription(description) {
    this.#description = description;
    return this;
  }

  build() {
    let code = "";
    if (this.#description) {
      code += formatJSDocComment(this.#description) + "\n";
    }

    code += this.#code;
    return code;
  }
}

/**
 * Returns a formatted JSDoc comment from a string.
 * @param {string} comment
 * @returns {string}
 */
function formatJSDocComment(comment) {
  let formatted = "";
  const lines = comment.split("\n");

  if (lines.length === 1) {
    formatted += `/** ${comment} */`;
  } else if (lines.length >= 2) {
    formatted += "/**\n";
    for (const line of lines) {
      formatted += ` * ${line}\n`;
    }
    formatted += " */";
  }

  return formatted;
}
