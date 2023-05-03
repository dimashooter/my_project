
module.exports = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    // webpackFinal: async (config, { configType }) => {
    //     const paths: BuildPaths = {
    //         build: '',
    //         html: '',
    //         entry: '',
    //         src: path.resolve(__dirname, '..', '..', 'src'),
    //         locales: '',
    //         buildLocales: '',
    //     };
    //     config!.resolve!.modules!.push(paths.src);
    //     config!.resolve!.extensions!.push('.ts', '.tsx');
    //     config.resolve!.alias = { '@': paths.src };
    
    //     // eslint-disable-next-line no-param-reassign
    //     // @ts-ignore
    //     config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    //         if (/svg/.test(rule.test as string)) {
    //             return { ...rule, exclude: /\.svg$/i };
    //         }
    
    //         return rule;
    //     });
    
    //     config!.module!.rules.push({
    //         test: /\.svg$/,
    //         use: ['@svgr/webpack'],
    //     });
    //     config!.module!.rules.push(buildCssLoader(true));
    
    //     config!.plugins!.push(
    //         new DefinePlugin({
    //             __IS_DEV__: JSON.stringify(true),
    //             __API__: JSON.stringify(''),
    //             __PROJECT__: JSON.stringify('storybook'),
    //         }),
    //     );
    //     return config
    // },
};
