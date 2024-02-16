import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Score = () => {
    const { quizID } = useParams();
    const score = useSelector(store => store.quiz.score);
    const [qlen, setLen] = useState(0);
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        const fetch_score = async () => {
            const resp = await axios.get(`http://localhost:4000/${quizID}`);
            setLen(resp.data[0].ques.length);
        }
        fetch_score();
    }, []);
    useEffect(() => setPercentage((score / qlen) * 100), [qlen]);
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <p className="fs-1">You Scored: {percentage.toFixed(2)}%</p>
        </div>
    );
}
export default Score;