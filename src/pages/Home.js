import { Link } from "react-router-dom";
import AuthUser from "../components/AuthUser";

export default function Home() {

    const {user} = AuthUser();

    return(
        <div className="home">
            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-body mb-5">
                                <div className="welcome-msg">
                                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/welcome-board-3688623-3231454.png" className="d-block mx-auto" style={{ height:"300px" }} alt="" />
                                    <div className="welcome-msg-title h2 text-center">
                                        React-Laravel Blog App
                                    </div>
                                    {!user ? (
                                        <div className="user-status text-center mt-3">
                                            If you are not registred on this app, <Link to="/register">registred here.</Link>
                                        </div>
                                    ):(
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}