var assign = require('object-assign');

module.exports = function ownershipListFilter (req, res, next) {
  if (req.user.isSuperAdmin || req.list.options.noCheckOwner) {
    next();
    return;
  }
	var keystone = req.keystone;
	req.ownershipFilter = (req.list.key == keystone.get('user model')) ?
		{ _id: req.user._id } :
		{ owner: req.user._id };
  next();
};
