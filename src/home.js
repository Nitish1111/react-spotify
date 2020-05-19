import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import hash from "./hash";
import { Card } from '@uprise/card';
import { Container, ContainerFluid, Row, Col } from '@uprise/grid';
import { Button, TaskButton } from '@uprise/button';
import { primary, backgrounds, extended } from '@uprise/colors';
import Overview from './overview';
import Playlist from "./playlist";
import FeaturedArtists from './featuredArtists';



export class Home extends Component {
    state = {
        activeTabs: '',
        config: {
            "clientId": "3ef1d13e43a34f449452c1fc45e8e9a5",
            "clientSecret": "e20cfe570f7f49d5ba0704e9bc26d464",
            "redirectUri": "http://localhost:3000/redirect",
            "accessToken": ""
        },

    };


    componentDidMount() {

        console.log(this.props);
        let _token = hash.access_token;
        console.log(_token);
        if (!_token) {
            window.location = "/";
        }
        let tempConfig = this.state.config;
        tempConfig.accessToken = _token;
        this.setState({ config: tempConfig });
        localStorage.accessToken = _token;
        // debugger;
    }


    switchTabs = (link) => {

        this.setState({ activeTabs: link });
        console.log(this.state.activeTabs)
    }

    render() {


        return (
            <ContainerFluid style={{height: '700px'}}>
                <ContainerFluid style={containerStyle}>
                    <Container>
                        <Button title="Overview" style={btns} onClick={this.switchTabs.bind(this, 'overview')} />
                        <Button title="Playlists" style={btns} onClick={this.switchTabs.bind(this, 'playlist')} />
                        <Button title="Featured" style={btns1} onClick={this.switchTabs.bind(this, 'featured')} />
                    </Container>

                </ContainerFluid>
                {(this.state.activeTabs === 'overview') && (<Overview config={this.state.config} />)}
                {(this.state.activeTabs === 'playlist') && (<Playlist config={this.state.config} />)}
                {(this.state.activeTabs === 'featured') && (<FeaturedArtists config={this.state.config} />)}

                
                

            </ContainerFluid>

        )
    }
}

const btns = {
    color: extended.charcoal.one,
    width: '10%',
    backgroundColor: backgrounds.white,
    margin: '0px 10px',
    float: 'left',
    border: 'white',
}
const btns1 = {
    color: extended.charcoal.one,
    width: '10%',
    backgroundColor: backgrounds.white,
    margin: '0px auto 0px 10px',
    float: 'left',
    border: 'white',
}
const containerStyle = {
    marginTop: '50px',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: backgrounds.white,
    width: '100%',
    display: 'inline-block'

}

export default Home
