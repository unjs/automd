/**
 * Send a message
 *
 * This is another description of the
 * function that spans multiple lines.
 *
 * Again, this is another description of the function that spans multiple lines.
 *
 * @param message - The message to send
 * @param date - The date to send the message
 * @param flash - Whether to flash the message
 *
 * @example
 *
 * ```js
 * sendMessage("Hello", "7/1/1995", false); // => "OK"
 * ```
 */
export function sendMessage(
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  date = new Date(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flash?: boolean,
): string {
  return "OK";
}

/**
 *
 * Various configuration options
 */
export const config = {
  /**
   * The name of the configuration
   */
  name: "default",

  /** The price */
  price: 12.5,

  /**
   * checked state
   */
  checked: false,

  /**
   * Configure the dimensions
   *
   * @example
   *
   * ```js
   * { width: 10, height: 10 }
   * ```
   */
  dimensions: {
    /** Width in px */
    width: 10,

    /** Height in px */
    height: 10,
  },

  /**
   * A list of tags
   */
  tags: {
    $resolve: (val: string) => ["tag1", val],
  },
};
