import { React,useState } from "react";
import './Post.css'
import postImg from './img.png';
import PostOverlay from '../../pages/Post_Overlay/PostOverlay';

const Post = (props) => {

    const {data} = props;
    const [togglePostOverlay, setTogglePostOverlay] = useState(false)

    const postOverlaytoggler=() => {
        togglePostOverlay===true?setTogglePostOverlay(false):setTogglePostOverlay(true);
    };

  return (
    <>
    <div class="post_container">
        <div class="post_header">
            <div class="user_info">
                <img src={postImg} class="user_img" alt=''/>
                <span class="username">{data.author}</span>
            </div>
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="post_content">
            <div class="post"><img src={postImg} alt=""/></div>
            <div class="post_stats">
                <div class="post_stats_likes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                    <span>{data.likes}</span>
                </div>
                <div class="post_stats_comments">
                    <i class="far fa-comment-alt"></i>
                    <a  onClick={postOverlaytoggler}>Comments</a>
                </div>
            </div>
        </div>
        <div class="post_comment">
            <input type="text" placeholder="Add a comment..."/>
            <a  class="post_btn">Post</a>
        </div>
    </div>

    {togglePostOverlay && <PostOverlay postOverlaytoggler={postOverlaytoggler}/>}
</>
  )
}

export default Post