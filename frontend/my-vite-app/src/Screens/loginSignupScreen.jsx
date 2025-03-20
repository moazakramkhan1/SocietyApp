import Modal from "../components/Modal"
import LoginForm from "../components/LoginForm"
import Signup from "../components/SignUpform";
import { useState } from "react";
import robotImg from '../static/robotimg.jpg';
import "../styles/LoginSignupScreen.css"


function LoginSignupScreen() {
    const [formType, setFormType] = useState('');
    const [modalStatus, setModalStatus] = useState(false);
    const openModal = (type) => {
        setFormType(type);
        setModalStatus(true);
    }
    const closeModal = () => {
        setModalStatus(false);
    }
    return (<div className="screen-container">
        <div className="content-container">
            <div className="left-container">
                <h1>SocietyConnect</h1>
                <h2>Explore</h2>
                <p>Discover societies, events & connect with like-minded peers.</p>
                <button className="signup" onClick={() => openModal('signup')}>Join Now</button>
                <button className="login" onClick={() => openModal('login')}>Login</button>
            </div>
            <div className="right-container">
                <img src={robotImg} alt="roboimg" className="robotimage" />
            </div>
        </div>
        {
            modalStatus && <Modal showModal={modalStatus} closeModal={closeModal} FormType={formType}>
                {formType === 'login' ? <LoginForm /> : <Signup setFormType={setFormType} />}
            </Modal>
        }
    </div>)
}

export default LoginSignupScreen