import React from "react";
import HomePage from "../pages/Home";
import { EditorComp } from "../pages/editorPage/editor";
import { Route, Routes } from "react-router-dom";

export const MainLayout = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='/room/:id' element={<EditorComp/>}/>
        </Routes>
        </>
    )
}