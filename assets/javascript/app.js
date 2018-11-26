$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyDbOz9RcV4I2yHt7v9EeJl2Pn4MM2e1acg",
    authDomain: "train-activity-aa34b.firebaseapp.com",
    databaseURL: "https://train-activity-aa34b.firebaseio.com",
    projectId: "train-activity-aa34b",
    storageBucket: "train-activity-aa34b.appspot.com",
    messagingSenderId: "1080987429617"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var rowNum = 0;

  // when user clicks submit button
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destinationInput = $("#destination-input")
      .val()
      .trim();
    var firstTrainInput = moment(
      $("#train-time-input")
        .val()
        .trim(),
      "HH:mm"
    ).format("X");
    var frequencyInput = $("#frequency-input")
      .val()
      .trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destinationInput,
      firstTrain: firstTrainInput,
      frequency: frequencyInput
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
  });

  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    // Train Info

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);

    // Prettify the first train
    var firstTrainPretty = moment.unix(firstTrain).format("hh:mm a");

    var minutesAway = moment(firstTrain, "X").diff(moment(), "minutes");
    //var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(minutesAway);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(firstTrainPretty),
      $("<td>").text(minutesAway)
    );
    newRow.attr("id", rowNum);

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
});
