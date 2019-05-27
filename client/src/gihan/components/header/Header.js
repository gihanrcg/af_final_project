import React from 'react';
import './HeaderStyles.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem
} from 'reactstrap';


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLoggedIn: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (

            <Navbar className="nav_styles" expand="lg" color="primary" light>
                <NavbarBrand href="/" className="navbar-brand" style={{color: 'white'}}>School Management
                    System</NavbarBrand>
                {/*<div className="navbar-dark navbar-toggler-icon navbar-toggler" style={{color:'white',background:'white'}}/>*/}
                <NavbarToggler onClick={this.toggle} className="navbar-dark" style={{color: 'white'}}/>
                <Collapse isOpen={this.state.isOpen} navbar>

                    <Nav className="" navbar>
                        <NavItem>
                            <NavLink href="/components/" style={{color: 'white'}}
                                     className="nav_link_styles">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap" style={{color: 'white'}}
                                     className="nav_link_styles">GitHub</NavLink>
                        </NavItem>


                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/createUser" className="nav_link_styles"
                                     style={{color: 'white'}}>SignUp</NavLink>
                        </NavItem>


                        {this.state.isLoggedIn &&
                        <NavItem>
                            <NavLink href="/logout" className="nav_link_styles"
                                     style={{color: 'white'}}>Logout</NavLink>
                        </NavItem>
                        }

                        {!this.state.isLoggedIn &&
                        <NavItem>
                            <NavLink href="/login" className="nav_link_styles" style={{color: 'white'}}>Login</NavLink>
                        </NavItem>
                        }
                    </Nav>

                </Collapse>
            </Navbar>

        );
    }
}

export default Header;
