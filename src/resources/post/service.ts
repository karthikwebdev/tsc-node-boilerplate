import PostModel from './model';
import { PostDocument, Post } from './interface';

class PostService {
  private post = PostModel;

  /**
   * Create a new post
   */
  public async create(title: string, body: string): Promise<PostDocument> {
    try {
      const post: PostDocument = await this.post.create<Post>({ title, body });
      return post;
    } catch (error) {
      throw new Error('Error adding post');
    }
  }
}

export default PostService;
