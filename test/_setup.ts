import { automd } from "../src/index.ts";

console.log("Starting automd with watcher on repo...");
const { unwatch } = await automd({
  watch: true,
});

export const setup = async () => {};

export const teardown = async () => {
  await unwatch?.();
};
