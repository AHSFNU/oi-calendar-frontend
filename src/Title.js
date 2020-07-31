import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function Title() {
  return (
    <div className="Title">
      <Header as='h1' textAlign='center'>
        <Icon name='trophy' circular />
        OI Calendar
      </Header>
    </div >
  );
}

export default Title;
