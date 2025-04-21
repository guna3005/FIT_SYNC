import React from 'react';
import { Table } from 'antd';
import { ListContainer } from './FoodLogList.styles';

const FoodLogList = ({ logs, foodItems }) => {
  // Build table data by joining logs with food item info
  const dataSource = logs.map(log => {
    const item = foodItems.find(f => f.id === log.food_item_id) || {};
    const calories = item.calories_per_serv * log.quantity;
    return {
      key: log.id,
      date: log.log_date,
      food: item.name,
      quantity: log.quantity,
      calories,
    };
  });

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Food', dataIndex: 'food', key: 'food' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Calories', dataIndex: 'calories', key: 'calories' },
  ];

  return (
    <ListContainer>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </ListContainer>
  );
};

export default FoodLogList;
