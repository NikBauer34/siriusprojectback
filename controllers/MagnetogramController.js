import AxiosService from "../service/AxiosService.js";
import MagnetogramService from "../service/MagnetogramService.js";
import TokenService from "../service/TokenService.js";
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
  async getPipeMagnitograms(req, res, next) {
    try {
      const id = req.params.id
      const magnetograms = await MagnetogramService.getPipeMagnetograms(id)
      return res.json(magnetograms)
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
      const { pipe_id, version, title } = req.body
      const { file } = req.files
      const authorizationHeader = req.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const userData = TokenService.validateAccessToken(accessToken);
      // const markup = await AxiosService.getMarkup(file, file.name)
      const magnetogram = await MagnetogramService.createMagnetogram(userData.user_id, pipe_id, version, title)
      return res.json(magnetogram)
    } catch (e) {
      next(e)
    }
  }
  async getMagnetogramMarkupData(req, res, next) {
    try {
      const { id, i } = req.query
      console.log(id, i)
      const markup = await MagnetogramService.getMagnetogramMarkupData(id, i)
      return res.json(markup)
    } catch (e) {
      next(e)
    }
  }
  async getMagnetogramVersionsData(req, res, next) {
    try {
      const id = req.params.id
      const magnetograms = await MagnetogramService.getMagnetogramVersionsData(id)
      return res.json(magnetograms)
    } catch (e) {
      next(e)
    }
  }
  async getMagnetogramVersionsComparison(req, res, next) {
    try {
      const {id, first_version, second_version} = req.query
      const magnetograms = await MagnetogramService.getMagnetogramVersionsComparison(id, first_version, second_version)
      return res.json(magnetograms)
    } catch(e) {
      next(e)
    }
  }
  async getPipeMagnetogramsByTitle(req, res, next) {
    try {
      const { pipe_id, title } = req.query
      console.log(id, i)
      const markup = await MagnetogramService.getPipeMagnetogramsByTitle(pipe_id, title)
      return res.json(markup)
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
export default new MagnetogramController();