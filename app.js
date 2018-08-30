var provider = new firebase.auth.FacebookAuthProvider();
var provider2 = new firebase.auth.GoogleAuthProvider();


function  GoogleSignin(){
    firebase.auth().signInWithPopup(provider2).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.photoURL);
        var obj={
            displayname:user.displayName,
            email:user.email,
            userpic:user.photoURL
        }
        localStorage.setItem("Userlog",JSON.stringify(obj));
        console.log(user);
        location="homepage.html";
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}
function facebookSignin() {
    firebase.auth().signInWithPopup(provider)
    
    .then(function(result) {
       var token = result.credential.accessToken;
       var user = result.user;
         
       console.log(token)
       console.log(user.displayName);
       console.log(user.email);
       console.log(user.photoURL);
       var obj={
           displayname:user.displayName,
           email:user.email,
           userpic:user.photoURL
       }
       localStorage.setItem("Userlog",JSON.stringify(obj));
       console.log(user);
       location="homepage.html";
    }).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
    });
 }
 
 function facebookSignout() {
    firebase.auth().signOut()
    
    .then(function() {
       console.log('Signout successful!')
    }, function(error) {
       console.log('Signout failed')
    });
 }