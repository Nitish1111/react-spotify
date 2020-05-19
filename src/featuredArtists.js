import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import { Container, ContainerFluid, Row, Col } from '@uprise/grid';

export class FeaturedArtists extends Component {

    state = {
        config: {

        },
        artists: []

    }
    componentDidMount() {
        let tempConfig = this.props.config;
        tempConfig.accessToken = localStorage.accessToken;
        this.setState({ config: tempConfig });
        this.getArtists(tempConfig);

    }
    getArtists(config) {
        SpotifyGraphQLClient(config).query(`
        {
            
            user (id: "ChilledCow") {   
                playlists {
                tracks{
                    track{
                    artists {
                        name
                    }
                    }
                }                
                }
            } 
          }             
    `).then(executionResult => {
            if (executionResult.errors) {
                console.log('error');
                console.error(JSON.stringify(executionResult.errors));
            } else {
                console.log('success');
                console.log(JSON.stringify(executionResult.data));
                this.extractArtistNames(executionResult.data);
            }
        });
    }
    extractArtistNames(data){
        let artistsArr = [];
        let featuredArtistsList = [];
        data.user.playlists.forEach(ele => (ele.tracks.forEach(track=> track.track.artists.forEach(artists => artistsArr.push(artists.name) ))))
        do{
            let item =  artistsArr[Math.floor(Math.random() * artistsArr.length)];
            if(!featuredArtistsList.includes(item)){
                featuredArtistsList.push(item);
            }
        }while(featuredArtistsList.length<10)
        
        this.setState({artists:featuredArtistsList});
        
    }


    render() {
         var createArtistListElement = this.state.artists.map(ele=>{
             return <div style={listStyle}>{ele}</div>
         })
        return (
            <Col style={{ width: "150px", marginLeft: '26%' }}>
                {createArtistListElement}
            </Col>

        )
    }
}
const listStyle={
    color: 'rgb(109, 108, 121)',
    backgroundColor: 'rgb(255, 255, 255)',
    width:'150px',
    height:'40px',
    fonSize:'16px',
    textAlign:'center',
    margin:'5px',
    padding : '5px'

}
export default FeaturedArtists
