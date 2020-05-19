import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import { Container, ContainerFluid, Row, Col } from '@uprise/grid';
import { Button, TaskButton } from '@uprise/button';
import { primary, backgrounds, extended } from '@uprise/colors';
import { Card } from '@uprise/card';
import { spacing } from '@uprise/spacing';
import { ProgressiveImage } from '@uprise/image';
import { Bold, Medium } from '@uprise/text'

export class PlaylistCard extends Component {
    state = {
        playlistItem: {}
    }
    
    render() {
        return (
            <Card >

                {(this.state.playlistItem) &&
                    (<Container style={{ height: '300px', width: '500px' }}>
                        <Col>
                            <ProgressiveImage borderRadius='10px' style={{ height: '250px', width: '250px', margin: 'auto' }} src={this.props.imageUrl}></ProgressiveImage>
                            <Container>
                                <Medium>{this.props.playlistname}</Medium>
                            </Container>

                        </Col>
                    </Container>)}
            </Card>
        )
    }
}

export default PlaylistCard
