import React, { useRef, useState } from 'react'
import axios from 'axios'
import { FaUser, FaLock } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./forgotPassword.scss";
import Toastify from 'toastify-js';
const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleForgotPassWord = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_GATEWAY_BACKEND_URL}/service1/api/auth/forgotPassword`, {email, password})
            Toastify({
                text: response.data.message,
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                  display : "flex",
                  justifyContent: "center",  // Căn giữa theo chiều ngang
                  alignItems: "center",
                },
            }).showToast();
            navigate("/login")
        } catch(err) {
            Toastify({
                text: err.response.data.message,
                style: {
                  background: "red",
                  display : "flex",
                  justifyContent: "center",  // Căn giữa theo chiều ngang
                  alignItems: "center",
                },
              }).showToast();
        }
        
    }
  return (
    <div className="login">
            <div className="body">
                <div className="wrapper">
                    <form action="">
                        <h1>Change Password</h1>
                        <div className="input-box">
                            <input type="email" placeholder="email address" required onChange={(e) => setEmail(e.target.value)} />
                            <SiGmail className="icon" />
                        </div>


                        <div className="input-box">
                            <input type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className="icon" />
                        </div>


                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />Remember me
                            </label>
                            <a href="#">
                                <Link to="/register">
                                    Don't register?
                                </Link>
                            </a>
                        </div>
                        <button type="submit" onClick={handleForgotPassWord}>
                            Resert Password
                        </button>

                        <div className="register-link">
                            <p>Have an account ?
                                <a href="#">
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </a>
                            </p>
                        </div>

                        <div className="register-link">
                            <p>Login by FACE ?
                                <a href="#">
                                    <Link to="/loginAI">
                                        Login
                                    </Link>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ForgotPassword
