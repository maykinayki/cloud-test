// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { baseConfig } from "./rollup.config.ts";

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
  },
  plugins: [...baseConfig.plugins],
};
