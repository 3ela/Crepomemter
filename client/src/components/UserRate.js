import React , { Component } from 'react';
import ReactDom from 'react-dom';
import { MdStar , MdStarBorder } from 'react-icons/md';

class UserRate extends Component {
    constructor(){
        super();
        this.state = {
            hover : false,
            clicked : false,
            hoverFill : 0
        };
        this.clicked = this.clicked.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.loadStars = this.loadStars.bind(this);
    };

    loadStars(filled){
        var starsArr = [];
        for( let i = 1 ; i <= 5 ; i++){
            if(i <= filled){
                starsArr.push(
                    <MdStar  
                            onMouseEnter={this.hoverOn}
                            onMouseLeave={this.hoverOff}  
                            onClick={this.clicked}  
                            id = {i}
                            key = {i+1} />
                );
            }else {
                starsArr.push(
                    <MdStarBorder  
                                onMouseEnter={this.hoverOn}
                                onMouseLeave={this.hoverOff}  
                                onClick={this.clicked}  
                                id = {i}
                                key = {i+1} />
                );
            };
        };
        return(starsArr);
    };

    hoverOn(e){
        this.setState({
            hover : true,
            hoverFill : e.target.id,
        });
    };
    
    hoverOff(e){
        this.setState({
            hover : false,
        });
    };

    clicked(e){
        this.setState({
            clicked : true
        });
        var stars = [];
        if(e.target.id <= 5 && e.target.id >= 1){
            this.props.saveRate(e.target.id);
        }else {
            console.log('try again');
            var x = e.clientX, y = e.clientY ;
            var elementId = document.elementFromPoint(x, y).parentElement.id;
            this.props.saveRate(elementId);
        };
    };

    render(){
        if(this.state.hover == true){
            return (
                <span id='stars' >
                    {this.loadStars(this.state.hoverFill)}
                </span>   
            );
        }else{
            return(
                <span id='stars' >
                    {this.loadStars(this.props.filled)}
                </span>
            );
        }
    };
};

export default UserRate;