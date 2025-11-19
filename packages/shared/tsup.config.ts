import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'types/index.ts',
    types: 'types/index.ts',
    constants: 'constants/index.ts',
    utils: 'utils/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
});
