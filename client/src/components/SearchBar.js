import React , {useState} from 'react';
import { InputGroup, InputGroupAddon, InputGroupText , Input } from 'reactstrap';
import {FaSearch} from 'react-icons/fa';


function SearchBar(props){

    const [searchText , setSearchText] = useState('');
    const onClick = () => {
      props.onSearch(searchText);
    };
    const onEnter = (e) => {
      if (e.key === 'Enter'){
        props.onSearch(searchText);
      }
    };
    
    return(
        <div className='search-bar'>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText onClick={onClick} tabIndex='2' > <FaSearch className='google-icon'/>  </InputGroupText>
            </InputGroupAddon>
            <Input tabIndex='1' value={searchText} onChange={(e) => setSearchText(e.target.value)}  onKeyDown={onEnter}/>
          </InputGroup>
        </div>

    );
};

export default SearchBar;