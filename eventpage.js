var key=JSON.parse(localStorage.getItem("KEY"));
//console.log(key);
var eventTitle=document.getElementById("evtitle");
var pic=document.getElementById("pic");
var descript=document.getElementById("eventdes");
var location1=document.getElementById("lo");
var EventPage=firebase.database().ref("/Events/"+key);
var userNode=firebase.database().ref("/User/");
var edate=document.getElementById("datee")
var created=document.getElementById("created");
var email=document.getElementById("email");
var comments=firebase.database().ref("/comments");
var disscussdiv=document.getElementById("disscss");
var divv=document.getElementById("divvv");
divv.setAttribute("id",key);
EventPage.on("value",function(snap){
   // console.log(snap.val());
    print(snap.val());

})
UserNode.on("value",function(snap){
   // console.log(snap.val());
    print(snap.val());

})

function facebookSignout() {
    firebase.auth().signOut()
    
    .then(function() {
       console.log('Signout successful!')
       location="index.html";
    }, function(error) {
       console.log('Signout failed')
    });
 }

function print(data){
        eventTitle.innerHTML=data.EventName;
        descript.innerHTML=data.description;
        pic.setAttribute("src",data.BackgroundImageUrl);
        location1.innerHTML=data.EventLoc;
        edate.innerText=data.date;
        created.innerHTML=data.CreatedBy;
        email.innerHTML="Email: "+data.email;

        var div2=document.createElement("div");
        div2.setAttribute("class","form-group");
        var input=document.createElement("INPUT");
        input.setAttribute("class","form-control in ");
        input.setAttribute("id","input"+key);
        input.setAttribute("placeholder","Enter your comment..");
        div2.appendChild(input);

        var butt=document.createElement("BUTTON");
        var buttxt=document.createTextNode("comment");
        butt.setAttribute("class","btn btn-primary bu");
        butt.appendChild(buttxt);
        div2.appendChild(butt);
        butt.onclick=function(){
            submitComment(key);
            }
            disscussdiv.appendChild(div2);
}

var userInfo=JSON.parse(localStorage.getItem("Userlog"));
//console.log(userInfo);

comments.on("child_added",function(snap){
   // console.log(snap.val());
    ShowComment(snap.val());
})
function submitComment(id){
    var comment=document.getElementById("input"+id).value;
    var commentobj={
        Comment:comment,
        key:id,
        name:userInfo.displayname,
        pic:userInfo.userpic

    };
    
    comments.push(commentobj);
}

function ShowComment(data){
    var div=document.getElementById(data.key);
    
    var ul=document.createElement("UL");
    var li=document.createElement("LI");
    var img=document.createElement("IMG");
    var small=document.createElement("small");
    small.setAttribute("class","text-muted");
    var smalltxt=document.createTextNode(' Says : ')
    small.appendChild(smalltxt);

    //<small class="text-muted">Last updated 3 mins ago</small>")
    img.setAttribute("class","comment-pic ");

    var p=document.createElement("P");
    p.setAttribute("class","card-text");
    //var p2=document.createElement("P");
    //p2.setAttribute("class","card-text quote");
    var txtnode2=document.createTextNode(data.Comment);
    

    img.setAttribute("src",data.pic);
    var txtnode=document.createTextNode(data.name);
    ul.setAttribute("class","list-group");
    li.setAttribute("class","list-group-item");
    li.appendChild(img);
    p.appendChild(txtnode);
    p.appendChild(small);
    p.appendChild(txtnode2);
    li.appendChild(p);
    
    
    ul.appendChild(li);

    div.appendChild(ul);
}


