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
class Drafts extends Component {
    state = {
        drafts: []
    }

    fetchDrafts = () => {
        console.log("Hello")
        this.setState({
            drafts: []
        })
        if (this.props.access_token) {
            console.log(this.props.access_token)
            axios.get('https://www.googleapis.com/gmail/v1/users/me/drafts', {
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_token
                }
            })

                .then((response) => {
                    response.data.drafts.forEach(element => {
                        // console.log(element.id)
                        axios.get('https://www.googleapis.com/gmail/v1/users/me/drafts/' + element.id, {
                            headers: {
                                'Authorization': 'Bearer ' + this.props.access_token
                            }
                        })
                            .then((response) => {

                                this.setState((prevState) => {

                                    return {
                                        drafts: [...this.state.drafts, response.data.message.snippet]
                                    }


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
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.access_token ? <Button color="primary" onClick={this.fetchDrafts}>Fetch Drafts</Button> : ''}
                    {this.props.access_token ?
                        this.state.drafts.length > 0 ?
                            this.state.drafts.map((el) => {
                                return (

                                    <List component="nav" key={Math.random()}>
                                        <ListItem button>
                                            <ListItemText primary={el} />
                                        </ListItem>
                                    </List>
                                )
                            }) : 'No Drafts Found'
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


export default connect(mapStateToProps, null)(withStyles(styles)(Drafts))