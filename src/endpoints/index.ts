//Auth
export const signup_endpoint: string = "/auth/signup";
export const login_endpoint: string = "/auth/login";

//Comment
export const commentMe_endpoint: string = "/comment/me";
export const postComment_param_endpoint = (commentId: string) =>
  `/comment/${commentId}`;
export const getCommentById_param_endpoint = (commentId: string) =>
  `/comment/${commentId}`;
export const deleteCommentById_param_endpoint = (commentId: string) =>
  `/comment/${commentId}`;
export const getCommentsFromUser_param_endpoint = (userId: string) =>
  `/comment/by_user/${userId}`;
export const getCommentsByPostId_param_endpoint = (commentId: string) =>
  `/comment/by_post/${commentId}`;

//Post
export const getPosts_endpoint: string = "/post";
export const getFollowPosts_endpoint: string = "/post/follow";
export const postPost_endpoint: string = "/post";
export const getPostById_param_endpoint = (postId: string) => `/post/${postId}`;
export const deletePostById_param_endpoint = (postId: string) =>
  `/post/${postId}`;
export const getPostsFromUser_param_endpoint = (userId: string) =>
  `/post/by_user/${userId}`;

//Follow
export const followUser_param_endpoint = (userId: string) =>
  `/follower/follow/${userId}`;
export const unfollowUser_param_endpoint = (userId: string) =>
  `/follower/unfollow/${userId}`;

//Reaction
export const createReaction_param_endpoint = (postId: string) =>
  `/reaction/${postId}`;
export const deleteReaction_param_endpoint = (reactionId: string) =>
  `/reaction/${reactionId}`;

//User
export const userMe_endpoint: string = "/user/me";
export const delete_endpoint: string = "/user/";
export const recommendedUsers_endpoint: string = "/user/";
export const getUser_param_endpoint = (id: string) => `/user/${id}`;
export const searchedUsers_param_endpoint = (username: string) =>
  `/user/by_username/${username}`;
