import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/api-error.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import TokenService from "./TokenService.js";

class UserService {
  async registration(name, surname, nikname, password, role) {
    const candidate = await UserModel.findOne({ nikname });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с ником ${nikname} существует`)
    }
    console.log(candidate)
    const hashPassword = bcrypt.hashSync(password, 20);
    console.log(hashPassword)
    const user = await UserModel.create({ name, surname, nikname, password: hashPassword, role, requests: [] })
    console.log(user)
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.user_id, tokens.refreshToken);

    return { ...tokens, user: userDto }
  }
  async login(nikname, password) {
    const user = await UserModel.findOne({ nikname });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким никнеймом не найден')
    }
    const isPassEqual = await bcrypt.compare(password, user.password)
    if (!isPassEqual) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.user_id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }
  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const takenFromDb = await TokenService.findToken(refreshToken)
    console.log(takenFromDb)
    if (!userData || !takenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.user_id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(userDto.user_id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }
  async getUserIdByNikname(nikname) {
    const user = await UserModel.findOne({ nikname })
    return user._id
  }
}
export default new UserService()