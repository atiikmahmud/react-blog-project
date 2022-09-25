import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layouts() {
    return(
        <div className="layouts">
            <Navbar/>
            <Outlet/>
        </div>
    );
}