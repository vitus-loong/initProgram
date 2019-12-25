const path = require('path');
const webpack = require('webpack');

let imgLimit = 1;
let imgName = '[path][name].[ext]';
let excludeImg = [];

let replaceObj_test = {
    __WEBPACK_ENV__: JSON.stringify('development'),
    __HUYA_MAIN_RESOURCE__: JSON.stringify('//test.msstatic.com'),
    __TT_ENV__: JSON.stringify('1'),
    __TT_APP_MAIN__: JSON.stringify('test.www.huya.com'),
    __TT_APP_I__: JSON.stringify('test.i.huya.com'),
    __TT_APP_HD__: JSON.stringify('test.hd.huya.com'),
    __VIDEO_PLAYER__: JSON.stringify('v-huya-player-test'),
    __HUYA_MAIN_JQUERY__: JSON.stringify('http://test.msstatic.com/main3/lib/jq_ud_mod.js')
}

let config = {
    stats: {
        all: false,
        assets: true,
        modules: true,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true
    },
    mode: 'development',
    entry: './index.js',
    output: {
        filename: "index.js", // 生成的 bundle 的文件，目录结构根据每个 bundle 自身的命名决定
        chunkFilename: 'index.js',
        path: path.resolve(__dirname, "./dist"), // 打包生成目录
        publicPath: '//local.huya.com/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    resolve: {
        alias: {
            assets: path.resolve(__dirname, './assets'),
            css: path.resolve(__dirname, './assets/css'),
            modules: path.resolve(__dirname, './assets/modules'),
            components: path.resolve(__dirname, './components'),
            widget: path.resolve(__dirname, './widget')
        }
    },
    optimization: {
        splitChunks: {
            minSize: 0,
            maxSize: 0,
            cacheGroups: {
                // npm 的裤： events，react
                node_modules: {
                    test: /[\/\\]node_modules[\/\\](.*)\.js$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        var name = module.resource.match(/[\/\\]node_modules[\/\\](.*)\.js$/)[1];
                        return 'node_modules/' + name.replace(/\\/g, '\/');
                    }
                },
                /* js */
                lib: {
                    test: /[\/\\]lib[\/\\](.*)\.js$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        var name = module.resource.match(/[\/\\]lib[\/\\](.*)\.js$/)[1];
                        return 'lib/' + name.replace(/\\/g, '\/');
                    }
                },
                modules: {
                    test: /[\/\\]modules[\/\\](.*)\.js$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        var name = module.resource.match(/[\/\\]modules[\/\\](.*)\.js$/)[1];
                        return 'modules/' + name.replace(/\\/g, '\/');
                    }
                },
                widgets: {
                    test: /[\/\\]widget[\/\\](.*)\.js$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        var name = module.resource.match(/[\/\\]widget[\/\\](.*)\.js$/)[1];
                        return 'widget/' + name.replace(/\\/g, '\/');
                    }
                },
                components: {
                    test: /[\/\\]components[\/\\](.*)\.js$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        var name = module.resource.match(/[\/\\]components[\/\\](.*)\.js$/)[1];
                        return 'components/' + name;
                    }
                },

                /* resource */
                assetsResource: {
                    test: /[\/\\]assets[\/\\](.*)\.(js|(sc|sa|c)ss|tmpl|jpg|png|gif)$/,

                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        function getResource() {
                            if (module.resource) {
                                return module.resource;
                            } else {
                                module = module.issuer;
                                return getResource();
                            }
                        }

                        var resource = getResource();

                        var name = resource.match(/[\/\\]assets[\/\\](.*)\.(js|(sc|sa|c)ss|tmpl|jpg|png|gif)$/)[1];
                        return 'assets/' + name.replace(/\\/g, '\/');
                    }
                },
                widgetResource: {
                    test: /[\/\\]widget[\/\\](.*)\.((sc|sa|c)ss|tmpl|jpg|png|gif)$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        function getResource() {
                            if (/[\/\\]widget[\/\\](.*)\.js$/.test(module.resource)) {
                                return module.resource;
                            } else {
                                module = module.issuer;
                                return getResource();
                            }
                        }

                        var resource = getResource();

                        var name = resource.match(/[\/\\]widget[\/\\](.*)\.js$/)[1];
                        return 'widget/' + name.replace(/\\/g, '\/');
                    }
                },
                componentsResource: {
                    test: /[\/\\]components[\/\\](.*)\.((sc|sa|c)ss|tmpl|jpg|png|gif)$/,
                    chunks: 'async',
                    enforce: true,
                    name: (module, chunks, cacheGroupKey) => {
                        function getResource() {
                            if (/[\/\\]components[\/\\](.*)\.js$/.test(module.resource)) {
                                return module.resource;
                            } else {
                                module = module.issuer;
                                return getResource();
                            }
                        }

                        var resource = getResource();

                        var name = resource.match(/[\/\\]components[\/\\](.*)\.js$/)[1];
                        return 'components/' + name;
                    }
                }
            }
        }
    },
    module: {
        rules: [...[{
            test: /\.js$/,
            exclude: [/[\/\\]node_modules[\/\\]/],
            use: [{
                loader: 'babel-loader'
            }]

        },
        // component/css
        {
            test: /(components[\/\\])(.*)\.(sc|sa|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        // assets/css
        {
            test: /[\/\\]assets[\/\\]css(.*)\.(sc|sa|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        // widget/css
        {
            test: /(widget[\/\\])(.*)\.(sc|sa|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.tmpl$/,
            use: [{
                loader: "ejs-webpack-loader",
                options: {
                    htmlmin: true
                }
            }]
        }
        ], ...[
            {
                test: /\.(png|jpg|gif)$/i,
                exclude: excludeImg,
                use: [{
                    loader: 'file-loader', // 解析引用路径
                    options: {
                        limit: imgLimit, // 小于8192字节的图片进行base64url处理
                        name: imgName, // [path]: 文件当前目录，给输出路径提供依赖
                        outputPath: './' // 输出路径相对与dist根目录
                    }
                }]
            }, {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: imgName,
                    outputPath: './'
                },
            }
        ]]
    },
    plugins: [
        new webpack.DefinePlugin(replaceObj_test)
    ]
}

module.exports = config;