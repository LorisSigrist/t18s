import colors from "kleur";

/**
 * Log Messages to the console in a standard format.
 * This should be used instead of `console.log` or `console.error` to ensure a consistent format.
 */
export class Logger {
  /**
   * Logs a message to the console
   * @param {string} msg
   */
  log(msg) {
    msg = this.#formatMessage(msg, "ⓘ");
    console.log(colors.cyan(msg));
  }

  /**
   * Logs a warning message to the console
   * @param {string} msg
   */
  warn(msg) {
    msg = this.#formatMessage(msg);
    console.warn(colors.bold().yellow(msg));
  }

  /**
   * Logs an error message to the console
   * @param {string} msg
   */
  error(msg) {
    msg = this.#formatMessage(msg, "✗");
    console.error(colors.bold().red(msg));
  }

  /**
   * Logs a success message to the console
   * @param {string} msg
   */
  success(msg) {
    msg = this.#formatMessage(msg, "✔");
    console.log(colors.green(msg));
  }

  /**
   * Formats a message to our standard console format
   *
   * @param {string} msg The message to format
   * @param {string | null} icon (optional) An Icon to prepend to the message
   * @returns {string}
   */
  #formatMessage(msg, icon = null) {
    msg = msg.replace(/^/gm, "         "); //Indent each line by 9 spaces (2 spaces + [t18s] + 1 space)
    const prefix = icon ? icon + " " + "[t18s] " : "  [t18s] ";
    msg = prefix + msg.slice(9); //Remove the first 9 spaces
    return msg;
  }
}
