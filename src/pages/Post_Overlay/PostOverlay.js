import React from 'react'
import { Link } from 'react-router-dom';
import './postOverlay.css'
import postImage from './images/img.png' 


export default function PostOverlay({postOverlaytoggler}) {
  return (
    <div>

<div className="post_overlay">
        <button className="close-btn" onClick={postOverlaytoggler}><i className="fas fa-times"></i></button>
        <div className="post_pop_up">

            <div className="pop_up_img"><img src={postImage} alt=""/></div>

            <div className="pop_up_content">

                <div className="pop_up_header">
                    <div className="user_info">
                        <img src={postImage} className="user_img" alt='user'/>
                        <span className="username">_falana_</span>
                    </div>
                    <i className="fas fa-ellipsis-h"></i>
                </div>

                <div className="comment-section">
                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">dhimkana_xyz</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed at obcaecati fuga modi, corrupti non.</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">_falana_</span>Why height is not reducing according to width</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">_falana_</span>This is a crappy design</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">dhimakana._.yo</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">_falana_</span>Hello world</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">_falana_</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed at obcaecati fuga modi, corrupti non.</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>

                    <div className="comment">
                        <div className="commenter_img"></div>
                        <div className="comment_body">
                            <p><span className="commenter_username">_falana_</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed at obcaecati fuga modi, corrupti non.</p>
                            <Link to='#' className="reply">Reply</Link>
                        </div>
                    </div>
                </div>

                <div className = "pop_up_stats_outer">
                    <div className="pop_up_stats">
                        <div className="pop_up_stats_likes">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg>
                            <span>951 likes</span>
                        </div>
                        <div className="pop_up_stats_comments">
                            <i className="far fa-comment-alt"></i>
                            <Link to='#'>Comments</Link>
                        </div>
                    </div> 
                    <div className="pop_up_comment_type">
                        <input type="text" placeholder="Add a comment..."/>
                        <Link to='#' className="post_btn">Post</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}
