import { Schema, model } from "mongoose";

const PipeSchema = new Schema({
  title: String,
  location: [{type: Number}],
  magnetograms: [{type: Schema.Types.ObjectId, ref: 'Magnetogram'}],
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

export default model('Pipe', PipeSchema);