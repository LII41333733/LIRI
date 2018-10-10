var obj = {
 a:"1",
 b:"2",
 c:"3"
}
var counter = 0;
for(var x in obj){
 counter++
 console.log(obj[x])
 if(counter >= 2){
  break;
 }
}

for(var y =0;y < 100; y++){
 if (y == 50){
  console.log(50);
  break;
 }else{
  console.log(y);
 }

}