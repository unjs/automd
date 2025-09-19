import { Generator } from "../generator";
import { jsdocs } from "./jsdocs";
import { badges } from "./badges";
import { pmX, pmInstall } from "./pm";
import { fetch as _fetch } from "./fetch";
import { jsimport } from "./jsimport";
import { withAutomd } from "./with-automd";
import { file } from "./file";
import { contributors } from "./contributors";
import { cliOutput } from "./cli-output";

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
  "cli-output": cliOutput,
} as Record<string, Generator>;
