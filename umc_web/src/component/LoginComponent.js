import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { loginUser} from "../reducer/userSlice.js";
import axios from "axios";


function LoginComponent() {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pw, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    
    const LoginFunc = (e) => {
        e.preventDefault();
        // Loading... 메세지 출력
        setMsg("Loading...");

        // API
        let body = {
            id,
            pw
        }
        axios.post("http://localhost:8000/user/login", body)
        .then(res => {
            console.log(res.data)
            // 서버 응답 처리
            setLoading(false); // 로딩 상태 비활성화
            setTimeout(() => setMsg(""), 1500);
        
            const code = res.data.result.code;
            if (code === 400) {
              alert("비어있는 내용입니다.");
            } else if (code === 401) {
              alert("존재하지 않는 id입니다.");
            } else if (code === 402) {
              alert("비밀번호가 일치하지 않습니다.");
            } else {
              dispatch(loginUser(res.data.result));
              localStorage.setItem('Token',res.data.result.AccessToken);
              localStorage.setItem('Id',res.data.result.userId);

            }
          })
         
        
        setLoading(true); 
    }
    

    return (
        <div>
            <h1>로그인</h1>
            <form 
                onSubmit={LoginFunc}
                className="login-wrap"
            >
                <input
                        type="text" 
                        placeholder='아이디' 
                        className='id'
                        onChange={e => setId(e.target.value)}
                    />
                    <br />
                    <input 
                        type="password" 
                        placeholder='비밀번호' 
                        className='pw'
                        onChange={e => setPassword(e.target.value)} 
                    />
                <br />
                <button
                    disabled={loading} 
                    type="submit"
                    className='btn'
                >
                    로그인
                </button>
                <div
                    className='msg'
                >
                    {msg}
                </div>
            </form>
        </div>
    )
}

export default LoginComponent