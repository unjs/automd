import { Generator } from "../generator";
import jsdocs from "./jsdocs";
import pmInstall from "./pm-install";

export default {
  jsdocs,
  "pm-install": pmInstall,
} as Record<string, Generator>;
