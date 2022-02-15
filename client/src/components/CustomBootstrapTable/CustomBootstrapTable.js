import BootstrapTable from 'react-bootstrap-table-next';
import React from 'react';
import {Container} from "react-bootstrap";

export class CustomBootstrapTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: this.props.users};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.users !== prevProps.users) {
            this.setState({users: this.props.users})
        }
    }

    handleGetSelectedData = () => {
        return (this.node.selectionContext.selected);
    }

    render() {

        const columns = [{
            dataField: 'id',
            text: 'ID'
        }, {
            dataField: 'email',
            text: 'Email'

        }, {
            dataField: 'name',
            text: 'Name'
        }, {
            dataField: 'status',
            text: 'Status'
        }, {
            dataField: 'createdAt',
            text: 'Registration date'
        }, {
            dataField: 'updatedAt',
            text: 'Last activity date'
        }];


        if (!this.state.users) {
            throw Error('users not found')
        }

        return (
            <Container fluid>
                <BootstrapTable
                    bordered={false}
                    ref={n => this.node = n}
                    keyField='id'
                    data={this.state.users}
                    columns={columns}
                    selectRow={{
                        mode: 'checkbox',
                        clickToSelect: true,
                        style: {backgroundColor: '#c8e6c9'}
                    }}
                />
            </Container>
        )

    }
}
