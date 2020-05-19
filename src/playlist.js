import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import { Container, ContainerFluid, Row, Col } from '@uprise/grid';
import { Button, TaskButton } from '@uprise/button';
import { primary, backgrounds, extended } from '@uprise/colors';
import { Card } from '@uprise/card';
import { spacing } from '@uprise/spacing';
import { ProgressiveImage } from '@uprise/image';
import { Bold, Medium } from '@uprise/text'
import PlaylistCard from './playlistCard';
export class Playlist extends Component {
    state = {
        config: {

        },
        playlists: [],
        selectedIndex: 0

    }
    decrementIndex = () => {
        this.setState({ selectedIndex: this.state.selectedIndex - 1 })
    }
    incrementIndex = () => {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 })
    }
    componentDidMount() {

        // if (!localStorage.accessToken) {
        //     window.location = "/";
        // }
        let tempConfig = this.props.config;
        tempConfig.accessToken = localStorage.accessToken;
        this.setState({ config: tempConfig })

        this.getPlaylists(tempConfig);

    }

    getPlaylists(config) {
        SpotifyGraphQLClient(config).query(`
        {
            user (id: "ChilledCow") {
              playlists {
                name
                images {
                  url
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
                this.setState({ playlists: executionResult.data.user.playlists });
            }
        });
    }
    render() {
        return (
            <Card style={{ marginTop: '50px',
                backgroundColor: backgrounds.white,
                padding: spacing.s8
            }}>
                <Row>

                <Button title="<" style={{ borderRadius: '50%', height: '50px', width: '50px', margin: 'auto', display: 'inline-block' }} onClick={this.decrementIndex} disabled={this.state.selectedIndex===0 }/>
                {(this.state.playlists.length > 0) &&
                    (<PlaylistCard
                        imageUrl={this.state.playlists[this.state.selectedIndex].images[0].url}
                        playlistname={this.state.playlists[this.state.selectedIndex].name}
                    />)}

                <Button title=">" style={{ borderRadius: '50%', height: '50px', width: '50px', margin: 'auto', display: 'inline-block' }} onClick={this.incrementIndex}  disabled={this.state.selectedIndex===this.state.playlists.length-1 }/>
                </Row>
            </Card>
        )
    }
}

export default Playlist
