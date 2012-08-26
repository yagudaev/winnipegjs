
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Winnipeg.js' });
};

exports.events = function(req, res){
  res.render('events', { title: 'Events' });
};

exports.resources = function(req, res){
  res.render('resources', { title: 'Resources' });
};

exports.members = function(req, res){
  res.render('members', { title: 'Members' });
};