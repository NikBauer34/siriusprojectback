import ApiError from '../exceptions/api-error.js';
import RequestModel from '../models/RequestModel.js';
import UserModel from '../models/UserModel.js';
class RequestService {
  async getRequest(request_id) {
    const request = await RequestModel.findById(request_id)
    if (!request) {
      throw ApiError.BadRequest('Не найден реквест')
    }
    return request
  }
  async getRequests(user_id) {
    const user = await UserModel.findById(user_id);

    if (user.requests.length == 0) {
      throw ApiError.BadRequest('Не найден пользователь')
    }
    return user.requests
  }
  async createRequest(to, author, title, text, magnetogram) {
    const user = await UserModel.findOne({ nikname: to })
    const recipient_id = user._id
    const recipient = await UserModel.findById(recipient_id);
    if (!recipient) {
      throw ApiError.BadRequest('Не найден пользователь')
    }
    const request = await RequestModel.create({ title, text, magnetogram, author })
    recipient.requests.push(request._id)
    const new_request = await RequestModel.findByIdAndUpdate(recipient_id, recipient)
    return new_request
  }
}
export default new RequestService();