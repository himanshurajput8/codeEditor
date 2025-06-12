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
// import RrwebReplayModal from "../components/RRWEB/Rrweb";
// import { RrwebContext } from "../ContextAPI/RrwebContext";
import Sessions from "../pages/Sessions/Sessions";
import AuthCallback from "../components/AuthCallback/AuthCallback";
import SharedRecording from "../pages/SharedRecording/ShareRecording";
import Homepage2 from "../pages/Home/Homepage2";
import FeatureBarWithIcons from "../NEWTHEME/Features/FeaturesBar";
import VideoSection from "../NEWTHEME/VideoSection/VideoSection";
import FeatureSectionWithVideo from "../NEWTHEME/FeatureSectionWithVideo/FeatureSectionWithVideo";

export const MainLayout = () => {
    // const {showReplayModal, setShowReplayModal} = useContext(RrwebContext);
    
    return (
        <>
        <Routes>
            <Route path="/" 
                element={<>
                     <Homepage2 />
                    <FeatureBarWithIcons />
                    <VideoSection />
                    <FeatureSectionWithVideo/>
                    <HomePage/> 
                    <FeaturesSection/>
                    <InterviewComp/>
                    <NoSignupUI/>
                    <InviteUi/>
                    <DropLandingPageComp/>
                    <EdtiorComponent/>
                    <CodeLanguages/>
                    <Footer/> 
                </>
            }/>

            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route 
                path='/:id' 
                element={
                    <>
                        <EditorComp/>
                        {/* {showReplayModal && (
                            <RrwebReplayModal onClose={() => setShowReplayModal(false)} />
                        )} */}
                    </>
                }
            />
            
            <Route
                path='/sessions'
                element ={
                    <Sessions/>
                }
            />
            
            <Route
                path='/shared/:token'
                element ={
                    <SharedRecording/>
                }
            />

            <Route path="*" element={<div>404 - Page Not Found</div>} />

        </Routes>
        </>
    )
}