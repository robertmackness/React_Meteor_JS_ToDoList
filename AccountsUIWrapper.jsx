AccountsUIWrapper = React.createClass({
  // User Meteor Blaze to render login buttons in a React
  // labelled element ref="container"
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
                  React.findDOMNode(this.refs.container));
  },

  // Blaze cleanup
  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  // Render a placeholder container that will eventually be filled in
  render() {
    return <span ref="container" />;
  }

});