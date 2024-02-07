import { Generator } from "../generator";
import { jsdocs } from "./jsdocs";
import { badges } from "./badges";
import { pmX, pmInstall } from "./pm";

export default {
  jsdocs,
  badges,
  "pm-install": pmInstall,
  "pm-x": pmX,
} as Record<string, Generator>;
