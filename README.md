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