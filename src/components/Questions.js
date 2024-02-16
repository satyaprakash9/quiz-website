import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTotal, DeleteOption, DeleteQues, EditAns, EditOptions, EditQues, reset } from "../features/quizSlice";
import { useNavigate } from "react-router-dom";
import bin from '../assets/bin.png';
import bin_animated from '../assets/bin-animated.gif';
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Questions = () => {
    let questions = useSelector(store => store.quiz.ques);
    let options = useSelector(store => store.quiz.options);
    let multiple = useSelector(store => store.quiz.choice);
    let ans = useSelector(store => store.quiz.ans);
    let title = useSelector(store => store.quiz.title);
    let description = useSelector(store => store.quiz.description);
    const [opt, setOpt] = useState([]);
    const [choice, setChoice] = useState('radio');
    const [ans_value, setAnsValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleQuestion = (e, index) => {
        let ques = [...questions];
        ques[index] = e.target.value;
        dispatch(EditQues({ques}));
    }
    const handleOptions = (e, i, j) => {
        let opt = [...options];
        let option = [...options[i]];
        option[j] = e.target.value;
        opt[i] = option;
        dispatch(EditOptions({ options: opt }));
    }
    const handleAnswer = (e, index) => {
        let answers = [...ans];
        answers[index] = e.target.value;
        dispatch(EditAns({ ans: answers }));
    }
    const handleSelect = (e) => {
        setChoice(e.target.value);
    }
    const AddOption = () => {
        const option = document.querySelector('#option').value;
        setOpt([...opt, option]);
        document.querySelector('#option').value = "";
    }
    const AddQuestion = () => {
        const question = document.querySelector('#ques').value;
        const option = opt;
        const ans = ans_value;
        const choice = document.querySelector('#choice').value;
        if (question.length === 0 || option.length === 0 || ans.length === 0) {
            toast.error('Incomplete',{theme:'colored'});
            return;
        }
        dispatch(AddTotal({ question, option, ans, choice }));
        document.querySelector('#ques').value = '';
        setAnsValue('');
        setOpt([]);
        setChoice('radio');
    }
    return (
        <>
            <ToastContainer position="top-center" autoClose={2000} limit={1} transition={Flip}>
                <div className=""></div>
            </ToastContainer>
            <button type="button" className="btn btn-outline-info shadow position-sticky end-0 top-0 mt-2 me-2 fs-5" onClick={() => navigate('/available')}>Show Available Quizzes</button>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
                {questions.map((ques,index) => {
                    return (
                        <div className="d-flex flex-column w-50 card py-4 px-3 position-relative shadow ques-card mb-3 pt-1">
                            <img src={bin} alt="bin" className="ms-auto" onClick={() => dispatch(DeleteQues({index}))} onMouseEnter={(e) => e.target.src = bin_animated} onMouseLeave={(e) => e.target.src = bin} style={{height: '45px', width: '40px'}}/>
                            <div className="input-group">
                                <label htmlFor="ques" className="input-group-text bg-white">Question </label>
                                <input type="text" className="form-control" value={ques} onChange={(e) => handleQuestion(e, index)}/>
                            </div>
                            <div className="options d-flex flex-column w-100 align-items-start">
                                {options[index].map((option, idx) => {
                                    return (
                                        <div className="form-check m-2 w-md-100 w-100">
                                            <input type={multiple[index]} className="form-check-input" name="options" id={option} />
                                            <div className="d-flex">
                                                <input type="text" className="form-control w-75" value={option} onChange={(e) => { handleOptions(e, index, idx) }} />
                                                <button className="btn btn-sm btn-outline-danger ms-2 pb-0" type="button" onClick={() => {dispatch(DeleteOption({qindex: index, oindex: idx}))}}>
                                                    <span class="material-symbols-outlined">
                                                        close
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="input-group">
                                <label htmlFor="ans" className="input-group-text bg-white">Answer </label>
                                <input type="text" className="form-control" value={ans[index]} onChange={(e) => handleAnswer(e, index)}/>
                            </div>
                        </div>
                    );
                })}
                <div className="d-flex flex-column w-50 card py-4 px-3 shadow ques-card">
                    <div className="input-group">
                        <label htmlFor="ques" className="input-group-text bg-white">Question </label>
                        <input type="text" className="form-control" id="ques"/>
                    </div>

                    <div className="ms-auto mt-2" onChange={handleSelect}>
                        <select className="form-select" id="choice">
                            <option value="checkbox">Multiple</option>
                            <option value="radio" selected>Single</option>
                        </select>
                    </div>

                    <div className="options d-flex flex-column w-100 align-items-start">
                        {opt.map((option, index) => {
                            return (
                                <>
                                    <div className="form-check m-2 w-md-100 w-75">
                                        <input type={choice} className="form-check-input" name="options"/>
                                        <input type="text" className="form-control" value={option} onChange={(e) => {
                                            let x = [...opt];
                                            x[index] = e.target.value; // index is in opt.map
                                            setOpt(x);
                                        }}/>
                                    </div>
                                </>
                            )
                        })}
                        <div className="form-check m-2 w-md-100 w-75">
                            <input type={choice} className="form-check-input" name="options"/>
                            <input type="text" className="form-control" id="option" />
                        </div>
                        <button type="button" className="btn btn-sm btn-success" onClick={AddOption}>Add Option</button>
                    </div>
                    <div className="input-group mt-2">
                        <label htmlFor="ans" className="input-group-text bg-white">Answer </label>
                        <input type="text" className="form-control" aria-describedby="ans-aria" value={ans_value} onChange={(e) => {
                            setAnsValue(e.target.value);
                        }} />
                    </div>
                    <p className="form-text" id="ans-aria">Answer must match with the options</p>
                    <button type="button" className="btn btn-success mt-3 ms-auto" onClick={AddQuestion}>Add Question</button>
                </div>
                <button className="btn btn-outline-success w-50 mt-2" onClick={async () => {
                    if (questions.length === 0) {
                        toast.warn('No question is added', {theme:'colored'});
                        return;
                    }
                    const postData = {
                        ques: questions,
                        ans,
                        options,
                        choice: multiple,
                        title,
                        description
                    }
                    await axios.post('http://localhost:4000/', postData)
                        .then((res) => {
                            if (res.data === 'success') {
                                toast.success('Success');
                                dispatch(reset());
                            }
                            else toast.error('Please try after sometime');
                        })
                        .catch((err) => toast.error('Please try after sometime'));
                }}>Completed</button>
            </div>
        </>
    );
}
export default Questions;