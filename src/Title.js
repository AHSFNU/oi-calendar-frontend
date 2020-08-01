import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function Title() {
  return (
    <div className="Title">
      <Header as='h1' icon textAlign='center'>
        <Icon name='calendar' circular />
        OI Calendar
      </Header>
    </div >
  );
}

export default Title;
