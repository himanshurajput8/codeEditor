import React from "react";
import { useState} from "react";
import HomePage from "../pages/Home";
import CompaniesSection from "../pages/CompaniesSection";
import { EditorComp } from "../pages/editorPage/editor";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";


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