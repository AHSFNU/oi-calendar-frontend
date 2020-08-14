import React from 'react';
import { Table, Message, Icon } from 'semantic-ui-react';
import './ContestSet.css';

const moment = require('moment');

const apiUrl = require('./config.json').apiUrl;

class ContestSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: null,
      oj: [],
      contests: [],
      contestList: []
    };
  }

  async componentDidMount() {
    try {
      const resp = await fetch(apiUrl);
      const data = await resp.json();

      if (data.status === 'OK') {
        let contests = [];

        for (let oj of data.oj) {
          for (let contest of oj.contests) {
            contest.oj = oj;
            contests.push(contest);
          }
        }

        this.setState({
          loaded: true,
          oj: data.oj,
          contests: contests
        });

        this.updateContestList();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  updateContestList() {
    this.setState(({ contests }) => ({
      contestList: contests
        .filter(contest => true)
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    }));
  }

  parseMinutes(minutes) {
    const days = parseInt(minutes / 60 / 24), hours = parseInt(minutes / 60) % 24;
    minutes = minutes % 60;
    return [
      days && `${days} 天`,
      hours && `${hours} 小时`,
      minutes && `${minutes} 分钟`
    ].filter(str => !!str).join(' ');
  }

  render() {
    if (this.state.loaded) {
      return (
        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>OJ</Table.HeaderCell>
              <Table.HeaderCell>Contest Name</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.contestList.map(el => (
              <Table.Row key={`${el.oj.id}-${el.id}`}>
                <Table.Cell>
                  <img className={`oj-icon ${el.oj.icon.variety}`} alt={el.oj.name} src={el.oj.icon.url} />
                  {el.oj.name}
                </Table.Cell>
                <Table.Cell><a href={el.url}>{el.name}</a></Table.Cell>
                <Table.Cell>{moment(el.startTime).format('MM 月 DD 日 HH:mm')}</Table.Cell>
                <Table.Cell>{moment(el.endTime).format('MM 月 DD 日 HH:mm')}</Table.Cell>
                <Table.Cell>{this.parseMinutes(moment(el.endTime).diff(el.startTime, 'm'))}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    } else if (this.state.error) {
      return (
        <Message icon negative>
          <Icon name="remove" />
          <Message.Content>
            <Message.Header>Failed to fetch the data!</Message.Header>
            <p>
              Error: {this.state.error.message} <br />
              Please check <a href={apiUrl}>the API server</a>.
            </p>
          </Message.Content>
        </Message>
      );
    } else {
      return (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Just one second</Message.Header>
            <p>Fetching data from the API server...</p>
          </Message.Content>
        </Message>
      );
    }
  }
}

export default ContestSet;
