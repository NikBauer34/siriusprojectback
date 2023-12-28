import ApiError from '../exceptions/api-error.js';
import PipeModel from '../models/PipeModel.js'
import UserModel from '../models/UserModel.js';
class PipeService {
  async getPipe(id) {
    const pipe = await PipeModel.findById(id);
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    return pipe
  }
  async getPipeByUserId(user_id) {
    const user = await UserModel.findById(user_id)
    if (!user) {
      throw ApiError.BadRequest('Не найден пользователь')
    }
    return user.pipe
  }
  async getAllPipes(){
    const pipes = await PipeModel.find({})
    if (!pipes) {
      throw ApiError.BadRequest('Не найдены трубы')
    }
    return pipes
  }
  async createPipe(location, user_id) {
    const pipe = await PipeModel.create({location})
    const user = await UserModel.findById(user_id)
    console.log(pipe)
    // if (user.pipe[0] == pipe._id) {
    //   throw ApiError.BadRequest('У пользователя уже есть труба')
    // }
    user.pipe = pipe._id
    pipe.users.push(user._id)
    await UserModel.findByIdAndUpdate(user._id, user)
    await PipeModel.findByIdAndUpdate(pipe._id, pipe)
    console.log(user)
    return pipe
  }
  async newMember(pipe_id, user_id) {
    const pipe = await PipeModel.findById(pipe_id)
    pipe.users.push(user_id)
    const new_pipe = await PipeModel.findByIdAndUpdate(pipe_id, pipe)
    return new_pipe
  }
  async deletePipe(pipe_id) {
    const pipe = await PipeModel.findByIdAndDelete(pipe_id)
    if (!pipe) {
      throw ApiError.BadRequest('Не найдена труба')
    }
    return pipe
  }
  async newMagnetogram(pipe_id, magnetogram_id) {
    const pipe = await PipeModel.findById(pipe_id)
    pipe.magnetograms.push(magnetogram_id)
    const new_pipe = await PipeModel.findByIdAndUpdate(pipe_id, pipe)
    return new_pipe
  }
}
export default new PipeService()