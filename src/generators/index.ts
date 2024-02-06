import { Generator } from "../generator";
import jsdocs from "./jsdocs";
import npmInstall from "./npm-install";

export default {
  jsdocs,
  'npm-install': npmInstall,
} as Record<string, Generator>;
