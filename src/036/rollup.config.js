import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

export default {

    input: './src/036/test036.ts',

    output: [
        {
            file: './src/036/test036.js',
            format: 'es',
            sourcemap: true
        },
        // {
        //     file: './src/036/test036.min.js',
        //     format: 'iife',
        //     name: 'Phaser4Nano',
        //     plugins: [ terser() ]
        // }
    ],

    plugins: [

        sourcemaps(),

        resolve({
            extensions
        }),

        typescript({
            tsconfig: './src/036/tsconfig.json'
        })

    ]

};