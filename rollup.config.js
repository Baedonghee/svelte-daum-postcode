import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.svelte",
  output: [
    { file: "index.mjs", format: "es" },
    { file: "index.js", format: "umd", name: "daum-postcode" },
  ],
  plugins: [svelte(), resolve()],
};
