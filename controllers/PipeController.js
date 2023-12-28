import PipeService from "../service/PipeService.js";
import TokenService from "../service/TokenService.js";
class PipeController {
  async createPipe(req, res, next) {
    try {
      const {location} = req.body
      console.log(location)
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      const pipe = await PipeService.createPipe(location, userData.user_id)
      return res.json(pipe)
    } catch (e) {
      next(e)
    }
  }
  async getPipe(req, res, next) {
    try {
      const id = req.params.id
      const pipe = await PipeService.getPipe(id)
      return res.json(pipe)
    } catch (e) {
      next(e)
    }
  }
  async getPipeByUserId(req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      const pipe = await PipeService.getPipeByUserId(userData.user_id)
      return res.json(pipe)
    } catch (e) {
      next(e)
    }
  }
  async newMember(req, res, next) {
    try {
      const id = req.params.id
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      const pipe = await PipeService.newMember(id, userData.user_id)
      return res.json(pipe)
    } catch (e) {
      next(e)
    }
  }
  async deletePipe(req, res, next) {
    try {
      const id = req.params.id
      console.log(id)
      const pipe = await PipeService.deletePipe(id)
      return res.json(pipe)
    } catch (e) {
      next(e)
    }
  }
  async getAllPipes(req, res, next) {
    try {
    const pipes = await PipeService.getAllPipes()
    return res.json(pipes)
    } catch (e) {
      next(e)
    }
  }

}
export default new PipeController()