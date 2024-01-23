import UserService from "../service/UserService.js";

class UserController {
  async registration(req, res, next) {
    try {
      const { name, surname, nikname, password, role } = req.body;

      const userData = await UserService.registration(name, surname, nikname, password, role);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }
  async login(req, res, next) {
    try {
      const { nikname, password } = req.body;
      const userData = await UserService.login(nikname, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  // async RoleCheck(req, res, next) {
  //   res.json({ mess: 'Если ты это видишь, то у тебя "вторая ступень"' })
  // }
  async AuthCheck(req, res, next) {
    res.json({ mess: 'Если ты это видишь, то ты авторизован' })
  }
}
export default new UserController();