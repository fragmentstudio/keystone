module.exports.checkEditPermission = function (req, res, next) {
  var userOptions = req.list.getOptions(req.user);
  if (userOptions.noedit) {
    return res.apiError(403, 'Editing in the list is not allowed');
  }
  next();
};

module.exports.checkDeletePermission = function (req, res, next) {
  var userOptions = req.list.getOptions(req.user);
  if (userOptions.nodelete) {
    return res.apiError(403, 'Deleting in the list is not allowed');
  }
  next();
};

module.exports.checkCreatePermission = function (req, res, next) {
  var userOptions = req.list.getOptions(req.user);
  if (userOptions.nocreate) {
    return res.apiError(403, 'Creating in the list is not allowed');
  }
  next();
};