import React , { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SearchBar from './SearchBar';
import GoogleButton from './GoogleButton';


class Navigation extends Component {
    constructor(){
        super();
        this.state = {
            collapsed : true,
        };
        this.setCollapsed = this.setCollapsed.bind(this);
    };

    setCollapsed(){
        this.setState({
            collapsed : !this.state.collapsed,
        });
    };


    render(){
        const toggleNavbar = () => this.setCollapsed();
        if(!this.props.isMobileView){
            return(
                <div className='header'>
                    <div className='navigation'><SearchBar onSearch={this.props.onSearch} /></div>
                    <div className='alert-holder'></div>
                    <div className='logout'>
                        <GoogleButton useAlert={this.props.useAlert} setLogged={this.props.setLogged} />
                    </div>  
                </div>
                )
        }else return(
            <div className='header'> 
                <Navbar className="navigation"  light>
                    <NavbarBrand href="/" className="mr-auto">CREPOMETER</NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                          <NavLink href="/logout"> <GoogleButton useAlert={this.props.useAlert} setLogged={this.props.setLogged} />  </NavLink>
                        </NavItem>
                        <NavItem>
                            <SearchBar onSearch={this.props.onSearch}/>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    };

};

export default Navigation;