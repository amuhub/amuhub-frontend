import './Question.css'

const Question = () => {
  return (
    <div className="question_container">
        <div className="question_header">
            <div className="user_img"></div>
            <div className="question_info">
                <div>
                    <p>Asked : <span className="timestamp">March 28, 2018</span></p>
                    <p>Tags : <span className="tags">Movies, Series</span></p>
                </div>
                <p className="question">How to get placed in google without learning DSA?</p>
            </div>
        </div>
        <div className="question_stats">
            <div className="stats_list_a">
                <a href="" className="answers_count"><i className="fas fa-comment-alt"></i>14 answers</a>
                <a href="" className="views_count"><i className="fas fa-eye"></i> 412 views</a>
            </div>
            <div className="stats_list_b">
                {/* <!-- <input type="radio" name="upvote_downvote" id="upvote">
                <label for="upvote">Upvote</label>

                <input type="radio" name="upvote_downvote" id="downvote">
                <label for="downvote">Downvote</label> --> */}

                <a href="">Upvote</a>
                <a href="">Downvote </a>
            </div>
        </div>
     </div>
  )
}

export default Question