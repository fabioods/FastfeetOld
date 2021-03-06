import * as Yup from 'yup';
import User from '../models/user';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { email, id, name } = await User.create(req.body);

    return res.status(200).json({ id, email, name });
  }

  //OneOf => igual a
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, currentField) =>
          oldPassword ? currentField.required() : currentField
        ),
      confirmPassword: Yup.string().when('password', (password, currentField) =>
        password
          ? currentField.required().oneOf([Yup.ref('password')])
          : currentField
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

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
