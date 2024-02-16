import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddTitle } from "../features/quizSlice";

const Create = () => {
    const store = useSelector(store => store);
    console.log(store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handelCreate = () => {
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#desc').value;
        dispatch(AddTitle({ title, description }));
        console.log(store);
        navigate('/questions');
    }
    return (
        <>
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh'}}>
                <div className="d-flex flex-column w-50 card py-4 px-3 position-relative shadow">
                    <div className="w-100 ribbon rounded-top"></div>
                    <input type="text" className="text mb-3 fs-3" id="title" placeholder="Untitled Form" />
                    <input type="text" className="text mb-2 fs-5" id="desc" placeholder="Description" />
                </div>
                <button className="btn btn-outline-dark mt-4 w-25 fs-3" onClick={handelCreate}>Create</button>
            </div>
        </>
    );
}
export default Create;