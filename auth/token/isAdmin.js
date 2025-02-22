const Role = require('../models/Role.model');
exports.isAdmin = async (req, res, next) => {
    try {
      const id = req.user.role;
      const role = await Role.findById(id);
      if (!role) {
        return res.status(403).json({ message: "Role not found" });
      }
      if (role.name !== "Admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  