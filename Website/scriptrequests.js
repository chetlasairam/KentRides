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




  // Add the event listener for the form submit here as well
  document.getElementById('sendrequestbutton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('clicked submit');

    var authUser = firebase.auth().currentUser; // Get the current user

    if (authUser) {
        
        // document.querySelector('.card-body').style.display = 'block';



        // Continue with the code to msg the data to Firebase
        var Date = document.querySelector('.date').value;
        var Time = document.querySelector('.time').value;
        var From = document.querySelector('.from').value;
        var To = document.querySelector('.to').value;
        if(Date!=""&&Time!=""&&From!=""&&To!=""){
            // Reference to the Firebase Firestore database
        var db = firebase.firestore();
        var displayName = authUser.displayName;
        var userEmail = authUser.email;
        // Create a new msg document in the "msgs" collection
        db.collection("requests").add({
            username: displayName, // User's display name
            date: Date,
            time:Time,
            from:From,
            to:To,
            email:userEmail,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Server timestamp
        })
        .then(function(docRef) {
            // Reset the input field
            // document.querySelector('.card-body-log input').value = "";
            
            
            var msgRef = db.collection("users").doc(userEmail).collection("requests").doc(docRef.id);
            msgRef.set({
                username: displayName,
                date: Date,
                time:Time,
                from:From,
                to:To,
                email:userEmail,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() 
            });
            
            console.log("msg added with ID: ", docRef.id);
            alert("Added Successfully");

        })
        .catch(function(error) {
            console.error("Error adding msg: ", error);
        });
        }else{
            alert("Fill all the fields");
        }

        
    } else {
        // Handle the case when no user is signed in
        console.log("No user signed in. Cannot msg.");
    }
});
// Listen for authentication state changes
firebase.auth().onAuthStateChanged(function(authUser) {
    if (authUser) {
        
        email=authUser.email;
        var displayName = authUser.displayName;

        
        document.getElementById('sendrequestbutton').addEventListener('click', function() {
            var newMsgContainer = document.querySelector('.card-body-log');
            if (newMsgContainer.style.display === 'block') {
                newMsgContainer.style.display = 'block';

            } else {
                newMsgContainer.style.display = 'block';
            }
        });

        
    } else {
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('user-name').style.display = 'none';
        console.log("No User");
    }

    

});




// Function to query and render user's msgs based on the user's email
function fetchUsermsgsByEmail2() {
    firebase.auth().onAuthStateChanged(function(authUser) {
        if (authUser) {
    var db = firebase.firestore();
    
    userEmail=authUser.email;
    console.log("Email2:",userEmail);
    var msgsRef = db.collection("users").doc(userEmail).collection("requests");

    msgsRef.orderBy("timestamp", "desc").onSnapshot(function(querySnapshot) {
        var msgs = [];
        querySnapshot.forEach(function(doc) {
            var msg = doc.data();
            msg.ref = doc.id;
            var ref=doc.id;
            msgs.push(msg);
            console.log("msg data:", msg);
        });

        // Call the function to render the retrieved user's msgs
        rendermsgsWithDel2(msgs,authUser);
    }, function(error) {
        console.error("Error getting real-time updates for user's msgs: ", error);
    });
}else{
    console.error("cannot load");
}
    });
}





function rendermsgsWithDel2(msgs,authUser) {
    var allCardsContainer = document.querySelector('.card-body-log');
    var email=authUser.email;

    // Clear existing msgs (if any)
    allCardsContainer.innerHTML = '';

    if (msgs.length === 0) {
        var noRidesCard = document.createElement('div');
        noRidesCard.className = 'cardlogin';
    
        var noRidesCardBody = document.createElement('div');
        noRidesCardBody.className = 'card-body-log-in';
    
        var noRidesMsg = document.createElement('p');
        noRidesMsg.textContent = 'No Requested Rides';
        noRidesMsg.className = 'no-rides-msg';
    
        noRidesCardBody.appendChild(noRidesMsg);
        noRidesCard.appendChild(noRidesCardBody);
        allCardsContainer.appendChild(noRidesCard);
    } else {
        msgs.forEach(function(msg) {
            var card = document.createElement('div');
            card.className = 'cardlogin';
        
            var cardBody = document.createElement('div');
            cardBody.className = 'card-body-log-in';
        
            var username = document.createElement('h3');
            username.className = 'username';
            username.textContent = msg.username;
        
            var infoRow1 = document.createElement('div');
            infoRow1.className = 'info-row';
        
            var dateColumn = document.createElement('div');
            dateColumn.className = 'column';
            dateColumn.innerHTML = '<span class="info-heading">Date:</span><span class="info-data">' + msg.date + '</span>';
        
            var timeColumn = document.createElement('div');
            timeColumn.className = 'column';
            timeColumn.innerHTML = '<span class="info-heading">Time:</span><span class="info-data">' + msg.time + '</span>';
        
            infoRow1.appendChild(dateColumn);
            infoRow1.appendChild(timeColumn);
        
            var infoRow2 = document.createElement('div');
            infoRow2.className = 'info-row';
        
            var fromColumn = document.createElement('div');
            fromColumn.className = 'column';
            fromColumn.innerHTML = '<span class="info-heading">From:</span><span class="info-data">' + msg.from + '</span>';
        
            var toColumn = document.createElement('div');
            toColumn.className = 'column';
            toColumn.innerHTML = '<span class="info-heading">To:</span><span class="info-data">' + msg.to + '</span>';
        
            infoRow2.appendChild(fromColumn);
            infoRow2.appendChild(toColumn);
        
            var deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm ml-auto';
            deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete';
            
            // Add an event listener to the delete button to handle deletion
            deleteButton.addEventListener('click', function() {
                // Delete the document from Firestore
                console.log("msg id:", msg.id);
                db.collection('requests').doc(msg.ref).delete().then(function() {
                    console.log("Document successfully deleted!");
                    // Remove the card from the UI
                    card.remove();
                }).catch(function(error) {
                    console.error("Error deleting document: ", error);
                });
                db.collection("users").doc(email).collection('requests').doc(msg.ref).delete().then(function() {
                    console.log("Document successfully deleted!");
                    // Remove the card from the UI
                    card.remove();
                }).catch(function(error) {
                    console.error("Error deleting document: ", error);
                });
            });
    
    
            cardBody.appendChild(username);
            cardBody.appendChild(infoRow1);
            cardBody.appendChild(infoRow2);
            cardBody.appendChild(deleteButton);
        
            card.appendChild(cardBody);
        
            allCardsContainer.appendChild(card);
        });

    }
    
    

}


fetchUsermsgsByEmail2();



////////////////////////////////////////////
function displaymsgBox(){
    document.getElementById('msgBoxDiv').style.display = 'block';
    document.getElementById('rideLog').style.display = 'none';

}

function displayLog(){
    document.getElementById('msgBoxDiv').style.display = 'none';
    document.getElementById('rideLog').style.display = 'block';
    fetchUsermsgsByEmail2();
}




function handleRadioButtonChange2(selectedRadioButton) {
    if (selectedRadioButton.id === "requestedRides") {
        console.log(1); 
        displayLog();// Print 1 when "My msgs" is selected
    } else if (selectedRadioButton.id === "msgBox") {
        console.log(2); 
        displaymsgBox();// Print 2 when "All msgs" is selected
    }
}