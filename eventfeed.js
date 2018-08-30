var main=document.getElementById("main");
var Events=firebase.database().ref("/Events").orderByChild("date");
Events.on("child_added",function(snap){
    var obj2={
        value:snap.val(),
        key:snap.key
    }
    console.log(obj2);
    
    createCard(obj2);
})

function idreturn(value){
  //  console.log(value.id);
    var key=value.id;
    localStorage.setItem("KEY",JSON.stringify(key));
    location="eventpage.html"
}

function facebookSignout() {
    firebase.auth().signOut()
    
    .then(function() {
       console.log('Signout successful!')
       location="index.html";
    }, function(error) {
       console.log('Signout failed')
    });
 }
function createCard(data){
    var div=document.createElement("DIV");
    div.setAttribute("class","card");
    div.setAttribute("id",data.key);
    //div.setAttribute("onclick","idreturn(this);");
    var img=document.createElement("IMG");
    img.setAttribute("src",data.value.BackgroundImageUrl);
    img.setAttribute("class","card-img-top");
    

    var firstdiv=document.createElement("DIV");
    firstdiv.setAttribute("class","card-block");
    var h4=document.createElement("H4");
    h4.setAttribute("class","card-title");
    var h4txt=document.createTextNode(data.value.EventName);
    h4.appendChild(h4txt);
    var p=document.createElement("P");
    p.setAttribute("class","card-text");
    p.setAttribute("class","card-text clickable");
    p.setAttribute("id",data.key);
    p.setAttribute("onclick","idreturn(this);");
    var ptxt=document.createTextNode(data.value.description.substr(0,200)+"...");
    var span=document.createElement('SPAN');
    span.setAttribute("class","more")
    var spantxt=document.createTextNode("See More");
    span.appendChild(spantxt);

    var h5=document.createElement("H5");
    var h5txt=document.createTextNode("Event at: ");
    var p2=document.createElement("P");
    p2.setAttribute("class","card-text");
    var ptxt2=document.createTextNode(data.value.EventLoc+" on  "+data.value.date );
    var div2=document.createElement("DIV");
    h5.appendChild(h5txt);
    p2.appendChild(ptxt2);
    div2.appendChild(h5);
    div2.appendChild(p2);
    p.appendChild(ptxt);
    p.appendChild(span);
    firstdiv.appendChild(h4);
    firstdiv.appendChild(p);
    firstdiv.appendChild(div2);
    div.appendChild(img);
    
    div.appendChild(firstdiv);
    main.appendChild(div);

}