import RequestService from "../service/RequestService.js";
import TokenService from "../service/TokenService.js";
class RequestController {
  async getRequest(req, res, next) {
    try {
      const id = req.params.id;
      const request = await RequestService.getRequest(id);
      return res.json(request)
    } catch (e) {
      next(e)
    }
  }
  async getRequests(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      const requests = await RequestService.getRequests(userData.user_id);
      return res.json(requests)
    } catch (e) {
      next(e)
    }
  }
  async createRequest(req, res, next) {
    try {
      const { to, title, text, magnetogram } = req.body;
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      const request = await RequestService.createRequest(to, userData.user_id, title, text, magnetogram);
      return res.json(request)
    } catch (e) {
      next(e)
    }
  }
}
export default new RequestController();