module.exports = function (req, res) {
	var keystone = req.keystone;
	if (!keystone.security.csrf.validate(req)) {
		return res.apiError(403, 'invalid csrf');
	}
	// 作成時owner追加
	if (req.list.key == keystone.get('user model')) {
		if (!req.user.isSuperAdmin) {
			return res.apiError(403, 'operation not allowed');
		}
	} else {
		req.body.owner = req.user._id;
	}
	var item = new req.list.model();
	req.list.updateItem(item, req.body, {
		files: req.files,
		ignoreNoEdit: true,
		user: req.user,
	}, function (err) {
		if (err) {
			var status = err.error === 'validation errors' ? 400 : 500;
			var error = err.error === 'database error' ? err.detail : err;
			return res.apiError(status, error);
		}
		res.json(req.list.getData(item));
	});
};
