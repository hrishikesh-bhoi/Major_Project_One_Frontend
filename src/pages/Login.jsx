import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);
    const [ error, setError ] = useState("");

    const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
        setError("Please enter both email and password.");
        return;
    }

    setError("");
    alert("Login successful! (Frontend demo)");
};

    return(
        <>
        <Navbar />
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4">
                        <h2 className="text-center fw-bold mb-4">Welcome Back!</h2>
                        <div className="mb-3">
                            <label className="from-label">Email Address</label>
                            <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}