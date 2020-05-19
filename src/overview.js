import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import { Column, Container, ContainerFluid, Row } from '@uprise/grid';
import { Button, TaskButton } from '@uprise/button';
import { primary, backgrounds, extended } from '@uprise/colors';
import { Card } from '@uprise/card';
import { spacing } from '@uprise/spacing';
import { ProgressiveImage } from '@uprise/image';
import { Bold } from '@uprise/text'
export class Overview extends Component {
    state = {
        config: {

        },
        display_name: '',
        images: {
            height: '',
            url: '',
            width: '',
        }

    }
    componentDidMount() {

        
        let tempConfig = this.props.config;
        tempConfig.accessToken = localStorage.accessToken;
        this.setState({ config: tempConfig })

        this.getUserDetails(tempConfig);

    }

    getUserDetails(config) {
        SpotifyGraphQLClient(config).query(`
        {
          user (id: "ChilledCow") {
            display_name
            images {
              height
              url
              width
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
                this.setState({ display_name: executionResult.data.user.display_name });
                this.setState({ images: executionResult.data.user.images[0] });
            }
        });
    }
    render() {
        return (
            <Card style={{ marginTop: '50px',
                backgroundColor: backgrounds.white,
                padding: spacing.s8
            }}>
                <Container style={{  height: '300px' }}>
                    <ProgressiveImage borderRadius='10px' style={{ height: '300px' }} src={this.state.images.url}></ProgressiveImage>
                    <Container style={{  height: '300px' }}>
                        <h1>{this.state.display_name}</h1>
                    </Container>
                </Container>
            </Card>
        )
    }
}

export default Overview
