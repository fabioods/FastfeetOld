import User from '../models/user';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { email, id, name } = await User.create(req.body);

    return res.status(200).json({ id, email, name });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail is already being used' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const userUpdated = await user.update(req.body);
    const { id, name } = userUpdated;

    return res.json({ id, name, email: userUpdated.email });
  }
}

export default new UserController();
