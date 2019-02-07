export const writeUserData = (uid, name, email, imageUrl) => {
  firebase.database().ref('users/'+uid).set({
    "perfil": {
      username: name !== null ? name : firebase.auth().currentUser.email,
      email: email,
      profile_picture: imageUrl !== null ? imageUrl : false,
    }
      
  });
}

export const enviarConvalidacionAFirebase =(uid, username,title, body,postTag)=>{
  // Crear nuevo post
  const postData = {
    author: username !== null ? name : firebase.auth().currentUser.email,
    uid: uid,
    body: body,
    title: title,
    hashtag: postTag,
   // imagen: imagen !== null ? imagen : false,
    
  };

  // Llave que identifica el nuevo post
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Ingresa el post en publico y en su perfil.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/users/' + uid + '/post/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

export const readPost = (onpostChange) => {
  var postRef = firebase.database().ref('posts');
  postRef.on('child_added',(coment)=> {
    onpostChange(coment);
  });
};

/*
export function deletePost(){ 
  firebase.database().ref('posts/'+ this.id).set({
    null:null
  })
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+ '/post/'+ this.id).set({
    null:null
  })
};
*/




