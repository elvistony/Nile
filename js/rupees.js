var rupees = document.getElementsByClassName('n-rupees');

for (var rupee of rupees) {
  rupee.innerText = Rupify(rupee.innerText);
}

function Rupify(value) {
  final = ""
  value = String(value);
  final = value.substring(value.length-3,value.length);
  b = value.substring(0,value.length-3)
  console.log("left "+b);
  console.log("final "+final);
 while (true){
    if(b.length>2){
      final = b + "," + final;
      b = b.substring(b.length-2,b.length)
    }else{
      break
    }
    console.log(b);
  }
  if(b.length<=2){
    final = b + "," + final;
  }
  console.log("return: "+final);
}
