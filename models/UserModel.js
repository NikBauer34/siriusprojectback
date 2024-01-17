import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {type: String},
  surname: {type: String},
  nikname: {type: String},
  password: {type: String},
  role: {type: String},
  requests: [{type: Schema.Types.ObjectId, ref: 'Request', unique: false, required: false}],
  pipes: [{type: Schema.Types.ObjectId, ref: 'Pipe', unique: false, required: false}]
})

export default model('User', UserSchema);