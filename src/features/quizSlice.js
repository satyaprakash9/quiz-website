import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    ques: [], // array
    ans: [], // array of arrays
    options: [],
    choice: [],
    title: "Untitled",
    sub_ans: [],
    score: 0,
    description: "Description"
}
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        AddTotal: (state, action) => {
            state.ques.push(action.payload.question);
            state.options.push(action.payload.option);
            state.ans.push(action.payload.ans);
            state.choice.push(action.payload.choice);
        },
        EditQues: (state, action) => {
            state.ques = action.payload.ques;
        },
        DeleteQues: (state, action) => {
            state.ques = state.ques.filter(item => item !== state.ques[action.payload.index]);
        },
        EditOptions: (state, action) => {
            state.options = action.payload.options;
        },
        DeleteOption: (state, action) => {
            const i = action.payload.qindex; // ques index
            const j = action.payload.oindex; // option index
            if (state.options[i].length === 1) {
                toast.info('Question must have one option');
            }
            else {
                const deleteElement = state.options[i][j];
                state.options[i] = state.options[i].filter(item => item !== deleteElement);
            }
        },
        EditAns: (state, action) => {
            state.ans = action.payload.ans;
        },
        EditChoice: (state, action) => {
            state.choice = action.payload.choice;
        },
        AddTitle: (state, action) => {
            const title = action.payload.title;
            const description = action.payload.description;
            if(title) state.title = title;
            if(description) state.description = description;
        },
        UpdateScore: (state, action) => {
            const choice = action.payload.choice;
            const len = action.payload.len;
            const ans = action.payload.ans;
            for (let i = 0; i < len; i++){
                if (!state.sub_ans[i]) continue;
                else if (choice[i] === 'radio' && state.sub_ans[i][0] === ans[i]) state.score += 1;
                else if (choice[i] === 'checkbox') {
                    const answers = ans[i].split(',');
                    if (answers.length === state.sub_ans[i].length) {
                        let flag = 0;
                        for (let j = 0; j < answers.length; j++){
                            if (!state.sub_ans.filter(item => item === answers[j])) {
                                flag = 1;
                                break;
                            };
                        }
                        if (flag === 0) state.score += 1;
                    }
                }
            }
        },
        submittedAns: (state, action) => {
            const type = action.payload.type;
            const index = action.payload.qindex;
            const ans = action.payload.opt;
            if (type === 'radio') {
                state.sub_ans[index] = [ans];
            }
            else {
                if (!state.sub_ans[index]) {
                    console.log('if');
                    state.sub_ans[index] = [ans];
                }
                else if (state.sub_ans[index].find(item => item === ans)) {
                    console.log('else if');
                    state.sub_ans[index] = state.sub_ans[index].filter(item => item !== ans);
                }
                else {
                    state.sub_ans[index].push(ans);
                    console.log('else');
                }
            }
        },
        reset: (state) => {
            state.ques = [];
            state.ans = [];
            state.options = [];
            state.choice = [];
            state.sub_ans = [];
            state.title = "Untitled";
            state.score = 0;
            state.description = "Description";
        }
    }
});
export const { EditQues, EditOptions, EditAns, EditChoice, AddTotal, AddTitle, UpdateScore, DeleteOption, DeleteQues, submittedAns, reset }  = quizSlice.actions;
export default quizSlice.reducer;