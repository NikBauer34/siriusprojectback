import ApiError from "../exceptions/api-error.js";
import TokenService from "../service/TokenService.js";
export default function (roles) {
  return function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      //console.log(accessToken)
      const userData = TokenService.validateAccessToken(accessToken);
      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }
      //console.log(userData.role)
      let hasRole = false
      roles.forEach(role => {
        if (userData.role == role) {
          hasRole = true
        }
      })
      if (!hasRole) {
        throw ApiError.BadRequest('У вас недостаточно прав');
      }
      next();
    } catch (e) {
      throw ApiError.BadRequest('У вас недостаточно прав');
    }
  }
}