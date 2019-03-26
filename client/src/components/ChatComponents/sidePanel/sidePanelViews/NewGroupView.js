
import React, { Component } from 'react';
import SideViewBase from '../SideViewBase'
import UserSearchPanel from '../UserSearchPanel'
import resources from '../../../../resources/default'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { } from '../../../../api'
import {Chip, IconButton, TextField} from '@material-ui/core';
import {ArrowForward} from '@material-ui/icons';

var styles = theme =>({
    input: {
        marginLeft: 8,
        flex: 1,
        width: '100%'
    },
    grow: {
        flexGrow: 1,
    },
    chip: {
        margin: theme.spacing.unit,
    }

});

const {newGroup: newGroupTitle, groupParticipants: groupParticipantsTitle} = resources.titles;
const {groupName: groupNamePlaceHolder} = resources.placeholders;
const {conversations: converstationsView, userSearch: userSearchView} = resources.sidePanelViews;

class NewGroupView extends Component{

    constructor(props){
        super(props);
        this.state = {
            newGroupParticipants: [],
            participantsChosen: false, 
            groupName: {},
            groupIsReady : false
        }
    }

    handleListItemClick = (event, username) => {
        this.setState((state) => {
            let userInParticipantsList = state.newGroupParticipants.find(function(element) {
                return element === username;
              });
            if(!userInParticipantsList){
                return {newGroupParticipants : [...state.newGroupParticipants, username]}
            }
        });
    };


    handleDeleteParticipant = (username) =>{
        this.setState((state) => {
            let userInParticipantsList = state.newGroupParticipants.find(function(element) {
                return element === username;
              });
            if(userInParticipantsList){
                state.newGroupParticipants.splice( state.newGroupParticipants.indexOf(username), 1 );
                return {newGroupParticipants : state.newGroupParticipants}
            }
        });
    }
    
    choseParticipants = () => {
        this.setState({participantsChosen: true});
    }

    createNewGroup = () => {
        //getPrivateConversationWithUser(username);
        this.props.onSwitchView(converstationsView);
    }

    onGroupNameChange = (event) => {
        let regSpace = /\s/g;
        let groupNameValue = event.target.value;
        if(regSpace.test(event.target.value)){
            this.setState({groupName:{text: groupNameValue, error: true}, groupIsReady: false})
        }
        else{
            this.setState({groupName: {text: groupNameValue}, groupIsReady: groupNameValue.length > 0 });
        }
    }

    render(){
        
        const {onSwitchView, classes} = this.props;
        const {newGroupParticipants, participantsChosen, groupName, groupIsReady} = this.state;

        const userSearchPanelProps = {
            handleListItemClick: this.handleListItemClick,
            excludeUsers: newGroupParticipants
        }

        return(
            participantsChosen ? 
                <SideViewBase onSwitchView = {onSwitchView} text={newGroupTitle} 
                content = {
                    <>
                        <TextField
                        required
                        label={groupNamePlaceHolder}
                        className={classes.textField}
                        color = "primary"
                        margin="normal"
                        onChange = {this.onGroupNameChange}
                        error= {groupName.error} 
                        />
                        {groupIsReady && 
                            <IconButton color="inherit" onClick={(e) => this.createNewGroup()}>
                                <ArrowForward color= "primary"/>
                            </IconButton>}
                    </>
                    
                        
                }/> :
                <SideViewBase onSwitchView = {onSwitchView} text={groupParticipantsTitle}
                    additionalInfo = {
                        newGroupParticipants.map((username) => {
                                return <Chip
                                        key = {username}
                                        label= {username}
                                        onDelete={event => this.handleDeleteParticipant(username)}
                                        className={classes.chip}
                                        />
                                    }
                                )
                            }
                    content = { 
                        <UserSearchPanel {...userSearchPanelProps}/>
                    }
                    footer = {
                        newGroupParticipants.length > 0 &&
                            <IconButton color="inherit" onClick={(e) => this.choseParticipants()}>
                                <ArrowForward color= "primary"/>
                            </IconButton>}/>
        );
    }
}

NewGroupView.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewGroupView);



