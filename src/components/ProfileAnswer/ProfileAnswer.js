import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetch, useFetchToken } from "../../utils/useFetch";
import { InfinitySpin } from "react-loader-spinner";
import QuesAns from './QuesAns';

const data = [
    {
        "id": 1,
        "question": "How to get used to the new normal?",
        "answerText": "Django officially supports the following databases:\n\n* PostgreSQL\n* MariaDB\n* MySQL\n* Oracle\n* SQLite\n\nThere are also a number of database backends provided by third parties. Django attempts to support as many features as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely",
        "author": {
            "id": 1,
            "username": "user1",
            "profilePic": "https://www.w3schools.com/howto/img_avatar.png"
        },
        "upvotes": 0,
        "downvotes": 0,
        "createdAt": "2021-06-10T12:00:00.000Z",
        "updatedAt": "2021-06-10T12:00:00.000Z"
    },  {
        "id": 2,
        "question": "How to get used to the new normal?",
        "answerText": "Django officially supports the following databases:\n\n* PostgreSQL\n* MariaDB\n* MySQL\n* Oracle\n* SQLite\n\nThere are also a number of database backends provided by third parties. Django attempts to support as many features as possible on all database backends. However, not all database backends are alike, and we’ve had to make design decisions on which features to support and which assumptions we can make safely",
        "author": {
            "id": 1,
            "username": "user1",
            "profilePic": "https://www.w3schools.com/howto/img_avatar.png"
        },
        "upvotes": 0,
        "downvotes": 0,
        "createdAt": "2021-06-10T12:00:00.000Z",
        "updatedAt": "2021-06-10T12:00:00.000Z"
    }
]

const ProfileAnswer = () => {
  const {username} = useParams();
  console.log(username)
  const { data, pending, error } = useFetch("http://localhost:8000/profile/" + username + "/answers");
  console.log(data)


  return (
      <div>
        {pending && <InfinitySpin type="ThreeDots" color="#00BFFF" height={80} width={80} />}
        {error && <div>{error}</div>}
        {!pending && data && data.data.map((answerItem) => (
          <QuesAns answerItem={answerItem} key={answerItem._id}/>
        ))}
      </div>
  )
}

export default ProfileAnswer;