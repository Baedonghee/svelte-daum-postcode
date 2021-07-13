import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import package from "./package.json";

const name = package.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  external: Object.keys(package.dependencies),
  input: "src/index.svelte",
  output: [
    { file: package.module, format: "es" },
    { file: package.main, format: "umd", name },
  ],
  plugins: [svelte(), resolve()],
};
