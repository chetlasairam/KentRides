// Define the user variable in the outer scope
var user;
var email;
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDer9QXGQfcTklBaq9o2L5lunysctmAWu0",
    authDomain: "rides-d2159.firebaseapp.com",
    projectId: "rides-d2159",
    storageBucket: "rides-d2159.appspot.com",
    messagingSenderId: "814624189664",
    appId: "1:814624189664:web:db9853a4ec793bdd51b485"
  };
  
  if (firebase.apps.length === 0) {
    // Initialize Firebase here
    firebase.initializeApp(firebaseConfig);
}
  
  // Reference to the Firestore database
  var db = firebase.firestore();

  document.getElementById('newPostButton').addEventListener('click', function() {
    var authUser = firebase.auth().currentUser; // Get the current user

    if(authUser){
        console.log("Its in if");
        var newPostContainer = document.querySelector('.new-post-container');
        if (newPostContainer.style.display === 'none') {
            newPostContainer.style.display = 'block';

        } else {
            newPostContainer.style.display = 'none';
        }
    }else{
        console.log("Its in else");
        alert("login to Post");
    }
    
});

// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(authUser) {
    
    if (authUser) { 
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('user-name').style.display = 'block';

        // User is signed in
        var displayName = authUser.displayName;
        email=authUser.email;
        // If the user has a name, display it
        if (displayName) {
            document.getElementById('user-name').textContent = displayName;
        }
        console.log(displayName);

        // Add an event listener for the "Post" button here, inside the onAuthStateChanged callback
        

        // Add the event listener for the form submit here as well
        document.querySelector('.new-post-container form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            if (authUser) {
                document.querySelector('.new-post-container').style.display = 'none';
                var postText = document.querySelector('.new-post-container input').value;
                var userEmail = authUser.email;
                var imageFile = document.getElementById('imageUpload').files[0]; // Get the uploaded file

                var storageRef = firebase.storage().ref();

                var imageName = userEmail + '_' + Date.now();
                var imageRef = storageRef.child('images/' + imageName);

                if (imageFile) {
                    imageRef.put(imageFile).then(function (snapshot) {
                        console.log('Uploaded an image!');

                        imageRef.getDownloadURL().then(function (imageURL) {
                            var db = firebase.firestore();

                            db.collection("posts").add({
                                username: authUser.displayName,
                                text: postText,
                                email: userEmail,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imageUrl: imageURL
                            }).then(function (docRef) {
                                document.querySelector('.new-post-container input').value = "";
                                var postRef = db.collection("users").doc(userEmail).collection("posts").doc(docRef.id);
                                postRef.set({
                                    username: authUser.displayName,
                                    text: postText,
                                    email: userEmail,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    imageUrl: imageURL
                                });

                                console.log("Post added with ID: ", docRef.id);
                                document.getElementById('mypostslabel').classList.add('active');
                                document.getElementById('allpostslabel').classList.remove('active');
                                alert("Added Successfully");
                            }).catch(function (error) {
                                console.error("Error adding post: ", error);
                            });
                        }).catch(function (error) {
                            console.error("Error getting image URL: ", error);
                        });
                    }).catch(function (error) {
                        console.error("Error uploading image: ", error);
                    });
                } else {
                    var db = firebase.firestore();

                    db.collection("posts").add({
                        username: authUser.displayName,
                        text: postText,
                        email: userEmail,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(function (docRef) {
                        document.querySelector('.new-post-container input').value = "";
                        var postRef = db.collection("users").doc(userEmail).collection("posts").doc(docRef.id);
                        postRef.set({
                            username: authUser.displayName,
                            text: postText,
                            email: userEmail,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });

                        console.log("Post added with ID: ", docRef.id);
                        document.getElementById('mypostslabel').classList.add('active');
                        document.getElementById('allpostslabel').classList.remove('active');
                        alert("Added Successfully");
                    }).catch(function (error) {
                        console.error("Error adding post: ", error);
                    });
                }
            } else {
                console.log("No user signed in. Cannot post.");
            }
        });
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('user-name').style.display = 'none';
        console.log("No User ");
    }

    
    
    
    
    
});

// Add an event listener for the "Sign Out" option
document.querySelector('.signout-option').addEventListener('click', function() {
    // Sign out the user using Firebase Authentication
    firebase.auth().signOut().then(function() {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('user-name').style.display = 'none';
        document.querySelector('.new-post-container').style.display = 'none';
        console.log('User signed out');
    }).catch(function(error) {
        // An error happened.
        console.error('Sign-out error:', error);
    });
});




// Function to query and render user's posts based on the user's email
function fetchUserPostsByEmail() {
    firebase.auth().onAuthStateChanged(function(authUser) {
        if (authUser) {
    var db = firebase.firestore();
    
    userEmail=authUser.email;
    console.log("Email:",userEmail);
    var postsRef = db.collection("users").doc(userEmail).collection("posts");

    postsRef.orderBy("timestamp", "desc").onSnapshot(function(querySnapshot) {
        var posts = [];
        querySnapshot.forEach(function(doc) {
            var post = doc.data();
            post.ref = doc.id;
            var ref=doc.id;
            posts.push(post);
            console.log("post data:", post);
        });

        // Call the function to render the retrieved user's posts
        renderPostsWithDel(posts,authUser);
    }, function(error) {
        console.error("Error getting real-time updates for user's posts: ", error);
    });
}else{
    alert("Login to View your Posts");
}
    });
}

// Function to fetch and render all posts
// Function to fetch and display all posts
function fetchAllPosts() {
    var db = firebase.firestore();
    var postsRef = db.collection("posts");

    postsRef.orderBy("timestamp", "desc").onSnapshot(function(querySnapshot) {
        var posts = [];
        querySnapshot.forEach(function(doc) {
            var post = doc.data();
            posts.push(post);
        });

        // Call the function to render the retrieved posts
        renderPosts(posts);
    }, function(error) {
        console.error("Error getting real-time updates for all posts: ", error);
    });
}

function handleRadioButtonChange(selectedRadioButton) {
    if (selectedRadioButton.id === "myPostsOption") {
        console.log(1); 
        fetchUserPostsByEmail();// Print 1 when "My Posts" is selected
    } else if (selectedRadioButton.id === "allPostsOption") {
        console.log(2); 
        fetchAllPosts();// Print 2 when "All Posts" is selected
    }
}



/////
function renderPosts(posts) {
    var allCardsContainer = document.querySelector('.allCards');

    // Clear existing posts (if any)
    allCardsContainer.innerHTML = '';

    // Calculate the number of columns based on the number of posts
    var numColumns = posts.length >= 2 ? 2 : 1;

    // Create rows and columns in a grid layout
    for (var i = 0; i < posts.length; i += numColumns) {
        var row = document.createElement('div');
        row.className = 'row';

        // Loop for the number of columns
        for (var j = i; j < i + numColumns && j < posts.length; j++) {
            var post = posts[j];

            var col = document.createElement('div');
            col.className = numColumns === 1 ? 'col-md-12 mb-4 d-flex' : 'col-md-6 mb-4 d-flex flex-column'; // Set appropriate column class
            
            col.style.flexDirection = 'column';

            

            var card = document.createElement('div');
            card.className = 'card indivpostcard h-100';
            card.style.height = '100%'; // Ensure column height is at least 100%
            card.style.flexDirection = 'column';

            // Card Body
            var cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex align-items-center';

            // User Image
            var userImage = document.createElement('img');
            userImage.src = 'img.jpg'; // Replace with your actual user image source
            userImage.className = 'user-img'; // Set appropriate class for styling

            // User Information
            var userInfo = document.createElement('div');
            userInfo.className = 'user-info';

            var username = document.createElement('h5');
            username.className = 'card-title mb-0';
            username.textContent = post.username;

            var mail=post.email;
            var mailname = document.createElement('h6');
            mailname.className = 'card-title mb-0 mail';
            
            mailname.textContent = mail;

            var postText = document.createElement('p');
            postText.className = 'card-text';
            postText.textContent = post.text;

            

            // Appending user info
            userInfo.appendChild(username);
            userInfo.appendChild(mailname);
            // Image
            if (post.imageUrl) {
                var postImage = document.createElement('img');
                postImage.src = post.imageUrl; // Set the image source from Firebase Storage
                postImage.className = 'post-img'; // Set appropriate class for styling
                postImage.alt = 'Post Image';
                postImage.style.maxWidth = '100%'; // Set width
                postImage.style.height = 'auto'; // Set height
                postImage.style.borderRadius="10px";

                // Append image to the user info
                userInfo.appendChild(postImage);
            }
            userInfo.appendChild(postText);

            // Appending user image and info to card body
            cardBody.appendChild(userImage);
            cardBody.appendChild(userInfo);

            // Appending card body to card
            card.appendChild(cardBody);
            // (function(emailText) {
            //     card.addEventListener('click', function() {
            //         console.log(emailText);
            //         var emailSubject = "Regarding your post in KentConnects";
            //         var emailBody = "Your email body";
            //         window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + emailText + "&su=" + emailSubject + "&body=" + emailBody, '_blank');
            //     });
            // })(mailname.textContent);
            
            (function(emailText) {
                card.addEventListener('click', function() {
                // var emailText = mailname.textContent;
                var emailSubject = "Regarding your post in KentConnects";
                var emailBody = "Your email body";

                // Check if the device is mobile
                var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                if (isMobile) {

                    window.location.href = "mailto:" + emailText + "?subject=" + emailSubject + "&body=" + emailBody;
                } else {
                    // Open in a new tab for non-mobile devices
                    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + emailText + "&su=" + emailSubject + "&body=" + emailBody, '_blank');
                }
            });
        })(mailname.textContent);
            // Append the card to the column
            col.appendChild(card);

            // Append the column to the row
            row.appendChild(col);
        }

        // Append the row to the container
        

        
        allCardsContainer.appendChild(row);
    };
}




function renderPostsWithDel(posts,authUser) {
    var allCardsContainer = document.querySelector('.allCards');
    var email=authUser.email;

    // Clear existing posts (if any)
    allCardsContainer.innerHTML = '';

    // Loop through the retrieved posts
    posts.forEach(function(post) {
        var card = document.createElement('div');
        card.className = 'card';

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex align-items-center';

        var userImage = document.createElement('img');
        userImage.src = 'img.jpg'; // You may replace this with the actual user image

        var userInfo = document.createElement('div');

        var username = document.createElement('h5');
        username.className = 'card-title mb-0';
        username.textContent = post.username; // Replace with the actual username

        var postText = document.createElement('p');
        postText.className = 'card-text';
        postText.textContent = post.text; // Replace with the actual post text

        // Create a delete button
        var deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm ml-auto'; // Add your desired styling here
        deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete'; // You can replace 'fa-trash' with your actual delete icon class

        // Add an event listener to the delete button to handle deletion
        deleteButton.addEventListener('click', function() {
            // Delete the document from Firestore
            console.log("post id:", post.id);
            db.collection('posts').doc(post.ref).delete().then(function() {
                console.log("Document successfully deleted!");
                // Remove the card from the UI
                card.remove();
            }).catch(function(error) {
                console.error("Error deleting document: ", error);
            });
            db.collection("users").doc(email).collection('posts').doc(post.ref).delete().then(function() {
                console.log("Document successfully deleted!");
                // Remove the card from the UI
                card.remove();
            }).catch(function(error) {
                console.error("Error deleting document: ", error);
            });
        });
        
        userInfo.appendChild(username);
        // Image
        if (post.imageUrl) {
            var postImage = document.createElement('img');
            postImage.src = post.imageUrl; // Set the image source from Firebase Storage
            postImage.className = 'post-img'; // Set appropriate class for styling
            postImage.alt = 'Post Image';
            postImage.style.maxWidth = '100%'; // Set width
            postImage.style.height = 'auto'; // Set height
            postImage.style.borderRadius="10px";

            // Append image to the user info
            userInfo.appendChild(postImage);
        }
        userInfo.appendChild(postText);

        cardBody.appendChild(userImage);
        cardBody.appendChild(userInfo);
        cardBody.appendChild(deleteButton);

        card.appendChild(cardBody);

        allCardsContainer.appendChild(card);
    });
}


fetchAllPosts();


// // Add event listener to each indivpostcard
// document.querySelectorAll('.indivpostcard').forEach(function(card) {
//     card.addEventListener('click', function() {
//         var email = card.querySelector('.mail').textContent;
//         console.log(email);
//     });
// });