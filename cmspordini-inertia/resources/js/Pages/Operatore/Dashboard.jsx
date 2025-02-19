import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/clienteDashboard.css";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
