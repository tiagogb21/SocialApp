import { model as mongooseCreateModel, Schema } from 'mongoose';

import { IPost } from '../../@types/interfaces/IPost';
import MongoModel from './Generic.model';

const postMongoSchema = new Schema<IPost>({
  postedBy: String,
  title: String,
  photo: String,
  description: String,
  comments: [],
  likes: {},
  createdAt: Date,
  updatedAt: Date,
});

class PostsModel extends MongoModel<IPost> {
  constructor(model = mongooseCreateModel('posts', postMongoSchema)) {
    super(model);
  }
}

export default PostsModel;
