import { Generator } from "../generator";
import jsdocs from "./jsdocs";
import pmInstall from "./pm-install";
import badges from "./badges";

export default {
  jsdocs,
  badges,
  "pm-install": pmInstall,
} as Record<string, Generator>;
