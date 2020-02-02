import dts from 'rollup-plugin-dts';

const libraryName = 'todoist-rest-api';

export default {
  input: './dist/index.d.ts',
  output: [{ file: `dist/${libraryName}`, format: 'es' }],
  plugins: [dts()],
};
