import React, {useState} from "react";
import {Link} from 'react-router-dom';
// import {useNavigate} from "react-router-dom";

export default function LoginPage(props) {
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    // const navigate = useNavigate();

    // let submit = () => {
    // console.log(name, gender);
    // navigate({
    //     pathname: 'chatroom',
    //     search: name
    // });
    // navigate('chatroom', {
    //     state: name
    // });
    // };

    return (
        <div className="login">
            <div className="innerLogin">
                <h2>login page</h2>
                <input
                    type="text"
                    placeholder="name:"
                    onChange={(e) => setName(e.target.value)}
                />
                <select name="gender" id="" onChange={(e) => setGender(e.target.value)}>
                    <option value="-1">choose one</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                {/*<button onClick={submit}>login</button>*/}
                <Link to="chatroom" state={{name, gender}}>go to chat room</Link>
            </div>
        </div>
    );
}
