import { Outlet } from "react-router-dom";

import Header from "../header/Header"

import "./question-layout-styles/questionLayoutStyles.scss"

const QuestionLayout = () => {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>        
    );
}
 
export default QuestionLayout;