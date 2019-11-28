var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var merge = require('webpack-merge');

// https://webpack.js.org/configuration/dev-server/#devserver-port
var webpackDevServerPort = parseInt(process.env.WEBPACK_DEV_PORT) || 8080;

// @see https://github.com/preboot/angularjs-webpack

var config = {
    entry: {
        scripts: [
            './app/scripts.js'
        ],
        'scripts.recapSituation': [
            './app/scripts.recapSituation.js'
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // Angular 1.x doesn't support CommonJS
            // @see https://github.com/webpack/webpack/issues/2049
            {
                test: require.resolve('angular'),
                use: 'exports-loader?window.angular'
            },
            // This avoids to load the whole countries.json file (~ 400Kb)
            {
                test: require.resolve('world-countries'),
                use: {
                    loader: path.resolve(__dirname, 'app/js/loaders/worldCountriesLoader.js'),
                    options: {
                        include: ['cca2', 'translations.fra', 'demonyms.fra']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'ng-annotate-loader' },
                ]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    'file-loader?name=fonts/[name].[ext]',
                ]
            },
            {
                test: /\.(png)$/,
                use: [
                    'file-loader?name=img/[name].[ext]',
                ]
            },
            {
                test: /\.html$/,
                exclude: /(front|embed)\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    }
                }],
            },
            {
                test: /\.modernizrrc$/,
                use: ['modernizr-loader', 'json-loader'],
            }
        ]
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        contentBase: path.join(__dirname, 'dist'),
        port: webpackDevServerPort,
	    disableHostCheck:true,
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'app/documents', to: 'documents/' },
            { from: 'app/img', to: 'img/' },
            { from: 'robots.txt' },
            { from: 'sitemap.xml' },
        ]),
        // Avoid bundling all Moment locales
        // @see https://github.com/moment/moment/issues/2517
        // @see https://webpack.js.org/plugins/context-replacement-plugin/
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /fr/
        ),
        new webpack.ProvidePlugin({
            angular: 'angular',
            moment: 'moment',
            _: 'lodash',
            jsyaml: 'js-yaml',
            d3: 'd3'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    externals: function(context, request, callback) {
        if (request.match(/backend\/config/)) {
            callback(request + ' is a backend config file, should not be imported.');
        } else {
            callback();
        }
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, '.modernizrrc')
        }
    }
};

module.exports = function(env, argv) {

    var htmlWebpackPluginConfigs = [
        {
            template: './app/views/front.html',
            filename: 'views/front.html',
            excludeChunks: ['scripts.recapSituation'],
            inject: false,
        },
        {
            template: './app/views/embed.html',
            filename: 'views/embed.html',
            excludeChunks: ['scripts'],
            inject: false,
        },
    ];

    var miniCssExtractPluginOptions = {
        filename: "styles/[name].css",
    };

    var overrideConfig = {};

    var plugins = [];

    // When running with mode = development,
    // assets will be served via webpack-dev-server
    if (argv.mode === 'development') {
        htmlWebpackPluginConfigs = htmlWebpackPluginConfigs.map(function(htmlWebpackPluginConfig) {
            return Object.assign(htmlWebpackPluginConfig, {
                devServer: 'https://sd-124918.dedibox.fr:' + webpackDevServerPort
            });
        });
    }

    if (argv.mode === 'production') {

        plugins.push(new webpack.HashedModuleIdsPlugin());

        overrideConfig = {
            output: {
                filename: 'js/[name].[contenthash].js',
            }
        };

        miniCssExtractPluginOptions = {
            filename: "styles/[name].[contenthash].css",
        };
    }

    htmlWebpackPluginConfigs.forEach(function(htmlWebpackPluginConfig) {
        plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig));
    });

    plugins.push(new MiniCssExtractPlugin(miniCssExtractPluginOptions));

    return merge(config, {
        mode: argv.mode || 'none',
        plugins: plugins,
    }, overrideConfig);
};
