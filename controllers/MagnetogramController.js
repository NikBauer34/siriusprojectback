import MagnetogramService from "../service/MagnetogramService.js"

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
      const id = req.params.id
      const magnetograms = await MagnetogramService.getAllMagnetograms(id)
      return res.json(magnetograms)
    } catch (e) {
      next(e)
    }
  }
}