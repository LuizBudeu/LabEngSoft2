import React, { useState } from "react";
import { TopBar } from "../../components/TopBar";
import Tabs from "./tabs";

export const NutricionistaHome = () => {
    return (
        <div className="NutricionistaHome">
            <TopBar/>
            <h1>Home</h1>
            <Tabs />
        </div>
    );
};
