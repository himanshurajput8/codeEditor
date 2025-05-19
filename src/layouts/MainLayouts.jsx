import React from "react";
import { useState} from "react";
import HomePage from "../pages/Home";
import CompaniesSection from "../pages/CompaniesSection";
import { EditorComp } from "../pages/editorPage/editor";


export const MainLayout = () => {
    const [showEditor, setShowEditor] = useState(false);

    return (
        <>
            {!showEditor ? (
                <>
                    <HomePage onShareClick={() => setShowEditor(true)} />
                    <CompaniesSection />
                </>
            ) : (
                <EditorComp />
            )}
        </>
    )
}