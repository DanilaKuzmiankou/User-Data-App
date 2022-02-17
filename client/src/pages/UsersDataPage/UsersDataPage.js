import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react'
import React, {useEffect, useRef, useState} from "react";
import {CustomBootstrapTable, CustomSpinner} from "../../components/index.components";
import {getAllUsers, postBlockUser, postDeleteUser, postUnblockUser, registerNewUser} from "../../store/UserStore";
import {Button, ButtonGroup, Container, Navbar, OverlayTrigger, Tooltip} from "react-bootstrap";
import "../../styles/App.css"
import {Lock, Trash, Unlock} from "react-bootstrap-icons";

export const UsersDataPage = withAuthenticationRequired(
    () => {
        const usersTable = useRef(null);
        const {user} = useAuth0()
        const {getAccessTokenSilently, loginWithRedirect} = useAuth0()
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(async () => {


            let token = await getAccessTokenSilently()
            try {
                let username = user['https://myapp.example.com/username']
                console.log("username")
                console.log(username)
                await registerNewUser(token, user.email, username)
            } catch (error) {
                console.error('registerNewUser error:', error);
            }

            let usersStorage = await getAllUsers(token)
            setUsers(usersStorage)


            setTimeout(() => {
                setLoading(false);
            }, 100);

        }, [])


        function getSelectedUsersEmail() {
            let selectedUsers = usersTable.current.node.selectionContext.selected
            return selectedUsers.map(id => users.find(user => user.id === id)?.email).filter(n => n)
        }

        function deleteUsers() {
            let mails = getSelectedUsersEmail()
            getAccessTokenSilently()
                .then(token => postDeleteUser(token, mails))
                .then(data => setUsers(data)).then(data => {
                if (mails.find(mail => mail === user.email)) {
                    loginWithRedirect()
                }
            })

        }

        function blockUsers() {
            let mails = getSelectedUsersEmail()
            getAccessTokenSilently()
                .then(token => postBlockUser(token, mails))
                .then(data => setUsers(data)).then(data => {
                if (mails.find(mail => mail === user.email)) {
                    loginWithRedirect()
                }
            })
        }

        function unblockUsers() {
            let mails = getSelectedUsersEmail()
            getAccessTokenSilently()
                .then(token => postUnblockUser(token, mails))
                .then(data => setUsers(data))
        }


        if (loading) {
            return <CustomSpinner/>
        }

        return (
            <Container fluid className="users_data_page_container">
                <Navbar>
                    <ButtonGroup aria-label="ButtonGroup" className="users_data_page_button_group">
                        <OverlayTrigger
                            delay={{show: 250, hide: 400}}
                            placement="right"
                            overlay={<Tooltip id="tooltip-disabled">Block users</Tooltip>}>
                            <Button variant="warning" size="lg" onClick={blockUsers}>
                                <Lock/>
                            </Button>
                        </OverlayTrigger>
                        <span> &nbsp; </span>
                        <OverlayTrigger
                            delay={{show: 250, hide: 400}}
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-disabled">Unblock users</Tooltip>}>
                            <Button variant="success" size="lg" onClick={unblockUsers}>
                                <Unlock/>
                            </Button>
                        </OverlayTrigger>
                        <span> &nbsp; </span>
                        <OverlayTrigger
                            delay={{show: 250, hide: 400}}
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-disabled">Delete users</Tooltip>}>
                            <Button variant="danger" size="lg" onClick={deleteUsers}>
                                <Trash/>
                            </Button>
                        </OverlayTrigger>

                    </ButtonGroup>

                </Navbar>
                <CustomBootstrapTable users={users} ref={usersTable}/>
            </Container>
        )
    },
    {
        returnTo: '/users',
        onRedirecting: () => <CustomSpinner/>
    }
)