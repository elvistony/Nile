//
var Kart = [];
// var PrevKart = [];
var Kbar = document.getElementsByClassName("n-selected-bar")[0];
var ItemContainer = document.getElementsByClassName("n-items")[0].children[1];
var ResultNo = document.getElementById('item-section')
var ListItems = [];

var Sizes=0;
Total=0.0;


function proceedToKart() {
  document.getElementById('goToKart').submit();
}

// tooltip message-function
function tooltip(message) {
  var tooltip=document.getElementById('tooltip');
  tooltip.style.opacity=1;
  tooltip.innerHTML="<p>"+message+"</p>"
  setTimeout(function(){
      tooltip.style.opacity=0;
  }, 3000);
}

// Get Items from JSON
function getList() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      populate(myObj)
      ListItems=myObj;
      console.log(myObj)
    }
  };
  xmlhttp.open("GET", "../data/items.json", true);
  xmlhttp.send();
}

function populate(data){
  jsonn=data;
  if(ItemContainer.children.length>0){
    ItemContainer.innerHTML=""
  }
  var html='<div id="television">'
  var category = 'television';
  for (var category in data) {
    html+='</div><div id="'+category+'">'
    for (var item in data[category]) {
      html += GenHtml(data,category,item);
    }
    html+='</div>'
  }
    ItemContainer.innerHTML+=html;
    LoadCartItems()
}

function GenHtml(data,category,item){

  return `<div class="n-item" id="`+item+`" onloaddata="setVisibleOpacity(this)" >
    <span class="n-item-price"><div>&#8377; `+(data[category][item]['i-price']*1-1)+
    `</div><p class="n-cut">&#8377; `+(data[category][item]['i-price']*1+2000)+`</p></span>
    <img class="n-image" src="`+data[category][item]['i-img']+`" alt="`+data[category][item]['i-name']+`">
    <h3>`+data[category][item]['i-name']+`</h3>
    <p>`+data[category][item]['i-caption']+`</p>
    <p><span>Quantity </span><input type="number" min="0" max="5" value="1" name="`+item+`"></p>
    <button type="button" class="n-button n-right n-green n-rounded n-green-hover" mode="add" name="button" onclick="addToCart('`+item+`',this)">Add <i class="fa fa-cart-plus"></i></button>
    <button type="button" class="n-button n-right n-orange-hover n-rounded" name="button" onclick="details(this)">Details</button>
  </div>
  `;
}

function LoadCartItems(){
  if(Object.keys(PrevKart).length>0){
    for (var item in PrevKart) {
      button = document.getElementById(item).children[5];
      qty = document.getElementById(item).children[4].children[1];
      qty.value = PrevKart[item];
      console.log(qty.value);
      addToCart(item,button);
    }
  }
}

function SwitchTab(topic){
    document.getElementById('television').style.display="none";
    document.getElementById('smartphone').style.display="none";
    document.getElementById("item-section").innerText="0 results found";
  if(topic=="all"){
    document.getElementById('television').style.display="";
    document.getElementById("item-section").innerText="6 results found";
    document.getElementById('smartphone').style.display="";
  }else{
    document.getElementById(topic).style.display="";
    document.getElementById("item-section").innerText="3 results found";
  }
}

// ON LOAD - RUN
getList()
document.getElementById("item-section").innerText="3 results found";
UpdateBar()
// AllItems=1

function checkSpace() {
  if (Object.keys(Kart).length<5){
    return true;
  }else{
    alert("Kart is Full")
    return false;
  }
}
function UpdateBar(){
  if (Object.keys(Kart).length>0){
    Kbar.style.display="";
  }else{
    Kbar.style.display="none";
  }
}
function updateTotal(value){
  Total=parseFloat(Total)+parseFloat(value)
  console.log(value)
  document.getElementById('KartTotal').innerText=Total;
}

function addToCart(id,button) {
  if(checkSpace()){
    var qty = document.getElementById(id).children[4].children[1]
    var rate = document.getElementById(id).children[0].children[0].innerText.substr(2)
    console.log(qty);
    if(id in Kart){
      a=1;
    }else{
      tooltip("Adding Item to Kart");
      Kart[id]=qty.value;
      console.log(typeof(rate*1));
      qty.value=1;
      updateTotal(rate*Kart[id]);
      makeButtonRemove(button,id);
      makeKartItem(id);
    }
  }
}

function popFrmKart(id,button=1) {
  if (button==1) {
    button = document.getElementById(id).children[5]
  }
    if(id in Kart){
      tooltip("Removing Item from Kart");
      var rate = document.getElementById(id).children[0].children[0].innerText.substr(2)
      updateTotal((parseFloat(rate)*parseInt(Kart[id]))*-1);
      delete Kart[id];
      makeButtonAdd(button,id);
      removeKartItem(id);
    }
}


function makeButtonRemove(button,id){
  button.innerHTML='Remove <i class="fa fa-cart-plus "></i>';
  button.classList.replace("n-green","n-red-hover")
  button.classList.add("n-bordered")
  button.setAttribute("onclick","popFrmKart('"+id+"',this)");
}

function makeButtonAdd(button,id){
  button.innerHTML='Add <i class="fa fa-cart-plus"></i>';
  button.classList.replace("n-red-hover","n-green")
  button.classList.add("n-bordered")
  button.setAttribute("onclick","addToCart('"+id+"',this)");
}

function makeItemEntry(id) {
  return '<div class="n-selected-item" id="bar-'+id+'">'
    +'<span class="n-selected-close" onclick="popFrmKart(\''+id+'\')"><i class="fa fa-times-circle"></i></span>'
    +'<input type="hidden" name="'+id+'" value="'+Kart[id]+'">'
    +'<p class="n-selected-number">'+Kart[id]+'</p>'
    +document.getElementById(id).children[1].outerHTML
    +'</div>'
}

function makeKartItem(id){
  UpdateBar()
  Kbar.innerHTML=makeItemEntry(id)+Kbar.innerHTML;
}
function removeKartItem(id){
  document.getElementById('bar-'+id).outerHTML=""
  UpdateBar()
}
