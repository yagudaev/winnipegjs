var extend = require('lodash').extend,
  fs = require('fs'),
  marked = require('meta-marked'),
  moment = require('moment'),
  path = require('path');

// data caching
var eventFiles,
    eventData = {};

function isEventFile(filename) {
  return '.md' === path.extname(filename);
}

function getFiles() {
  eventFiles = fs.readdirSync(__dirname + '/../views/events/').filter(isEventFile),
  eventFiles.sort(function(a, b) { return a < b });
}

function parseFiles() {
  var event = {};

  eventFiles.forEach(function(eventFilename) {
    event = getContentFor(eventFilename);
    extend(event, event.meta);
    event.isUpcoming = isAnUpcomingEvent(event);
    eventData[event.slug] = event;
  });
}

function isAnUpcomingEvent(event) {
  return !moment(event.date).isBefore(moment().format('YYYY-MM-DD'));
}

function getContentFor(eventFilename) {
  return marked(fs.readFileSync(__dirname + '/../views/events/' + eventFilename, "utf8"));
}

function load() {
  getFiles();
  parseFiles();

  return {
    getData: function() { return eventData; }
  };
}

module.exports = load();