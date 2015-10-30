// App component - represents the whole app
App = React.createClass({
  
  // Mixins
  mixins: [ReactMeteorData],

  // Called by App.renderTasks(), returns tasks from 
  // MongoDB Tasks colleciton and puts them in this.data.tasks
  // sorted by most recent createdAt time
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
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
      createdAt: new Date() //current time
    });

    //Clear form once complete
    React.findDOMNode(this.refs.textInput).value = "";

  },

 // Called by React.render() in the client once the app is ready 
 // see simple-todos-react.jsx
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <form className="new-task" onSubmit={this.handleSubmit}>
            <input
              type="text" 
              ref="textInput" 
              placeholder="Type to add new tasks" />
          </form>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});