
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Winnipeg.js', page: 'index' });
};

exports.events = function(req, res){
  res.render('events', { title: 'Events', page: 'events'});
};

exports.resources = function(req, res){
  res.render('resources', { title: 'Resources', page: 'resources' });
};

exports.members = function(req, res){
  res.render('members', { title: 'Members', page: 'members'});
};