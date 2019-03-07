import React, { Component } from 'react';
import {Paper, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      textAlign: 'center'
      //paddingTop: theme.spacing.unit * 14,
    },
    Paper: {
        margin: 'auto',
        'padding-top': theme.spacing.unit * 7,
        'padding-right': theme.spacing.unit * 5,
        'padding-bottom': theme.spacing.unit * 5,
        'padding-left': theme.spacing.unit * 5,
        maxWidth: 400
    },
    Typography: {
        width: '100%'
    },
    form: {
        display: 'contents'
    }
  });

class LoginRegistrationContainer extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        this.props.handleSubmit();
        event.preventDefault();
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Paper className = {classes.Paper} elevation = {4}>
                    <Grid container>
                        <form onSubmit={this.handleSubmit} className= {classes.form}>
                            {this.props.icon}
                            <Typography className={classes.Typography} component="title" variant="h5" gutterBottom>
                                {this.props.title}
                            </Typography>
                            {this.props.textFields}
                            {this.props.buttons}
                        </form>
                        
                    </Grid>
                </Paper>
            </div> 
        );
    }
}

LoginRegistrationContainer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginRegistrationContainer);