import ApiError from '../exceptions/api-error.js';
import MagnetogramModel from '../models/MagnetogramModel.js'
import PipeModel from '../models/PipeModel.js';
import PipeService from './PipeService.js';
class MagnetogramService {
  async getPipeMagnetograms(pipe_id) {
    const pipe = await PipeService.getPipe(pipe_id);
    if (!pipe) {
      throw ApiError.BadRequest('Труба не найдена')
    }
    console.log('pipe')
    console.log(pipe)
    let magnetogramArray = [];
    for (let magnetogram of pipe.magnetograms) {
      let magnetogramItem = await MagnetogramModel.findById(magnetogram, '-info')
      magnetogramArray.push(magnetogramItem)
    }
    console.log(magnetogramArray)
    return magnetogramArray
  }
  async getMagnetogramMarkupData(id, i) {
    let magnetogramItem = await MagnetogramModel.findById(id, 'info')
    if (!magnetogramItem) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogramItem.info[i]
  }
  async getMagnetogramVersionsData(magnetogram_id) {
    let magnetogramItem = await MagnetogramModel.findById(magnetogram_id, 'info')
    if (!magnetogramItem) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    return magnetogramItem
  }
  async getMagnetogramVersionsComparison(magnetogram_id, first_version, second_version) {
    let magnetogramItem = await MagnetogramModel.findById(magnetogram_id, 'info')
    if (!magnetogramItem) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    let magnetogramData = {
      "first_version": magnetogramItem.info[first_version],
      "second_version": magnetogramItem.info[second_version]
    }
    console.log(magnetogramData)
    return magnetogramData
  }
  async createMagnetogramVersion(magnetogram_id, version, markup) {
    let magnetogramItem = await MagnetogramModel.findById(magnetogram_id)
    if (!magnetogramItem) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    console.log(markup)
    let defects_count = 0
    markup.forEach(el => el == 1 ? defects_count++ : false)
    console.log(defects_count)
    magnetogramItem.info.push({
      version,
      markup,
      defects_count,
      date: new Date()
    })
    let new_magnetogram = await MagnetogramModel.findByIdAndUpdate(magnetogramItem._id, magnetogramItem)
    return new_magnetogram
  }
  async getPipeMagnetogramsByTitle(pipe_id, title) {
    const pipe = await PipeService.getPipe(pipe_id);
    if (!pipe) {
      throw ApiError.BadRequest('Труба не найдена')
    }
    console.log('pipe')
    console.log(pipe)
    let magnetogramArray = [];
    for (let magnetogram of pipe.magnetograms) {
      let magnetogramItem = await MagnetogramModel.findById(magnetogram, '-info')
      if (magnetogramItem.title.includes(title)) {
        magnetogramArray.push(magnetogramItem)
      }
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
    const pipes = await MagnetogramModel.find({ "title": { "$regex": "Первая" } });
    if (!pipes) {
      throw ApiError.BadRequest('Магнитограмм нет')
    }
    return pipes
  }
  async createMagnetogram(author, pipe_id, version, title, markup) {
    const true_markup = [0, 1, 0]
    let defects_count = 0
    true_markup.forEach(el => el == 1 ? defects_count++ : false)
    console.log(defects_count)
    const magnetogram = await MagnetogramModel.create({ title, info: [{ version, markup: true_markup, defects_count, date: new Date() }], author, pipe: pipe_id })
    const new_pipe = await PipeService.newMagnetogram(pipe_id, magnetogram._id)
    return magnetogram
  }
  async deleteMagnetogram(id) {
    const magnetogram = await MagnetogramModel.findByIdAndDelete(id)
    if (!magnetogram) {
      throw ApiError.BadRequest('Не найдена магнитограмма')
    }
    const pipe = await PipeModel.find({ magnetograms: { "$in": [magnetogram._id] } })
    const new_pipe = await PipeModel.findByIdAndUpdate(pipe._id, pipe)
    return magnetogram
  }
}
export default new MagnetogramService()