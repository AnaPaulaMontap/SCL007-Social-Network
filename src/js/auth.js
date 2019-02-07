import {writeUserData} from './app.js'

window.onload = () =>{
    checkAuthState();
};

export const checkAuthState =(callback) =>{
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser){
            console.log("Hay un usuario >" )//+ JSON.stringify(firebaseUser)
           
            writeUserData(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)
            ;
            callback(firebaseUser)
        }else{
            console.log('No está logueado')
            callback(null)
        }
    })

};

export const register = (email,pass) =>{
 firebase.auth().createUserWithEmailAndPassword(email, pass)
.then((firebaseUser)=>{
    console.log("usuario >" + JSON.stringify(firebaseUser.uid) )
})
.catch(e =>console.log(e.message))
};


export const login = (email, pass) => {
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((firebaseUser) => {
            console.log("usuario >" + JSON.stringify(firebaseUser))
        })
        .then(() =>{
            writeUserData(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)

        })
        .catch(e => console.log(e.message))
};

export const exit = () =>{
    firebase.auth().signOut();
}

export const google = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(result.user.uid)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
      
      
}

export const facebook =() =>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);    
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
        }
        // The signed-in user info.
        var user = result.user;
        console.log(result.user.uid)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
      writeUserData(firebase.auth().currentUser.uid, firebase.auth().currentUser.displayName, firebase.auth().currentUser.email,firebase.auth().currentUser.photoURL)
}