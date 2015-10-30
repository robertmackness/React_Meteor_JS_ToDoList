// #################
// Server side code
// #################

// MongoDB collection setup
Tasks = new Mongo.Collection("tasks");


// #################
// Client side code
// #################
if (Meteor.isClient) {

  Meteor.startup(function() { 
    // Use Meteor.startup() to render once page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}