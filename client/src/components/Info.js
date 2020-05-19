import React , {Component, useRef} from 'react';
import { MdFavoriteBorder , MdFavorite } from 'react-icons/md';
import UserRate from './UserRate';
import { caps } from '../Helpers';
import FavsList from './FavsList';

class Footer extends Component {
    constructor(){
        super();
        this.state = {
            user : {},
            updated : false
        };
        this.saveRate = this.saveRate.bind(this);
        this.saveFavourits = this.saveFavourits.bind(this);
        this.getUserFav = this.getUserFav.bind(this);
        this.getUserRating = this.getUserRating.bind(this);
    };  
    
    async saveRate(rate){
        let rateId = this.state.updated 
                                        ? this.state.user.rate.find(rate => rate.placeId === this.props.place._id)
                                        : this.props.loggedUser.rate.find(rate => rate.placeId === this.props.place._id);
        if(!rateId){
            rateId = 0;
        }else rateId = rateId._id
        let data = {
            rateId : rateId,
            userId : this.props.loggedUser._id,
            placeId : this.props.place._id,
            rate : rate ,
        };
        let updateRate = await fetch('http://localhost:5000/rate' , {
            method : 'post',
            headers : { 'Content-Type' : 'application/json'  },
            body : JSON.stringify(data)
        });
        let response = await updateRate.json();
        this.setState({
            user : response.user,
            updated : true
        });
        const text = 'Rating Saved ' ;
        this.props.useAlert(text,'primary');
    };
    
    async saveFavourits(placeId){
        let data = {
            email : this.props.loggedUser.email,
            placeId : placeId,
        };
    
        let updateRate = await fetch('http://localhost:5000/user/favs' , {
            method : 'PATCH' ,
            headers : { 'Content-Type' : 'application/json'  },
            body : JSON.stringify(data)
        });
        let response = await updateRate.json();
        this.setState({
            user : response.user,
            updated : true
        });
        const text = this.getUserFav() ? 'Added to Favourites' : 'Removed from Favourites' ;
        this.props.useAlert(text,'primary');   
    };

    getUserRating(){
       let userRate = this.state.updated 
                                        ? this.state.user.rate.find(rate => rate.placeId === this.props.place._id)
                                        : this.props.loggedUser.rate.find(rate => rate.placeId === this.props.place._id);
        if(userRate){
            return userRate.rate;
        }else return 0;
    };

    getUserFav(){
        let userFavs = this.state.updated 
                                        ? this.state.user.favs.find(place => place._id === this.props.place._id)
                                        : this.props.loggedUser.favs.find(place => place._id === this.props.place._id);
        if(userFavs){
            return true;
        }else return false;
    };

    render(){
        let place = this.props.place ;
        if(this.props.searched === 0 && !this.props.logged){
            return(
                    <div className='info'>
                        <div className='place-name-address'> Search for places using the Search Bar up top </div>
                        <div className='info-icons'>
                            { this.props.isMobileView ? 'Please Log In' : 'Log in to use Rating and Favs' }
                        </div>
                    </div>
                )
        }else if( this.props.searched === 2 && !this.props.logged ){
            return( 
                    <div className='info'>
                        <div className='place-name-address'>{caps(place.name)} - {caps(place.address)}</div>
                        <div className='place-contact'>({this.props.cityKey})  {place.contact}</div>
                        <div className='info-icons'>
                            { this.props.isMobileView ? 'Please Log In' : 'Log in to use Rating and Favs' }
                        </div>
                    </div>
            )
        }else if( this.props.searched === 0 && this.props.logged){
            let favsList = this.state.updated ? this.state.user.favs : this.props.loggedUser.favs ;
            return(
                    <div className='info'>
                        <div className='place-name-address'> Search for places using the Search Bar up top </div>
                        <div className='favourites'>
                            <FavsList 
                                    saveFavourits={this.saveFavourits}
                                    setLocation={this.props.setLocation}
                                    setSearched={this.props.setSearched}
                                    favsList={favsList}    />
                        </div>
                    </div>
                )
        }else if( this.props.searched === 1 && this.props.logged ){
            let favsList = this.state.updated ? this.state.user.favs : this.props.loggedUser.favs ;
            return(
                <div className='info'>
                    <div className='place-name-address'> Search for places using the Search Bar or choose one from the list </div>
                    <div className='favourites'>
                            <FavsList 
                                    saveFavourits={this.saveFavourits}
                                    setLocation={this.props.setLocation}
                                    setSearched={this.props.setSearched}
                                    favsList={favsList}    />
                        </div>
                </div>
            )

        }else if( this.props.searched === 1  && !this.props.logged ){
            return(
                <div className='info'>
                    <div className='place-name-address'> Search for places using the Search Bar or choose one from the list </div>
                </div>
            )
        }else {let favsList = this.state.updated ? this.state.user.favs : this.props.loggedUser.favs ;
                return(
            
                    <div className='info'>
                        <div className='place-name-address'>{caps(place.name)} - {caps(place.address)}</div>
                        <div className='place-contact'>({this.props.cityKey}) {place.contact}</div>
                        <div className='favourites'>
                            <FavsList 
                                    saveFavourits={this.saveFavourits}
                                    setLocation={this.props.setLocation}
                                    setSearched={this.props.setSearched}
                                    favsList={favsList}    />
                        </div>
                        <div className='info-icons'>
                            <div className='rate-icon'>     <UserRate 
                                                                    filled = {this.getUserRating()}
                                                                    saveRate = {this.saveRate}  
                                                            /></div> 
                            { !this.getUserFav()
                            ? <div className='fav-icon'>    <MdFavoriteBorder 
                                                                onMouseEnter = {this.hoverOn}
                                                                onClick={() => this.saveFavourits(place._id)}
                                                            /></div>
                                                    
                            : <div className='fav-icon'>  <MdFavorite
                                                                onMouseEnter = {this.hoverOn}
                                                                onClick={() => this.saveFavourits(place._id)}
                                                            /></div>}
                        </div>
                    </div>
        )}
    };
};

export default Footer;