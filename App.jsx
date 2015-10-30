// App component - represents the whole app
App = React.createClass({
  
  // Mixins
  mixins: [ReactMeteorData],

  // Set up the components initial React state using special
  // function getInitialState()
  getInitialState() {
    return {
      hideCompleted: false
    };
  },

  // Called by App.renderTasks(), returns tasks from 
  // MongoDB Tasks collection and puts them in this.data.tasks
  // sorted by most recent createdAt time
  getMeteorData() {
    
    // Amend query arg passed to Tasks.find() if 
    // this.state.hideCompleted = true
    let query = {};
    if (this.state.hideCompleted) {
      query = {checked: {$ne: true}};
    }
    // return both tasks and an incomplete count in a hash
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    }
  },
 
  // Called by App.render(), returns Task objects (see Task.jsx)
  // in this case, <li> elements with task info populated
  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },
 
  handleSubmit() {
    event.preventDefault();

    // Find the text field via the React ref value in the element
    // trim leading and trailing whitespace
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    // Insert directly into MongoDB Tasks collection. Functionality
    // Provided by ReactMeteorData mixin above
    Tasks.insert({
      text: text, 
      createdAt: new Date(),            // current dtg
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username  // username of logged in user
    });

    //Clear form once complete
    React.findDOMNode(this.refs.textInput).value = "";

  },

  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  },

 // Called by React.render() in the client once the app is ready 
 // see simple-todos-react.jsx
  render() {
    return (
      <div className="container">
        
        <header>
          {/* this.data.incompleteCount set during App.getMeteorData() */}
          <h1>Todo List ({this.data.incompleteCount})</h1>

          {/* Using React's component states, judge whether to hide
              completed tasks.
              App.state.hideCompleted initiliazed in getInitialState() */}
          <label className="hide-completed">
            <input 
                type="checkbox" 
                readOnly={true} 
                checked={this.state.hideCompleted} 
                onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          {/* Form for adding tasks. Uses React ref for it's input ID so
              onSubmit() and other methods can find it.
              Used by App.onSubmit(). 
              Only shown if there is a currentUser */}
          { this.data.currentUser ? 
            <form className="new-task" onSubmit={this.handleSubmit}>
              <input
                type="text" 
                ref="textInput" 
                placeholder="Type to add new tasks" />
            </form> : '' 
          } 

        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});