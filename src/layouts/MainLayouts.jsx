import React from "react";
import HomePage from "../pages/Home/Home";
import { EditorComp } from "../pages/Editor/Editor";
import { Route, Routes } from "react-router-dom";
import FeaturesSection from "./Features/FeaturesSection";
import CodeLanguages from "../components/CodeLanguages/CodeLanguages";
import Footer from "../pages/Footer/Footer";
import NoSignupUI from "../components/signUp/SignUp";
import InviteUi from "../components/invite/Invite";
import DropLandingPageComp from "../components/dropdownlandingPage/dropLandingPage";
import EdtiorComponent from "../components/editor/editorComp";

export const MainLayout = () => {

    return (
        <>
        <Routes>
            <Route path="/" 
                element={<>
                    <HomePage/>
                    {/* <FeaturesSection/> */}
                    <NoSignupUI/>
                    <InviteUi/>
                    <DropLandingPageComp/>
                    <EdtiorComponent/>
                    <CodeLanguages/>
                    <Footer/>
                </>}/>
            <Route path='/room/:id' element={<EditorComp/>}/>
        </Routes>
        </>
    )
}