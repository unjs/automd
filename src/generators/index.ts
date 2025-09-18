import { Generator } from "../generator";
import { jsdocs } from "./jsdocs";
import { badges } from "./badges";
import { pmX, pmInstall } from "./pm";
import { fetch as _fetch } from "./fetch";
import { jsimport } from "./jsimport";
import { withAutomd } from "./with-automd";
import { file } from "./file";
import { contributors } from "./contributors";
import { cliUsage } from "./cli-usage";

export default {
  jsdocs,
  badges,
  "pm-i": pmInstall,
  "pm-install": pmInstall,
  "pm-x": pmX,
  fetch: _fetch,
  file,
  jsimport,
  "with-automd": withAutomd,
  contributors,
  "cli-usage": cliUsage,
} as Record<string, Generator>;
