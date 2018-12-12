import React from 'react';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GoogleLogin } from 'react-google-login'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
class Dashboard extends React.Component {
    state = {
        access_token: '',
        emails: []
    };
    responseGoogle = (response) => {
        // console.log(response.accessToken);
        this.setState({
            access_token: response.accessToken
        })
        this.props.SET_ACCESS_TYPE(this.state.access_token)
    }

    fetchEmails = () => {
        this.setState({
            emails: []
        })
        if (this.props.access_code) {
            // console.log(this.state.access_token)
            axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_code
                }
            })

                .then((response) => {
                    // console.log(response.data.messages)
                    response.data.messages.forEach(element => {
                        // console.log(element.id)
                        axios.get('https://www.googleapis.com/gmail/v1/users/me/messages/' + element.id, {
                            headers: {
                                'Authorization': 'Bearer ' + this.props.access_code
                            }
                        })
                            .then((response) => {
                                // console.log("Hello")
                                // console.log(response)
                                // console.log(response.data.snippet)

                                this.setState((prevState) => {

                                    return {
                                        emails: [...this.state.emails, response.data.snippet]
                                    }


                                })
                                // this.state.emails.push(response.data.snippet)
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

    ListItemLink = (props) => {
        return <ListItem button component="a" {...props} />;
    }


    render() {
        const { classes } = this.props;

        // console.log(this.state.emails)
        return (
            <div>

                <h1>Inbox</h1>
                <Typography component="div" >
                    {this.props.access_code ? '' : <GoogleLogin
                        clientId="721702072914-abh4u41sdpcadfu7croiljnid913ct6u.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />}

                </Typography>
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.access_code ? <Button onClick={this.fetchEmails} variant="contained" color="primary" className={classes.button}>Fetch Emails</Button> : ''}
                    {this.props.access_code ?
                        this.state.emails.length > 0 ?
                            this.state.emails.map((el) => {
                                return (

                                    <List component="nav" key={Math.random()}>
                                        <ListItem button>
                                            <ListItemText primary={el} />
                                        </ListItem>
                                    </List>
                                )
                            }) : 'No Emails Found'
                        : 'Please Authorize the client'

                    }


                </Typography>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        access_code: state.access_code
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        SET_ACCESS_TYPE: (access_token) => dispatch({
            type: 'SET_ACCESS_CODE',
            accessToken: access_token
        })
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))