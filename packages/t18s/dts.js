//generates the type-declarations for this package
import { createBundle } from "dts-buddy";

export default createBundle({
  output: "types/index.d.ts",
  modules: {
    t18s: "./src/index.js",
    "t18s/compiler": "./compiler/index.js",
  },
});
