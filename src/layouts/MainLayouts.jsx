import React from "react";
import HomePage from "../pages/Home";
import { EditorComp } from "../pages/Editor";
import { Route, Routes } from "react-router-dom";
import FeaturesSection from "./Features/FeaturesSection";
import CodeLanguages from '../layouts/CodeLanguages/CodeLanguages'

export const MainLayout = () => {

    return (
        <>
        <Routes>
            <Route path="/" 
                element={<>
                    <HomePage/>
                    <CodeLanguages/>
                    <FeaturesSection/>
                </>}/>
            <Route path='/room/:id' element={<EditorComp/>}/>
        </Routes>
        </>
    )
}