import React , {Component} from 'react';
import ReactDom from 'react-dom';
import Navigation from './components/Navigation';
import List from './components/List';
import Info from './components/Info'
import AlertHolder from './components/AlertHolder';
import MapContainer from './components/MapContainer';


class App extends Component {
  constructor(){
    super();
    this.state ={
      mainMarker : {
        title : '',
        lat: 27.044477,
        long:  31.23632,
      },
      zoom: 6,
      city: {},
      place : {},
      list : [],
      isMobileView :false,
      logged : false,
      user : {},
      searched : 0,
      searchText : ''
    };
    this.resize = this.resize.bind(this);
    this.useAlert = this.useAlert.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setLogged = this.setLogged.bind(this);
    this.setData = this.setData.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setSearched = this.setSearched.bind(this);
  };

  setLogged(status , user){
    this.setState({
      logged : status,
      user : user
    });
  };
  
  setSearched(number){
    this.setState({
      searched : number
    });
  };

  useAlert(text,type){
    ReactDom.render(
      <AlertHolder  text={text} type={type} />,
      document.getElementsByClassName("alert-holder")[0]
    );
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  };

  resize() {
      this.setState({ isMobileView : window.innerWidth <= 1400});
  };

  setData(data){
    if(data.searchResult.places.length === 0 && data.searchResult.cities.length === 0 ){
      this.useAlert(' This place was not Found ');
    }else if( data.searchResult.cities.length !== 0 ){ 
      let city = data.searchResult.cities[0];
      this.setState({
        city : city, 
        list : data.placesInCity,
        mainMarker : {
          title : city.name,
          lat : city.coordinates.lat,
          long : city.coordinates.long,
        },
        searched : 1,
        zoom:12
      });
    }else{ 
      let place = data.searchResult.places[0];
      this.setState({
        city : data.cityInPlace ,
        list : data.placesInCity,
        place : place,
        mainMarker : {
          title : place.name,
          lat : place.coordinates.lat,
          long : place.coordinates.long,
        },
        searched : 2,
        zoom:16
      });
    }; 
  };

  onSearch(searchText){
    if(searchText !== this.state.searchText){
      fetch(` search/${searchText}`)
          .then((response)=>{
        return response.json();
      }).then((data)=>{
        this.setData(data);
      });
    };
  };

  setLocation(place){
    this.setState({
      mainMarker : {
        title : place.name,
        lat : place.coordinates.lat,
        long : place.coordinates.long
      },
      zoom : 16,
      place : place ,
    });
  };


  render(){
    return (
      <div className="grid-container">
        <Navigation  
            useAlert={this.useAlert}
            onSearch={this.onSearch}
            setLogged={this.setLogged} 
            isMobileView={this.state.isMobileView} />

        {this.state.isMobileView ? <div className='alert-holder'></div> : ''}

        <MapContainer 
            setLocation={this.setLocation}
            setSearched={this.setSearched} 
            mainMarker={this.state.mainMarker} 
            zoom={this.state.zoom} 
            places={this.state.list} />
            
        <List 
            setLocation={this.setLocation} 
            setSearched={this.setSearched} 
            places={this.state.list} 
            city={this.state.city.name} />

        <div className='logo'><h2>CREPOMETER</h2></div>

        <Info 
            useAlert={this.useAlert} 
            setLocation={this.setLocation}
            setSearched={this.setSearched} 
            isMobileView={this.state.isMobileView} 
            place={this.state.place} 
            cityKey={this.state.city.key} 
            logged={this.state.logged} 
            searched={this.state.searched} 
            loggedUser={this.state.user} />
      </div>
    );
  };
}

export default App;
