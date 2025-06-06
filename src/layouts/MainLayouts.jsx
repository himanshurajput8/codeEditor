import React, { useContext } from "react";
import HomePage from "../pages/Home/Home";
import { EditorComp } from "../pages/Editor/Editor";
import { Route, Routes } from "react-router-dom";
import FeaturesSection from "./Features/FeaturesSection";
import CodeLanguages from "../components/CodeLanguages/CodeLanguages";
import Footer from "../pages/Footer/Footer";
import InterviewComp from "../components/interviewPage/interview";
import NoSignupUI from "../components/signUp/SignUp";
import InviteUi from "../components/invite/Invite";
import DropLandingPageComp from "../components/dropdownlandingPage/dropLandingPage";
import EdtiorComponent from "../components/editor/editorComp";
import RrwebReplayModal from "../components/RRWEB/Rrweb";
import { RrwebContext } from "../ContextAPI/RrwebContext";

export const MainLayout = () => {
    const {showReplayModal, setShowReplayModal} = useContext(RrwebContext);
    return (
        <>
        <Routes>
            <Route path="/" 
                element={<>
                    <HomePage/>
                    {/* <FeaturesSection/> */}
                    <InterviewComp/>
                    <NoSignupUI/>
                    <InviteUi/>
                    <DropLandingPageComp/>
                    <EdtiorComponent/>
                    <CodeLanguages/>
                    <Footer/>
                </>}/>
            <Route 
                path='/room/:id' 
                element={
                    <>
                        <EditorComp/>
                        {showReplayModal && (
                            <RrwebReplayModal onClose={() => setShowReplayModal(false)} />
                        )}
                    </>
                }/>
        </Routes>
        </>
    )
}