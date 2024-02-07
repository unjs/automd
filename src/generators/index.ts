import { Generator } from "../generator";
import { jsdocs } from "./jsdocs";
import { pmX, pmInstall } from "./pm";

export default {
  jsdocs,
  "pm-install": pmInstall,
  "pm-x": pmX,
} as Record<string, Generator>;
