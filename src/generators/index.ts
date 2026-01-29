import type { Generator } from "../generator.ts";
import { jsdocs } from "./jsdocs.ts";
import { badges } from "./badges.ts";
import { pmX, pmInstall } from "./pm.ts";
import { fetch as _fetch } from "./fetch.ts";
import { jsimport } from "./jsimport.ts";
import { withAutomd } from "./with-automd.ts";
import { file } from "./file.ts";
import { contributors } from "./contributors.ts";
import { dirTree } from "./dir-tree.ts";

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
  "dir-tree": dirTree,
} as Record<string, Generator>;
