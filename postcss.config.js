// module.exports = {
//     plugins : [
//         require('autoprefixer')({
//             // browsers:['>1%','last 5 versions','ie >= 9']
//             // browsers:["last 10 versions","ie >= 9","ff >= 30","chrome >= 34","safari >= 6","ios >= 6","android >= 4.4","Firefox >= 20"]
//         })
//     ]
// }

 module.exports = {
    "plugins": {
      // 会直接引用package.json的browserslist
      "autoprefixer": {}
    }
  }