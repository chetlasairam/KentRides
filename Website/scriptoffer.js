function displaytoRequest(){
    document.getElementById('toOffer').style.display = 'block';
    document.getElementById('toRequest').style.display = 'none';
    fetchUsermsgRequestssByEmail3();

}

function displaytoOffer(){
    document.getElementById('toOffer').style.display = 'none';
    document.getElementById('toRequest').style.display = 'block';
    fetchUsermsgRequestssByEmail3();
}




function handleRadioButtonChange3(selectedRadioButton) {
    if (selectedRadioButton.id === "requestOption") {
        console.log("top:",1); 
        displaytoOffer();// Print 1 when "My msgRequestss" is selected
    } else if (selectedRadioButton.id === "offerOption") {
        console.log("top:",2); 
        displaytoRequest();// Print 2 when "All msgRequestss" is selected
    }
}

function fetchUsermsgRequestssByEmail3() {
    firebase.auth().onAuthStateChanged(function(authUser) {
        if (authUser) {
    var db = firebase.firestore();
    
    userEmail=authUser.email;
    console.log("Email2:",userEmail);
    var msgRequestssRef = db.collection("requests");

    msgRequestssRef.orderBy("timestamp", "desc").onSnapshot(function(querySnapshot) {
        var msgRequestss = [];
        querySnapshot.forEach(function(doc) {
            var msgRequests = doc.data();
            msgRequests.ref = doc.id;
            var ref=doc.id;
            msgRequestss.push(msgRequests);
            console.log("msgRequests data:", msgRequests);
        });

        // Call the function to render the retrieved user's msgRequestss
        rendermsgRequestssWithDel3(msgRequestss,authUser);
    }, function(error) {
        console.error("Error getting real-time updates for user's msgRequestss: ", error);
    });
}else{
    console.error("cannot load");
}
    });
}





function rendermsgRequestssWithDel3(msgRequestss,authUser) {
    var allCardsContainer = document.querySelector('.toOfferClass');
    var email=authUser.email;

    // Clear existing msgRequestss (if any)
    allCardsContainer.innerHTML = '';

    if (msgRequestss.length === 0) {
        var noRidesCard = document.createElement('div');
        noRidesCard.className = 'noRides';
    
        var noRidesCardBody = document.createElement('div');
        noRidesCardBody.className = 'noRidesin';
    
        var noRidesmsgRequests = document.createElement('p');
        noRidesmsgRequests.textContent = 'No Requested Rides';
        noRidesmsgRequests.className = 'no-rides-msgRequests';
    
        noRidesCardBody.appendChild(noRidesmsgRequests);
        noRidesCard.appendChild(noRidesCardBody);
        allCardsContainer.appendChild(noRidesCard);
    } else {
        msgRequestss.forEach(function(msgRequests) {
            var card = document.createElement('div');
            card.className = 'cardlogin';
        
            var cardBody = document.createElement('div');
            cardBody.className = 'card-body-log-in';
        
            var username = document.createElement('h3');
            username.className = 'username';
            username.textContent = msgRequests.username;
        
            var infoRow1 = document.createElement('div');
            infoRow1.className = 'info-row';
        
            var dateColumn = document.createElement('div');
            dateColumn.className = 'column';
            dateColumn.innerHTML = '<span class="info-heading">Date:</span><span class="info-data">' + msgRequests.date + '</span>';
        
            var timeColumn = document.createElement('div');
            timeColumn.className = 'column';
            timeColumn.innerHTML = '<span class="info-heading">Time:</span><span class="info-data">' + msgRequests.time + '</span>';
        
            infoRow1.appendChild(dateColumn);
            infoRow1.appendChild(timeColumn);
        
            var infoRow2 = document.createElement('div');
            infoRow2.className = 'info-row';
        
            var fromColumn = document.createElement('div');
            fromColumn.className = 'column';
            fromColumn.innerHTML = '<span class="info-heading">From:</span><span class="info-data">' + msgRequests.from + '</span>';
        
            var toColumn = document.createElement('div');
            toColumn.className = 'column';
            toColumn.innerHTML = '<span class="info-heading">To:</span><span class="info-data">' + msgRequests.to + '</span>';
        
            infoRow2.appendChild(fromColumn);
            infoRow2.appendChild(toColumn);
        
            var messageButton = document.createElement('button');
            messageButton.className = 'btn btn-primary btn-sm ml-auto';
            messageButton.innerHTML = 'Message';
            
            // Add an event listener to the message button
            // Add an event listener to the message button
            messageButton.addEventListener('click', function() {
                var emailSubject = "I Can offer you a ride";
                var emailBody = "Your email body";
                window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + msgRequests.email + "&su=" + emailSubject + "&body=" + emailBody, '_blank');
            });
                
    
            cardBody.appendChild(username);
            cardBody.appendChild(infoRow1);
            cardBody.appendChild(infoRow2);
            cardBody.appendChild(messageButton);
        
            card.appendChild(cardBody);
        
            allCardsContainer.appendChild(card);
        });

    }
    
    

}
