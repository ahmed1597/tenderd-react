import React from "react";
import {Route} from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
const Navmenu = () =>{
    return (
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="dashboard">
                    <NavItem eventKey="requests">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="requests">
                        <NavIcon>
                            <i className="fa-fw fa fa-list-alt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Requests
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="companies">
                        <NavIcon>
                            <i className="fa fa-fw fa-building" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Companies
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="profile">
                        <NavIcon>
                            <i className="fa-fw fa fa-user" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Profile
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </React.Fragment>
    )}
    />

    );
}

export default Navmenu;