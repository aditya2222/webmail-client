import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
class Spam extends Component {
    state = {
        spams: []
    }

    fetchSpams = () => {
        console.log("Hello")
        this.setState({
            spams: []
        })
        if (this.props.access_token) {
            console.log(this.props.access_token)
            axios.get('https://www.googleapis.com/gmail/v1/users/me/threads', {
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_token
                },
                params: {
                    q: 'is:spam'
                }
            })

                .then((response) => {
                    console.log(response.data.threads)
                    response.data.threads.forEach(element => {
                        // console.log(element.id)
                        axios.get('https://www.googleapis.com/gmail/v1/users/me/threads/' + element.id, {
                            headers: {
                                'Authorization': 'Bearer ' + this.props.access_token
                            }
                        })
                            .then((response) => {
                                // console.log(response.data.messages.snippet)
                                // console.log(response)
                                response.data.messages.forEach((el) => {
                                    this.setState((prevState) => {

                                        console.log(el.snippet)
                                        return {
                                            spams: [...this.state.spams, el.snippet]
                                        }

                                    })
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    });

                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }

    render() {


        const { classes } = this.props;
        return (

            <div>
                <h1>Spam</h1>
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.access_token ? <Button color="primary" onClick={this.fetchSpams}>Fetch Spams</Button> : ''}
                    {this.props.access_token ?
                        this.state.spams.length > 0 ?
                            this.state.spams.map((el) => {
                                return (
                                    <List component="nav" key={Math.random()}>
                                        <ListItem button>
                                            <ListItemText primary={el} />
                                        </ListItem>
                                    </List>
                                )
                            }) : 'No Spam messages Found'
                        : 'Please Authorize the client from the inbox route'
                    }

                </Typography>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        access_token: state.access_code
    }
};


export default connect(mapStateToProps, null)(withStyles(styles)(Spam))