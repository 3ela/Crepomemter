import React , { useState } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { MdDelete } from 'react-icons/md';
import { caps } from '../Helpers';

function FavsList(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const listOnClick = (place) => {
        props.setLocation(place);
        props.setSearched(2);
    };
    
    let favsList = props.favsList;
    return(
        <div >
            <Dropdown direction='up' isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle >
                    Favourites
                </DropdownToggle>
                <DropdownMenu>
                    {favsList.map(place => {
                        return (
                            <DropdownItem onClick={() => listOnClick(place)}> {caps(place.name)} <MdDelete onClick={() => props.saveFavourits(place._id)} /> </DropdownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default FavsList;