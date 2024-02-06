import { Generator } from "../generator";
import jsdocs from "./jsdocs";
import pmInstall from "./pm-install";
import pmX from "./pm-x";

export default {
  jsdocs,
  "pm-install": pmInstall,
  "pm-x": pmX,
} as Record<string, Generator>;
