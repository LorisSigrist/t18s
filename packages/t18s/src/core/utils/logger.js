import kleur from "kleur";
import { indent } from "../codegen/utils/stringUtils.js";

/**
 * Log Messages to the console in a standard format.
 * This should be used instead of `console.log` or `console.error` to ensure a consistent format.
 */
export class Logger {
  #verbose = false;
  /** @type {import("vite").ResolvedConfig} */
  #viteConfig;

  /**
   * @param {import("vite").ResolvedConfig} viteConfig
   * @param {boolean} verbose
   */
  constructor(viteConfig, verbose = false) {
    this.#viteConfig = viteConfig;
    this.#verbose = verbose;
  }

  /**
   * Logs a message to the console.
   * If verbose is disabled, this will noop.
   * @param {string} msg
   */
  log(msg) {
    if (!this.#verbose) return;
    msg = this.#formatMessage(msg, "ℹ");
    this.#viteConfig.logger.info(kleur.cyan(msg));
  }

  /**
   * Logs a warning message to the console.
   * If verbose is disabled, this will noop.
   * @param {string} msg
   */
  warn(msg) {
    if (!this.#verbose) return;
    msg = this.#formatMessage(msg, "★");
    this.#viteConfig.logger.warn(kleur.bold().yellow(msg));
  }

  /**
   * Logs an error message to the console
   * @param {string} msg
   */
  error(msg) {
    msg = this.#formatMessage(msg, "✗");
    this.#viteConfig.logger.error(kleur.bold().red(msg));
  }

  /**
   * Logs a success message to the console
   * @param {string} msg
   */
  success(msg) {
    msg = this.#formatMessage(msg, "✔");
    this.#viteConfig.logger.info(kleur.bold().green(msg));
  }

  /**
   * Formats a message to our standard console format
   *
   * @param {string} msg The message to format
   * @param {string | null} icon (optional) An Icon to prepend to the message
   * @returns {string}
   */
  #formatMessage(msg, icon = null) {
    if (msg.trim().length === 0) return msg; //Ignore empty messages
    const prefix = `${icon ?? " "} [t18s] `;
    msg = indent(msg, prefix.length);
    msg = prefix + msg.slice(prefix.length);
    return msg;
  }
}
