import { Route, Routes } from "react-router-dom";
import Sessions from "../pages/Sessions/Sessions";
import AuthCallback from "../components/AuthCallback/AuthCallback";
import SharedRecording from "../pages/SharedRecording/ShareRecording";
import LandingPage from "../pages/Landing/LandingPage";
import {EditorComp} from '../pages/Editor/Editor'
import ProtectedRoutes from "../Routes/ProtectedRoutes";
import PageNotFound from '../pages/PageNotFound/PageNotFound'

export const MainLayout = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />}/>

                <Route path="/auth/callback" element={<AuthCallback />} />

                <Route path="/home" element={<LandingPage />}/>

                <Route path='/editor/:id' element={<EditorComp />}/>

                <Route path='/sessions' element={
                    <ProtectedRoutes>
                        <Sessions />
                    </ProtectedRoutes>
                    }/>

                <Route path='/shared/:token'element={<SharedRecording />}/>

                <Route path='/features'element={<h1>Features</h1>}/>

                <Route path="/contact" element={<h1>Contact US</h1>}/>

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </>
    )
}