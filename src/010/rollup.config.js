import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

export default {

    input: './src/010/test010.ts',

    output: {
        file: './src/010/test010.js',
        format: 'es'
    },

    plugins: [
        resolve({
            extensions
        }),

        //  Used here instead of .babelrc so it applies to external modules, too.
        babel({
            extensions,
            comments: false,
            presets: [
                [ "@babel/preset-env", {
                    targets: {
                        esmodules: true
                    }
                }],
                [ "minify", {
                    removeConsole: false,
                    builtIns: false
                }],
                "@babel/preset-typescript"
            ],
            plugins: [
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread"
            ]
        })

    ]
};