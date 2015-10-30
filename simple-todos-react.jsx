// #################
// Server side code
// #################

// MongoDB collection setup
Tasks = new Mongo.Collection("tasks");


// #################
// Client side code
// #################
if (Meteor.isClient) {

  // Initialize Accounts to only require a username, no email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function() { 
    // Use Meteor.startup() to render once page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}