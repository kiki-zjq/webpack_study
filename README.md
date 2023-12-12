# webpack_study

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
