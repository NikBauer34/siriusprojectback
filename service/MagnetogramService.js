import ApiError from '../exceptions/api-error.js';
import MagnetogramModel from '../models/MagnetogramModel.js'
import PipeService from './PipeService.js';
class MagnetogramService {
  async getPipeMagnetograms(pipe_id) {
    const pipe = await PipeService.getPipe(pipe_id);
    if (!pipe.magnetograms) {
      throw ApiError.BadRequest('У трубы нет магнитограмм')
    }
    let magnetogramArray;
    for (let magnetogram of pipe.magnetograms) {
      let magnetogramItem = await MagnetogramModel.findById(magnetogram, '-info')
      magnetogramArray.push(magnetogramItem)
    }
    return magnetogramArray
  }
  async getMagnetogramMarkupData(magnetogram_id, page, bundle) {
    let magnetogramItem = await MagnetogramModel.findById(magnetogram_id, 'info')
    if (!magnetogramItem) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogramItem.info[0].markup.splice((page - 1) * bundle, (page - 1) * bundle + bundle)
  }
  async getMagnitogramVersionsData(magnetogram_id) {
    let magnetogramItem = await MagnetogramModel.findById(magnetogram_id, 'info')
    if (!magnetogramItem) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
  }
  async getMagnetogram(id) {
    const magnetogram = await MagnetogramModel.findById(id)
    if (!magnetogram) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogram
  }
  async getAllMagnetograms() {
    const pipes = await MagnetogramModel.find({});
    if (!pipes) {
      throw ApiError.BadRequest('Магнитограмм нет')
    }
    return pipes
  }
  async createMagnetogram(author, pipe_id, version, title) {
    const array = [0, 1, 0]
    let defects_count = 0
    array.forEach(el => el == 0 ? defects_count++ : false)
    const magnetogram = await MagnetogramModel.create({title, info: [{version, array, defects_count, date: new Date()}], author, pipe: pipe_id})
    const new_pipe = await PipeService.newMagnetogram(pipe_id, magnetogram._id)
    return magnetogram
  }
  async deleteMagnetogram(id) {
    const magnetogram = await MagnetogramModel.findByIdAndDelete(id)
    if (!magnetogram) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogram
  }
}
export default new MagnetogramService()