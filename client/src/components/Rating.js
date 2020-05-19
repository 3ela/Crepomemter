import React , { Component } from 'react';
import { MdStar , MdStarBorder } from 'react-icons/md';

class Rating extends Component {  
    render(){
        var starsArr = [];
        for( let i = 1 ; i <= 5 ; i++){
            if(i <= this.props.rate){
                starsArr.push(
                    <MdStar id = {i}
                            key = {i+1}  
                        />   
                );
            }else {
                starsArr.push(
                    <MdStarBorder  
                                id = {i}
                                key = {i+1} 
                            />
                );
            };
        };
        return(
            <span className='list-item-rating'>
                {starsArr}
            </span>
        );
    };
};

export default Rating;