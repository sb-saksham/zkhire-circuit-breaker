import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "./hoc/RequireAuth";
import LogInPage from "./components/auth/LogInPage";
import MNavbar from "./components/UI/MNavbar";
import HomePage from "./components/UI/Homepage";
import Error404Page from "./components/UI/Error404Page";

function App() {
    return (
    <BrowserRouter>
        <Routes>
          <Route element={<MNavbar/>} errorElement={<Error404Page/>}>
            <Route path="/" element={<HomePage />}/>
            {/* <Route path="/jobs/">          
                <Route path=":id/" element={<RequireAuth><IndJobs /></RequireAuth>}>
                    <Route path="test/">
                        <Route path="coding/" element={<RequireAuth>
                            <CodingTest/>
                        </RequireAuth>} />
                        <Route path="quiz/" element={<RequireAuth>
                            <AssessmentTest />
                        </RequireAuth>} />          
                    </Route> 
                </Route>
                <Route path="post/" element={<RequireAuth>
                    <AddJob />
                </RequireAuth>} />
                <Route path="apply/" element={<RequireAuth>
                    <AllJob />
                </RequireAuth>} />
                <Route path="company/" element={<RequireAuth>
                    <CompanyJobs />
                </RequireAuth>} />
            </Route> */}
            <Route path='/auth/' element={<LogInPage />} />
          </Route>
        </Routes>          
    </BrowserRouter>
  );
}

export default App;