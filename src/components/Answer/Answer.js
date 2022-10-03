import './Answer.css'

const Answer = () => {
  return (
        <div className = "ques-container">
            <div className ="upvote-downvote-panel">
                <button className='up'>
                    <svg aria-hidden="true" class="svg-icon iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
                </button>
                <p className='vote-count'>125</p>
                <button className='down'>
                    <svg aria-hidden="true" class="svg-icon iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
                </button>
            </div>
            <div className="question-header">
                <p className="answer">
                    Django officially supports the following databases:

                        PostgreSQL
                        MariaDB
                        MySQL
                        Oracle
                        SQLite

                    There are also a number of database backends provided by third parties.

                    Django attempts to support as many features as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely.

                    This file describes some of the features that might be relevant to Django usage. It is not intended as a replacement for server-specific documentation or reference manuals.
                </p>
                
            </div>
        </div>
  )
}

export default Answer