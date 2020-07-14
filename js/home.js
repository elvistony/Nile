var Reels = document.getElementsByClassName('n-reel')

function NextReel() {
  for (var i = 0; i < Reels.length; i++) {
    if(Reels[i].style.opacity==1){
      Reels[i].style.opacity=0;
      setTimeout(function(){
        Reels[i].style.display='none';
      },200)
      var next = parseInt((i+1)%3);
      setTimeout(function(){
        Reels[next].style.display='block';
        Reels[next].style.opacity=1;
      },200)
      break;
    }
  }
}

var myVar = window.setInterval(NextReel, 3000);
// NextReel()
// NextReel()
// NextReel()
