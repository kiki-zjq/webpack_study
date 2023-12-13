// index.js
import bar from './bar.js';
import foo from './foo.js';
import './main.css'; // require('./main.css')
import './main2.css'; // require('./main.css')
console.log("Now we are in the index.js:" + Number(new Date()))

bar();
foo();

if (module.hot) {
  module.hot.accept('./bar.js', () => {
    console.log('Accepting the updated bar module!')
    bar();
  })
}
