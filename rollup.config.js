// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'dist-browser/index.js',
	output: {
		file: 'dist-browser/bundle.js',
		format: 'esm', // O 'umd' si quieres soporte para <script> clásico
		sourcemap: true,
	},
	plugins: [nodeResolve()],
};
