import React, { Component } from 'react';

class DynamicGrid extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount = () => {

  };

  render() {
    return (
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 bg-purple-500">1</div>
        <div class="col-span-2 bg-purple-500">2</div>
        <div class="col-span-2 bg-purple-500">3</div>
      </div>
    );
  }
}

export default DynamicGrid;
