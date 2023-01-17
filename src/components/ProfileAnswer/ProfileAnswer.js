import React from 'react'


const ProfileAnswer = (data) => {
  return (
    <div className="ques-container-1">
      <div className="question_container">
        <p className="question">How to get used to the new normal?</p>
        <div className="question-header">

        {/* <div  dangerouslySetInnerHTML={{__html : data.answerText}}></div> */}
            <div>
                <p>Django officially supports the following databases:</p>
                <ul>
                    <li>PostgreSQL</li>
                    <li> MariaDB</li>
                    <li> MySQL</li> 
                    <li>Oracle</li>
                    <li> SQLite</li>
                </ul>
                There are also a number of database backends provided by third parties. Django attempts to support as many features  as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely
            </div>
            <div className="author-details">
                <div className="profile-div">
                    <div className="profile-img"></div>
                    <p className="username">
                    <span className="answered-by">Asked By</span> Hasan Faraz
                    </p>
                </div>
                <p className="answered-on">
                    Asked <span>2 hours ago</span>
                </p>
            </div>
      </div>
    </div>
    </div>
  )
}

export default ProfileAnswer