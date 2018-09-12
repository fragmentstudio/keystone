var async = require('async');

module.exports = function (req, res) {
	var keystone = req.keystone;
	var counts = {};
	async.each(keystone.lists, function (list, next) {
		var filter;
		if (req.user.isSuperAdmin || list.options.noCheckOwner) {
			filter = {};
		} else if (list.key == keystone.get('user model')) {
			filter = { _id: req.user._id };
		} else {
			filter = { owner: req.user._id };
		}
		list.model.count(filter, function (err, count) {
			counts[list.key] = count;
			next(err);
		});
	}, function (err) {
		if (err) return res.apiError('database error', err);
		return res.json({
			counts: counts,
		});
	});
};
