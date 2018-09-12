module.exports = function ownershipFilter (req, res, next) {
  if (req.user.isSuperAdmin || req.list.options.noCheckOwner) {
    next();
    return;
  }
  var keystone = req.keystone;
  var userId = req.user._id;
  if (req.list.key == keystone.get('user model')) {
    if (userId != req.params.id) {
      return res.apiError(403, 'Data access is not allowed');
    } else {
      next();
    }
  } else {
    var query = {
      _id: req.params.id,
      owner: userId,
    }
    req.list.model.count(query, function (err, count) {
      if (err || count == 0) {
        return res.apiError(404, 'Data not found');
      } else {
        next();
      }
    });
  }
};
