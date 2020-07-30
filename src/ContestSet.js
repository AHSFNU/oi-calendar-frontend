import React from 'react';
import { Table } from 'semantic-ui-react';
const moment = require('moment');

class ContestSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contests: []
    };
  }

  async componentDidMount() {
    const resp = await fetch('http://hikari.camber.moe:10086/');
    const result = await resp.json();
    if (result.status === 'OK') {
      this.setState({
        contests: result.contests
      });
    } else {
      // TODO: deal with errors
    }
  }

  render() {
    let { contests } = this.state;

    let tableBody = contests.map(el => (
      <Table.Row>
        <Table.Cell>{el.oj}</Table.Cell>
        <Table.Cell>{el.name}</Table.Cell>
        <Table.Cell>{moment(el.startTime).format('YYYY 年 MM 月 DD 日 HH:mm')}</Table.Cell>
        <Table.Cell>{moment(el.endTime).format('YYYY 年 MM 月 DD 日 HH:mm')}</Table.Cell>
      </Table.Row>
    ));

    return (
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>OJ</Table.HeaderCell>
            <Table.HeaderCell>Contest Name</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
  
        <Table.Body>
          {tableBody}
        </Table.Body>
      </Table>
    );
  }
}

export default ContestSet;
