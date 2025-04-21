import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ChartWrapper, ChartTitle } from './Charts.styles';

const Charts = ({ data, xKey, yKey, name, type }) => (
  <ChartWrapper>
    <ChartTitle>{name}</ChartTitle>
    <ResponsiveContainer width="100%" height={300}>
      {type === 'bar' ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} name={name} />
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yKey} name={name} />
        </LineChart>
      )}
    </ResponsiveContainer>
  </ChartWrapper>
);

Charts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['line', 'bar'])
};

Charts.defaultProps = {
  type: 'line'
};

export default Charts;
