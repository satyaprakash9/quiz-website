import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateScore, reset, submittedAns } from "../features/quizSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [choice, setChoice] = useState([]);
    const [title, setTitle] = useState('');
    const [ans, setAns] = useState([]);
    const [description, setDesc] = useState('');
    const { quizID } = useParams(); // it is like req.params in expressjs see in app.js how i send id
    useEffect(() => {
        const fetch_data = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/${quizID}`);
                console.log(res.data);
                const data = res.data[0]; // it's giving array
                console.log(data);
                setQuestions(data.ques);
                setAns(data.ans);
                setOptions(data.options);
                setChoice(data.choice);
                setTitle(data.title);
                setDesc(data.description);
            } catch (error) {
                console.log(error);
            }
        };
        fetch_data();
        dispatch(reset()); // I need to reset state to its intial because when i see the score and come back to show redux is storing previous score ans sub_ans
    }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOption = (e, qindex, oindex) => {
        const opt = options[qindex][oindex];
        const type = e.target.type;
        dispatch(submittedAns({ qindex, opt, type}));
    }
    const handleSubmit = () => {
        const len = questions.length;
        dispatch(UpdateScore({choice, ans, len}));
        navigate(`/score/${quizID}`);
    }
    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-center mb-3">
                <div className="d-flex flex-column w-50 card py-4 px-3 position-relative shadow mt-2" style={{backgroundColor: 'rgb(245, 245, 245)'}}>
                    <div className="w-100 ribbon rounded-top"></div>
                    <p className="mb-3 fs-3" id="title">{ title }</p>
                    <p className="mb-3 fs-5" id="desc">{ description }</p>
                </div>
            </div>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
                {questions.map((ques,index) => {
                    return (
                        <div className="d-flex flex-column w-50 card py-4 px-3 position-relative shadow ques-card mb-3">
                            <p className="fw-bold">{ques}?</p>
                            <div className="options d-flex flex-column w-100 align-items-start">
                                {options[index].map((option, idx) => {
                                    return (
                                        <div className="form-check m-2">
                                            <input type={choice[index]} className="form-check-input" name={index} id={String(index) + String(idx)} onChange={(e) => handleOption(e, index, idx)}/>
                                            <label htmlFor={String(index) + String(idx)}>{option}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                <div className="w-50 d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    );
}
export default Show;