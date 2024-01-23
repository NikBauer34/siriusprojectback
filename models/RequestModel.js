import { Schema, model } from "mongoose";

const RequestSchema = new Schema({
  title: { type: String },
  text: { type: String },
  magnetogram: { type: Schema.Types.ObjectId, ref: 'Magnetogram' },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default model('Request', RequestSchema);