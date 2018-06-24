//babel test
let a = () =>{
    console.log(".....3333333")
}
a();

import "./b.js"

// {
// 	let a = "d";
//   {
//     let a = "b";
//   }
//   let b = a;
//   console.log(a)
// }

new Promise(function(resolve){
      setTimeout(function(){
          resolve(1)
      },1000)
  }).then(function(data){
      console.log("......................")
      console.log(data);
      return new Promise(function(r){
        setTimeout(function(){
          r("3333....ijijij")
        },1000)
      })


  }).then(function(data){
    console.log(data)
  })