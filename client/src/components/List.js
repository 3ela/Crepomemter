import React , {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Rating from './Rating';
import { caps, sortByName , sortByRate} from '../Helpers';

class List extends Component {
    constructor(){
        super();
        this.state = {
            sort : '',
            dropdownOpen : false    
        };
        this.setOpen = this.setOpen.bind(this);
        this.choosePlace = this.choosePlace.bind(this);
        this.setSort = this.setSort.bind(this);
   };

    setOpen(){
        this.setState({
            dropdownOpen : !this.state.dropdownOpen
        });
    };

    choosePlace(place){
        this.props.setLocation(place);
        this.props.setSearched(2);
    };

    setSort(e){
        this.setState({
            sort : e.target.innerText
        });
    };
    

   render(){
    const listHeader =  <div className='list-header'>
                            <span> City : {caps(this.props.city)} </span>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.setOpen} className='list-filter'>
                                <DropdownToggle caret>
                                    Sort By {this.state.sort}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.setSort}>Name</DropdownItem>
                                    <DropdownItem onClick={this.setSort}>Rating</DropdownItem>
                                    <DropdownItem onClick={this.setSort}>Distance</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div> ;
    
        
    
        switch(this.state.sort){
               case('Name'):{
                   return(
                    <div className='list'>
                        <ListGroup flush>
                            {listHeader}
                            {sortByName(this.props.places).map((place) => {
                                return <ListGroupItem onClick={() => this.choosePlace(place)}> 
                                            {caps(place.name)} <Rating rate={place.rate} /> 
                                        </ListGroupItem>
                            })}
                        </ListGroup>  
                    </div>
                   )};
               case('Rating'):{
                return(
                    <div className='list'>
                        <ListGroup flush>
                            {listHeader}
                            {sortByRate(this.props.places).map((place) => {
                                return <ListGroupItem onClick={() => this.choosePlace(place)}> 
                                            {caps(place.name)} <Rating rate={place.rate} /> 
                                        </ListGroupItem>
                            })}
                        </ListGroup>  
                    </div>   
                )};
               case('Distance'):{
                return(
                    <div className='list'>
                        <ListGroup flush>
                            {listHeader}
                            {sortByName(this.props.places).map((place) => {
                                return <ListGroupItem onClick={() => this.choosePlace(place)}> 
                                            {caps(place.name)} <Rating rate={place.rate} /> 
                                        </ListGroupItem>
                            })}
                        </ListGroup>  
                    </div>
                   )};
               default: return(
                <div className='list'>
                    <ListGroup flush>
                        {listHeader}
                        {this.props.places.map((place) => {
                            return <ListGroupItem onClick={() => this.choosePlace(place)}> 
                                        {caps(place.name)} <Rating rate={place.rate} /> 
                                    </ListGroupItem>
                        })}
                    </ListGroup>  
                </div>

               )
   
           }
   };
};

export default List;