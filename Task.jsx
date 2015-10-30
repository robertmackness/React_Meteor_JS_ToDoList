//Task component - represents a single todo task item
Task = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    // i.e. it requires a task object passed to it on creation
    // see App.renderTasks()
    task: React.PropTypes.object.isRequired
  },

  toggleChecked() {
    // Sets checked property to opposite of it's current value
    Tasks.update(this.props.task._id, {
      $set: {checked: ! this.props.task.checked}
    });
  },

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  },

  render() {
    
    // Setup a constant for the taskClassName that won't change once
    // the JSX is compiled for viewing, this gives a performance boost
    // over using a var in the same instance..?
    const taskClassName = this.props.task.checked ? "checked" : "";

    return (
      <li className={taskClassName}>
        
        <input
          type="checkbox" 
          readOnly={true} 
          checked={this.props.task.checked} 
          onClick={this.toggleChecked} />

        <span className="text">
          <strong>{this.props.task.username}</strong> : {this.props.task.text}

        </span>
        
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

      </li>
    );
  }
});