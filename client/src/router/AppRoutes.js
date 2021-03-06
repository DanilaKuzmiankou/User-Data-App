import {Route, Routes} from 'react-router-dom'
import {HomePage, UsersDataPage} from '../pages/index.pages'
import React from "react";


export const AppRoutes = () => (

    <Routes>

        <Route path='/' element={<HomePage/>}/>
        <Route path='/userPage' element={<UsersDataPage/>}/>
        <Route path="*" element={<HomePage />} />

    </Routes>

)
