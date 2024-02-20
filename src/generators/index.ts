import { Generator } from "../generator";
import { jsdocs } from "./jsdocs";
import { badges } from "./badges";
import { pmX, pmInstall } from "./pm";
import { fetch as _fetch } from "./fetch";
import { jsimport } from "./jsimport";
export default {
  jsdocs,
  badges,
  "pm-i": pmInstall,
  "pm-install": pmInstall,
  "pm-x": pmX,
  fetch: _fetch,
  jsimport,
  "js-import": jsimport,
} as Record<string, Generator>;
