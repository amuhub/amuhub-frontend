import './Post.css'
import img from './img.png'

const Post = () => {
  return (
    <div class="post_container">
        <div class="post_header">
            <div class="user_info">
                <img class="user_img"/>
                <span class="username">_falana_</span>
            </div>
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="post_content">
            <div class="post"><img src={img} alt=""/></div>
            <div class="post_stats">
                <div class="post_stats_likes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                    <span>951 likes</span>
                </div>
                <div class="post_stats_comments">
                    <i class="far fa-comment-alt"></i>
                    <a href="">Comments</a>
                </div>
            </div>
        </div>
        <div class="post_comment">
            <input type="text" placeholder="Add a comment..."/>
            <a href="" class="post_btn">Post</a>
        </div>
    </div>
  )
}

export default Post