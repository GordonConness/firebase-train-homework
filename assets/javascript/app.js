
var config = {
  apiKey: "AIzaSyDL5c6zqHqgZSpFZ4T66iC3b-wwwih0XzE",
  authDomain: "train-scheduler-c4b6d.firebaseapp.com",
  databaseURL: "https://train-scheduler-c4b6d.firebaseio.com",
  projectId: "train-scheduler-c4b6d",
  storageBucket: "train-scheduler-c4b6d.appspot.com",
  messagingSenderId: "754799939166"
};

firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

$("#addTrains").on("click", function(event){
	event.preventDefault(); 
	trainName = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTime = $("#firstTrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firsTrain-input").val("");
	$("#frequency-input").val("");

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency
	});

});
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      trainName = childSnapshot.val().trainname;
      destination = childSnapshot.val().destination
      firstTime = childSnapshot.val().firsttime;
      frequency = childSnapshot.val().frequency;

      var firsttimeMoment = moment(firsttime, "mm");
      var currentTime = moment()
      var minuteArrival = currentTime.diff(firsttimeMoment, 'minutes');
      var minuteLast = minuteArrival % frequency;
      var awayTrain = frequency - minuteLast;
      var nextArrival = currentTime.add(awayTrain, 'minutes');
      var arrivalTime = nextArrival.format("mm");

	$("#AddTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + awayTrain + "</td>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });