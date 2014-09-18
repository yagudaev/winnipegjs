// file wide constants
var EVENT_PAGE_NAME = 'event-page';
var EVENT_PRE_TITLE = "Event ";

var moment = require('moment'),
  ejs = require('ejs'),
  eventLoader = require('./../lib/eventLoader');

ejs.filters.formatDate = function(date) {
	if ('TBD' === date) {
		return date;
	} else {
		return moment(date).format('h:mma ddd, MMMM Do, YYYY');
	}
};

/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', { title: 'Winnipeg.js', page: 'index', toDesktop: toDesktop(req), upcomingEvent: eventLoader.getUpcomingEvent() });
};

exports.events = function(req, res) {
	res.render('events/index', { title: 'Events', page: 'events', toDesktop: toDesktop(req), events: eventLoader.getData() });
};

exports.resources = function(req, res) {
  res.render('resources', { title: 'Resources', page: 'resources', toDesktop: toDesktop(req) });
};

exports.members = function(req, res) {
  res.render('members', { title: 'Members', page: 'members', toDesktop: toDesktop(req)});
};

exports.forum = function(req, res) {
	res.render('forum', { title: 'Forum', page: 'forum', toDesktop: toDesktop(req)});
};

exports.eventPage = function(req, res) {
	var eventData = eventLoader.getData();

	if (req.params.date in eventData) {
		var eventSlug = req.params.date,
			event = eventData[eventSlug];

		event.monthYear = moment(event.date).format( 'MMMM YYYY' );


		res.render('events/event', { title: event.title + ' | ' + event.monthYear, page: EVENT_PAGE_NAME, toDesktop: toDesktop(req), event: event });
	} else {
		res.status(404).render('404', { title: 'Page not Found 404', page: '404', toDesktop: toDesktop(req)});
	}
};

// Sets a cookie in the users browser specifying they or don't want the desktop interface (for mobile only).
// Not going to call any of the functions above as that would rely on none of them changing names later.
exports.setDesktop = function(req, res) {
  var page = req.query.page;

  if (!page) {
    page = 'index';
  }

  // event pages are in a subdirectory so the path must be modified. Since the user is already on the page
  // the file system does not need to check for the pages existence.
  if (page === EVENT_PAGE_NAME) {
    page = 'events/' + req.query.title.replace(EVENT_PRE_TITLE, '');
  }

  // set toDesktop cookie so subsequent pages know whether to render a desktop version for mobile or not
  res.cookie('desktop_interface', req.query.to + '', { maxAge: 86400000 });// day in milleseconds
  res.render(page, { title: req.query.title, page: page, toDesktop: req.query.to == 'true'});
};

// Checks if a desktop interface is requested (via a cookie)
function toDesktop(req){
  return req.cookies.desktop_interface == 'true';
}
