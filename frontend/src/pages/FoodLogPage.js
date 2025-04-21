import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Table, message } from 'antd';
import FoodLogForm from '../components/FoodLogForm/FoodLogForm';
import { getFoodItems } from '../api/foodApi';
import { getUserFoodLogs, createUserFoodLog } from '../api/userLogsApi';

const { Title } = Typography;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 24px auto;
`;

const FoodLogPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [logs, setLogs] = useState([]);

  const fetchData = async () => {
    try {
      const items = await getFoodItems();
      setFoodItems(items);
      const userLogs = await getUserFoodLogs(1);
      setLogs(userLogs);
    } catch (err) {
      console.error(err);
      message.error('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLog = async (foodItemId, quantity, logDate) => {
    try {
      await createUserFoodLog(1, foodItemId, quantity, logDate);
      message.success('Log added');
      fetchData();
    } catch (err) {
      console.error(err);
      message.error('Failed to add log');
    }
  };

  // Build table data by joining logs with food item info
  const dataSource = [...logs]
  .sort((a, b) => new Date(b.log_date) - new Date(a.log_date)).map(log => {
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
    <PageContainer>
      <Title level={2}>Food Log</Title>
      <FoodLogForm foodItems={foodItems} onAdd={handleAddLog} />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </PageContainer>
  );
};

export default FoodLogPage;
