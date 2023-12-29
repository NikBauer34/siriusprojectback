import MagnetogramService from "../service/MagnetogramService.js"
import TokenService from "../service/TokenService.js"
class MagnetogramController {
  async getMagnetogram(req, res, next) {
    try {
      const id = req.params.id
      const magnetogram = await MagnetogramService.getMagnetogram(id)
      return res.json(magnetogram)
    } catch (e) {
      next(e)
    }
  }
  async getAllMagnetograms(req, res, next) {
    try {
      const magnetograms = await MagnetogramService.getAllMagnetograms()
      return res.json(magnetograms)
    } catch (e) {
      next(e)
    }
  }
  async createMagnetogram(req, res, next) {
    try {
      const {date, pipe_id} = req.body
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      const magnetogram = await MagnetogramService.createMagnetogram(date, userData.user_id, pipe_id)
      return res.json(magnetogram)
    } catch (e) {
      next(e)
    }
  }
  async deleteMagnetogram(req, res, next) {
    try {
      const id = req.params.id
      const magnetogram = await MagnetogramService.deleteMagnetogram(id)
      return res.json(magnetogram)
    } catch (e) {
      next(e)
    }
  }
}
export default new MagnetogramController()