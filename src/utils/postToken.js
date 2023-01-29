import axios from "axios";

const postToken = async (url, body, token) => {
    // post data to url with headers
    const res = await axios.post(url, JSON.stringify(body), {
    headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        'content-type': 'application/json',
        'x-auth-token': token,
    }
    });
    return res;
};

export default postToken;