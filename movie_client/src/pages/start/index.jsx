import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Start() {
    const auth = useSelector((state) => state.auth);

    const navigate = useNavigate();

    return (
        <div>
            <h1>Start</h1>
        </div>
    );
}