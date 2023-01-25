// SERVICE
import { IService } from '../@types/interfaces/IService';
// MODEL
import { IModel } from '../@types/interfaces/IModel';
// INTERFACE
import { IPost } from '../@types/interfaces/IPost';

export default class PostService implements IService<IPost> {
  private _post:IModel<IPost>;

  constructor(model:IModel<IPost>) {
    this._post = model;
  }

  async create(obj: IPost):Promise<IPost> {
    const { postedBy, title } = obj;

    const findPost = await this._post.readOne(postedBy);

    if(findPost) {
      if(findPost.title === title) throw new Error('Post with that title already exists');
    }

    const newpost = await this._post.create(obj);

    return newpost;
  }

  async read(): Promise<IPost[] | null> {
    const readpost = await this._post.read();
    return readpost;
  }

  async readOne(_id: string): Promise<IPost | null> {
    const readOnePost = await this._post.readOne(_id);

    if (!readOnePost) throw new Error('Post not found');

    return readOnePost;
  }

  async update(_id: string, obj: IPost): Promise<IPost | null> {
    const updatePost = await this._post.update(_id, obj);

    if (!updatePost) throw new Error('Post not found');

    return updatePost;
  }

  async delete(_id: string): Promise<IPost | null> {
    const deletePost = await this._post.delete(_id);

    if (!deletePost) throw new Error('Entity not found');

    return deletePost;
  }
}
