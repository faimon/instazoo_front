import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';

const POST_API = 'http://localhost:8080/api/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(POST_API, post);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(POST_API);
  }

  getPostForUser(): Observable<any> {
    return this.http.get(POST_API + 'user');
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(POST_API + postId);
  }

  likePost(postId: number, username: string): Observable<any> {
    return this.http.post(POST_API + postId + '/' + username + 'like', null);
  }
}
