import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const COMMENT_API = 'http://localhost:8080/api/comments/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addCommentForPost(postId: number, message: string): Observable<any> {
    return this.http.post(COMMENT_API + postId, message);
  }

  getCommentsForPost(postId: number): Observable<any> {
    return this.http.get(COMMENT_API + postId);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(COMMENT_API + commentId);
  }
}
