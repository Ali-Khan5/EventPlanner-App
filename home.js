var singleday=document.getElementById("singleEvent");
var multiday=document.getElementById("multiEvent");
var title=document.getElementById("title"), descript=document.getElementById("aboutevent")
eventLoc=document.getElementById("eventLocation"),date1=document.getElementById("date"),
date2=document.getElementById("date2"),date3=document.getElementById("date3");
var downloadURL;
var userInfo=JSON.parse(localStorage.getItem("Userlog"));
//console.log(userInfo);
singleday.style.display="none";
multiday.style.display="none";
var main=document.getElementById("main");
var Events=firebase.database().ref("/Events").orderByChild("date");
var Events2=firebase.database().ref("/Events");
Events.on("child_added",function(snap){
    var obj2={
        value:snap.val(),
        key:snap.key
    }
    //console.log(obj2.value.CreatedBy);
    //console.log(userInfo.displayname);
    if(obj2.value.CreatedBy == userInfo.displayname ){
        createCard(obj2);
  }
    //console.log(obj2);
    //createCard(obj2);
})
function createEvent(){
    var EventObj={
        EventName:title.value,
        description:descript.value,
        EventLoc:eventLoc.value,
        date:date1.value,
        created:firebase.database.ServerValue.TIMESTAMP,
        CreatedBy:userInfo.displayname,
        email:userInfo.email,
        BackgroundImageUrl:downloadURL
    }
    Events2.push(EventObj);

    title.value="";
    descript.value="";
    eventLoc.value="";
    date1.value="";
    downloadURL="";
}
function   radioDate(){
   var radio1=document.getElementById("optionsRadios1");
   var radio2=document.getElementById("optionsRadios2");
    var duration=document.getElementById("duration");
if(radio1.checked ){
    //console.log("yooo")
    duration.style.display="none";
    singleday.style.display="block";
    
}
else if(radio2.checked){

    //console.log("yo2222");
    duration.style.display="none";
    multiday.style.display="block";
}


}
function upload(){


// Create a root reference
        var selectedfile=document.getElementById("file").files[0];
        var filename=selectedfile.name;
        var storageRef = firebase.storage().ref("/imgs/"+filename);
        var uploadTask=storageRef.put(selectedfile);
            
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            document.getElementById("moAlert").style.display="block";
             downloadURL = uploadTask.snapshot.downloadURL;
            //console.log(downloadURL);
            createEvent();
            

        });


}
function idreturn(value){
    //console.log(value.id);
    var key=value.id;
    localStorage.setItem("KEY",JSON.stringify(key));
    location="eventpage.html"
}

function createCard(data){
        var div=document.createElement("DIV");
        div.setAttribute("class","card");
        div.setAttribute("id",data.key);
       // div.setAttribute("onclick","idreturn(this);");
        var img=document.createElement("IMG");
        img.setAttribute("src",data.value.BackgroundImageUrl);
        img.setAttribute("class","card-img-top");
        var butt=document.createElement("BUTTON");
        var buttxt=document.createTextNode("Delete Event");
        
        butt.onclick = function() {
            remove(data.key);
        }
        butt.setAttribute("class","btn btn-danger float-right bu");
        butt.appendChild(buttxt);

        var firstdiv=document.createElement("DIV");
        firstdiv.setAttribute("class","card-block");
        var h4=document.createElement("H4");
        h4.setAttribute("class","card-title");
        var h4txt=document.createTextNode(data.value.EventName);
        h4.appendChild(h4txt);
        var p=document.createElement("P");
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
        div.appendChild(butt);
        div.appendChild(firstdiv);
        main.appendChild(div);

}
function remove(key){
    var event=firebase.database();
    event.ref("/Events/" +key).remove();
}
var event2=firebase.database();
event2.ref("/Events").on("child_removed", function(data){
    var deletedDiv = document.getElementById(data.key);
    deletedDiv.remove();
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