import React from 'react';
import { Table } from 'semantic-ui-react';
const moment = require('moment');

const apiUrl = require('./config.json').apiUrl;

class ContestSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contests: []
    };
  }

  async componentDidMount() {
    const resp = await fetch(apiUrl);
    const result = await resp.json();
    if (result.status === 'OK') {
      this.setState({ contests: result.contests });
    } else {
      // TODO: deal with errors
    }
  }

  parseMinutes(minutes) {
    const hours = parseInt(minutes / 60);
    return minutes % 60 === 0 ? `${hours} 小时` : `${hours} 小时 ${minutes - hours * 60} 分钟`;
  }

  render() {
    return (
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>OJ</Table.HeaderCell>
            <Table.HeaderCell>Contest Name</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
            <Table.HeaderCell>Last Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.contests.map(el => (
            <Table.Row>
              <Table.Cell>{el.oj}</Table.Cell>
              <Table.Cell><a href={el.url}>{el.name}</a></Table.Cell>
              <Table.Cell>{moment(el.startTime).format('MM 月 DD 日 HH:mm')}</Table.Cell>
              <Table.Cell>{moment(el.endTime).format('MM 月 DD 日 HH:mm')}</Table.Cell>
              <Table.Cell>{this.parseMinutes(moment(el.endTime).diff(el.startTime, 'm'))}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default ContestSet;
