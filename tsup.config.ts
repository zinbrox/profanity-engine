import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/sample.ts"],
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    clean: true,
});