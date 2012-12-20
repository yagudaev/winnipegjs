// file wide constants
var EVENT_PAGE_NAME = 'event-page';
var EVENT_PRE_TITLE = "Event ";

var fs = require('fs'),
	path = require('path');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Winnipeg.js', page: 'index', to_desktop: to_desktop(req) });
};

exports.events = function(req, res){
  res.render('events', { title: 'Events', page: 'events', to_desktop: to_desktop(req) });
};

exports.resources = function(req, res){
  res.render('resources', { title: 'Resources', page: 'resources', to_desktop: to_desktop(req) });
};

exports.members = function(req, res){
  res.render('members', { title: 'Members', page: 'members', to_desktop: to_desktop(req)});
};

exports.eventPage = function(req, res) {
	// don't allow directory traversal
	var page = 'events/' + req.params.date.replace(/\.\.|\./, ' ');
	
	fs.exists(path.normalize(__dirname + '/../views/' + page + '.jade'), function(exists) {
		if (exists) {
			res.render(page, { title: EVENT_PRE_TITLE + req.params.date, page: EVENT_PAGE_NAME, to_desktop: to_desktop(req)});	
		} else {
			res.render('404', { title: 'Page not Found 404', page: '404', to_desktop: to_desktop(req)});
		}
	})
	
}

// Sets a cookie in the users browser specifying they or don't want the desktop interface (for mobile only).
// Not going to call any of the functions above as that would rely on none of them changing names later.
exports.set_desktop = function(req, res) {
  if (req.query.page !== {}){
	if (req.query.page === '') {
	  req.query.page = 'index';
	}
	var page = req.query.page;
	
	// event pages are in a subdirectory so the path must be modified. Since the user is already on the page
	// the file system does not need to check for the pages existence.
	if (page === EVENT_PAGE_NAME) {
	  page = 'events/' + req.query.title.replace(EVENT_PRE_TITLE, '');
	}
	
	// set to_desktop cookie so subsequent pages know whether to render a desktop version for mobile or not
	res.setHeader('Set-Cookie','test=value');
	res.cookie('desktop_interface', req.query.to + '', {maxAge: 86400000});// day in milleseconds
	
	res.render(page, { title: req.query.title, page: req.query.page, to_desktop: req.query.to == 'true' ? true : false});
  }
  else {
	res.render('404', { title: 'Page not Found 404', page: '404', to_desktop: req.query.to == 'true' ? true : false});
  }
}

// Checks if a desktop interface is requested (via a cookie)
function to_desktop(req){
  return req.cookies.desktop_interface == 'true' ? true : false;
}