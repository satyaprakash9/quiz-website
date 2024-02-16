import axios from "axios";
import { useEffect, useState } from "react"
import quiz_img from '../assets/quiz.png';
import { useNavigate } from "react-router-dom";
const Available = () => {
    const [quizzes, setQuizzes] = useState([]);
    useEffect(() => {
        const fetch_data = async () => {
            const resp = await axios.get('http://localhost:4000/');
            setQuizzes(resp.data);
        }
        fetch_data();
    }, []);
    const navigate = useNavigate();
    return (
        <div className="container-fluid mt-5 d-flex flex-column align-items-center">
            {quizzes.length === 0 ? (
                <p className="fs-3">No quizzes are available</p>
            ) : (
                quizzes.map((quiz) => {
                    return (
                        <>
                            <div className="d-flex btn btn-outline-info shadow p-4 w-50 mt-3" onClick={() => navigate(`/show/${quiz._id}`)}>
                                <img src={quiz_img} alt="quiz" height={100} width={100} />
                                <div className="d-flex flex-column justify-content-start ms-3">
                                    <p className="fs-3">{quiz.title}</p>
                                    <p className="fs-5">{quiz.description}</p>
                                </div>
                            </div>
                        </>
                    );
                })
            )}
        </div>
    );
}
export default Available;