import React, { FC } from 'react';
import { NetworkCanvas, InputNode, InputLink } from '@nivo/network';

interface IFriendshipChartProps {
  data: {
    nodes: Array<InputNode>;
    links: Array<InputLink>;
  };
}

const FriendshipChart: FC<IFriendshipChartProps> = ({ data }) => (
  <NetworkCanvas
    height={500}
    width={500}
    nodes={data.nodes}
    links={data.links}
    nodeColor="rgb(97, 205, 187)"
  />
);

export default FriendshipChart;
