import { TYPE } from "@formatjs/icu-messageformat-parser";

/**
 * Generates a typescript type for the arguments in a message.
 *
 * @param {import("@formatjs/icu-messageformat-parser").MessageFormatElement[]} elements
 * @returns {string} - The typescript type. If the type is empty, then the return value is an empty string.
 */
export function generateType(elements) {
  const intersectionElements = [];

  /**
   * The fields that need to be present, regardless of which branch is taken.
   *
   * This is a convenience to make the generated types more readable. Adding each field to the intersection
   * as `{ fieldName: fieldType }` would work, but make the types more verbose.
   * @type {Map<string, string>}
   */
  const commonFields = new Map();

  for (const element of elements) {
    switch (element.type) {
      case TYPE.number: {
        commonFields.set(element.value, "number");
        break;
      }

      case TYPE.argument: {
        commonFields.set(element.value, "string");
        break;
      }

      case TYPE.date:
      case TYPE.time: {
        commonFields.set(element.value, "Date");
        break;
      }

      case TYPE.tag: {
        commonFields.set(element.value, "string");

        //Make sure to also generate types for the children of the tag
        const contentType = generateType(element.children);
        if (contentType.length > 0) {
          intersectionElements.push(`(${contentType})`);
        }

        break;
      }

      case TYPE.plural: {
        commonFields.set(element.value, "number");

        const branchTypes = [];
        let emptyBranch = false;
        for (const [key, option] of Object.entries(element.options)) {
          const branchType = generateType(option.value);
          if (branchType.length > 0) {
            branchTypes.push(branchType);
          } else {
            emptyBranch = true;
          }
        }

        if (branchTypes.length > 0) {
          let str = "";
          str += "((";
          str += branchTypes.join(") | (");
          if (emptyBranch) str += ") | ({}";
          str += "))";
          intersectionElements.push(str);
        }
        break;
      }

      case TYPE.select: {
        let hasOther = false;
        let options = Object.keys(element.options);
        if (options.includes("other")) {
          hasOther = true;
          options = options.filter((option) => option !== "other");
        }

        if (hasOther) {
          const optionsString =
            options.map((option) => `"${option}"`).join(" | ") +
            " | (string & {})";
          let str = `{ ${element.value}: ${optionsString} }`;

          const branchTypes = [];
          let emptyBranch = false;
          for (const [key, option] of Object.entries(element.options)) {
            const branchType = generateType(option.value);
            if (branchType.length > 0) {
              branchTypes.push(branchType);
            } else {
              emptyBranch = true;
            }
          }

          if (branchTypes.length > 0) {
            str += " & ((";
            str += branchTypes.join(") | (");
            if (emptyBranch) str += ") | ({}";

            str += "))";
          }

          intersectionElements.push(str);
          break;
        } else {
          const unionElements = [];
          for (const option of options) {
            const branchType = generateType(element.options[option].value);
            if (branchType === "")
              unionElements.push(`{ ${element.value}: "${option}" }`);
            else {
              unionElements.push(
                `({ ${element.value}: "${option}" } & (${branchType}))`,
              );
            }
          }

          let str = unionElements.join(" | ");
          intersectionElements.push(str);
        }
        break;
      }
    }
  }

  if (commonFields.size) {
    let str = "{";
    for (const [key, value] of commonFields.entries()) {
      str += `${key}: ${value},`;
    }

    //Remove trailing comma
    if (str.endsWith(",")) str = str.slice(0, -1);
    str += "}";

    intersectionElements.push(str);
  }

  if (intersectionElements.length === 0) return "";
  if (intersectionElements.length === 1) return intersectionElements[0];

  return "(" + intersectionElements.join(") & (") + ")";
}
