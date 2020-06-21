import React from 'react'
import {Route,Switch} from "react-router-dom"
import StatsPage from '../Components/StatsPage/StatsPage'
import DashboardTransaction from '../Components/DashboardTransaction/DashboardTransaction'

export default function DashBoardRoutes() {
    return (
        <Switch>
            <Route path="/admin/dashboard" exact component={StatsPage}/>
            <Route path="/admin/dashboard/history" component={DashboardTransaction}/>
        </Switch>
    )
}
