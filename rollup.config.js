import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  plugins: [
    resolve({
      moduleDirectory: ["node_modules"],
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"],
      babelHelpers: "runtime",
    }),
    commonjs({
      extensions: [".js", ".ts"],
    }),
  ],
  output: [
    {
      name: "carakan",
      file: pkg.main,
      format: "umd",
      sourcemap: true,
    },
    {
      name: "carakan",
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
};
