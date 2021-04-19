import {Component, OnInit} from '@angular/core';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {User} from '../../models/User';
import {Post} from '../../models/Post';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostLoaded = false;
  isUserLoaded = false;
  posts: Post[];
  user: User;

  constructor(private postService: PostService,
              private userService: UserService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageService: ImageUploadService) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getCommentsForPosts(this.posts);
        this.getImagesForPosts(this.posts);
        this.isPostLoaded = true;
      }, (error => {
        console.log('error: ' + error);
      }));
    this.userService.getCurrentUser()
      .subscribe(data => {
        console.log('user loaded: ' + data);
        this.user = data;
        this.isUserLoaded = true;
      }, (error => {
        console.log('error: ' + error);
      }));
  }

  getImagesForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.imageService.getImageForPost(post.id)
        .subscribe(data => {
          post.image = data.imageBytes;
        });
    });
  }

  getCommentsForPosts(posts: Post[]): void {
    posts.forEach(post => {
      this.commentService.getCommentsForPost(post.id)
        .subscribe(data => {
          post.comments = data;
        });
    });
  }

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    if (!post.userLiked?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.userLiked?.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          let index = post.userLiked?.indexOf(this.user.username, 0);
          if (index === null || index === undefined) {
            index = -1;
          }
          if (index > -1) {
            post.userLiked?.splice(index, 1);
          }
        });
    }
  }

  postComment(message: string, postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    this.commentService.addCommentForPost(postId, message)
      .subscribe(comm => {
        console.log('commentDTO get: ' + comm);
        post.comments?.push(comm);
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg:base64,' + img;
  }
}
