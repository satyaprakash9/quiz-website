import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div style={{height: "100vh", width: '100vw'}} className="d-flex flex-column justify-content-center align-items-center">
            <button type="button" className="btn btn-outline-info w-50 h-25 fs-1 mt-3 shadow" onClick={() => navigate('/create')}>Create Quiz</button>
            <button type="button" className="btn btn-outline-info w-50 h-25 fs-1 mt-3 shadow" onClick={() => navigate('/available')}>Show Available Quizzes</button>
        </div>
    );
}
export default Home;