const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    height: 120,
    paddingHorizontal: 30,
    flexDirection: 'column',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    justifyContent: 'space-around'
  },
  heading1: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 20
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 0,
    paddingTop: 14,
    paddingBottom: 16,
  },
  programsContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  divider: {
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB'
  },
  bestFit: {
    backgroundColor: '#920707'
  }
})

module.exports = styles
module.exports.constants = constants;