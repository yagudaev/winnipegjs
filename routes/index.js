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
			res.render(page, { title: 'Event ' + req.params.date, page: 'event-page', to_desktop: to_desktop(req)});	
		} else {
			res.render('404', { title: 'Page not Found 404', page: '404', to_desktop: to_desktop(req)});
		}
	})
	
}

function to_desktop(req){
  return req.query.to_desktop == '' ? '?to_desktop' : '';
}