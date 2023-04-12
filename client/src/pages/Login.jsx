import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthStyles from "./AuthStyle.module.css";
import Modal from '../components/UI/ErrorModal';

const Login = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
      //console.log(res)
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={AuthStyles.auth}>
      <h1>Admin User Login</h1>
      <form>
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className={AuthStyles.link}>Login</button>
    
        <Link to="/" className={AuthStyles.link}>
          Home 
        </Link>
     {/*    //Error Modal //  */}
        {err && <Modal setModalIsOpen={setIsOpen} message={"Error: "+err} />}

      </form>
    </div>
  );
};

export default Login;
