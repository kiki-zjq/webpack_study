# Webpack Study

---
### Quick Start

Create `src/index.js` and `src/bar.js`
```js
// index.js
import bar from './bar.js';

bar();
```

```js
// bar.js
export default function bar() {
  //
}
```

Create `webpack.config.js`

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

Modify `package.json`
```json
{
  "dependencies": {
    "webpack": "^5.89.0"
  },
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "webpack-cli": "^5.1.4"
  }
}
```

Run command `npm run build`, then you can see the output `dist` folder!

---
### Import CSS

First install `css-loader` by using this command `npm install --save-dev css-loader style-loader`

Add a css file `./src/main.css`
```css
#app {
  text-align: center;
  color:red;
}
```

Import this css file into `./src/index.js`
```js
// index.js
import bar from './bar.js';
import './main.css'; // require('./main.css')
bar();
```

Modify `webpack.config.js`
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
        ]
      }
    ]
  }
};
```

And then `npm run build`. You can find in the css content in the file `./dist/bundle.js`

Create a HTML file in the root folder first
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <script src="./dist/bundle.js"></script>
    <div id="app">
      Hello World
    </div>
  </body>
</html>
```

Open this HTML file, seems the css doesn't take effect! We should add style-loader to the `webpack.config.js`
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Can't change the loader sequence
          'css-loader',
        ]
      }
    ]
  }
};
```

Run `npm run build` again, then we can see the expected outcomes.

---
### Extract CSS

In the previous case, all JavaScript code and CSS code are in the `bundle.js`, what if we want to extract CSS code to a single file?

First, `npm install mini-css-extract-plugin` to install the plugin.

And then modify the `webpack.config.js`
```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          // 'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }), 
  ]
};
```

---
### Plugin HTML

In the previous example, when we open the `index.html`, we will find the text color comes back to black, this is because we extract the CSS to a file `main.css`, and our HTML file didn't import this file.

In this example, we want to generate the `index.html` in the `dist` folder and import the related css file automatically.

First, we should install the plugin `npm install html-webpack-plugin`

Change the webpack config
```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          // 'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }), 
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ]
};
```

After we run `npm run build`, we can see a new `index.html` file below the `dist` folder. And the css has applied successfully.

Even though in the template html file `index.html`, we do not write any code about import the css file. But as the css file has been import in the  `./src/index.js`, so webpack automatically create a reference in the generated `./dist/index.html`

---
### Dev Server

```js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          // 'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }), 
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    })
  ],
  devServer: {
    host: 'localhost',
    port: '3000',
    open: true,
    hot: true,
  },
};
```

And then change the `package.json`
```json
{
  "dependencies": {
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.4",
    "mini-css-extract-plugin": "^2.7.6",
    "style-loader": "^3.3.3",
    "webpack": "^5.89.0"
  },
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack serve --config webpack.config.js"
  },
  "devDependencies": {
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```

And then `npm run dev`

In this case, the HMR has been enabled automatically. 
- If you modify the template HTML file, you should refresh the webpage by yourself to see the update.
- If you modify the CSS file, you can see you modification automatically.

However, in this case, we do not implement JS HMR. For example, once you change the JS code in the `foo.js`, all JS code in `index.js` will be re-run
```js
if (module.hot) {
  module.hot.accept('./bar.js', () => {
    console.log('Accepting the updated bar module!')
    bar();
  })
}
```
By adding the code like this, if you change the code in ths `bar.js`, all other code will not be re-run.
But still, if you change the code in the `foo.js`, then all other JS code will be re-run.

---
### SourceMap

In the previous case, if you make a mistake intentionally, for example
```js
// bar.js
export default function bar() {
  //
  consolessss.log('This is bar')
}
```

You can find the source code in the chrome dev tool is compiled version.

You can add `devtool: 'source-map'` in the `webpack.config.js`. And then you can find the source code in the chrome dev tool is pre-compiled version.