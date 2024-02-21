import { automd } from "../src";

console.log("Starting automd with watcher on repo...");
const { unwatch } = await automd({
  watch: true,
});

export const seup = async () => {};

export const teardown = async () => {
  await unwatch?.();
};
