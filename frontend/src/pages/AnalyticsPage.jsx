// src/pages/AnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Form,
  InputNumber,
  Button,
  Row,
  Col,
  Statistic,
  message
} from 'antd';
import dayjs from 'dayjs';
import {
  getUserFoodLogs,
  getUserExerciseLogs
} from '../api/userLogsApi';
import { getFoodItems } from '../api/foodApi';
import { getExercises } from '../api/exerciseApi';
import Charts from '../components/Charts/Charts';

const { Title } = Typography;
const PageContainer = styled.div`
  max-width: 1000px;
  margin: 24px auto;
`;

const AnalyticsPage = () => {
  const [calorieData, setCalorieData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  // Profile inputs & results
  const [bmiValue, setBmiValue] = useState(null);
  const [rmrValue, setRmrValue] = useState(null);

  // Fetch logs & compute raw daily totals
  const fetchAndCompute = async () => {
    try {
      const [foodLogs, exerciseLogs, foodItems, exercises] =
        await Promise.all([
          getUserFoodLogs(1),
          getUserExerciseLogs(1),
          getFoodItems(),
          getExercises(),
        ]);

      // --- Calories per day ---
      const caloriesMap = {};
      foodLogs.forEach(({ food_item_id, quantity, log_date }) => {
        const item = foodItems.find(f => f.id === food_item_id) || {};
        const cals = (item.calories_per_serv || 0) * quantity;
        const date = dayjs(log_date).format('YYYY-MM-DD');
        caloriesMap[date] = (caloriesMap[date] || 0) + cals;
      });
      const calorieArray = Object.entries(caloriesMap)
        .map(([date, calories]) => ({ date, calories }))
        .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
      setCalorieData(calorieArray);

      // --- Volume per day ---
      const volumeMap = {};
      exerciseLogs.forEach(
        ({ reps, weight_kg, log_date }) => {
          const date = dayjs(log_date).format('YYYY-MM-DD');
          const vol = reps * weight_kg;
          volumeMap[date] = (volumeMap[date] || 0) + vol;
        }
      );
      const volumeArray = Object.entries(volumeMap)
        .map(([date, volume]) => ({ date, volume }))
        .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
      setVolumeData(volumeArray);
    } catch (err) {
      console.error(err);
      message.error('Failed to load analytics');
    }
  };

  useEffect(() => {
    fetchAndCompute();
  }, []);

  // 7‑day moving average helper
  const movingAverage = (data, key, window = 7) =>
    data.map((d, idx, arr) => {
      const start = Math.max(0, idx - window + 1);
      const slice = arr.slice(start, idx + 1);
      const sum = slice.reduce((sum, x) => sum + (x[key] || 0), 0);
      return { date: d.date, value: sum / slice.length };
    });

  // Profile form handler
  const onProfileFinish = ({ height, weight, bodyFat }) => {
    const bmi = weight / ((height / 100) ** 2);
    setBmiValue(Number(bmi.toFixed(1)));

    const leanMass = weight * (1 - bodyFat / 100);
    const rmr = 370 + 21.6 * leanMass;
    setRmrValue(Math.round(rmr));
  };

  // Prepare moving‑avg data
  const calorieAvg7 = movingAverage(calorieData, 'calories');
  const volumeAvg7 = movingAverage(volumeData, 'volume');

  return (
    <PageContainer>
      <Title level={2}>Analytics</Title>

      {/* Profile → BMI & RMR */}
      <Form
        layout="inline"
        onFinish={onProfileFinish}
        style={{ marginBottom: 24, background: '#fff', padding: 16, borderRadius: 4 }}
      >
        <Form.Item
          name="height"
          label="Height (cm)"
          rules={[{ required: true }]}
        >
          <InputNumber min={100} max={250} />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Weight (kg)"
          rules={[{ required: true }]}
        >
          <InputNumber min={30} max={200} />
        </Form.Item>
        <Form.Item
          name="bodyFat"
          label="Body Fat %"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
        </Form.Item>
      </Form>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Statistic title="BMI" value={bmiValue} precision={1} />
        </Col>
        <Col span={12}>
          <Statistic title="RMR (kcal/day)" value={rmrValue} />
        </Col>
      </Row>

      {/* Raw daily metrics */}
      <Charts
        data={calorieData}
        xKey="date"
        yKey="calories"
        name="Calories Consumed"
        type="line"
      />
      <Charts
        data={volumeData}
        xKey="date"
        yKey="volume"
        name="Workout Volume"
        type="bar"
      />

      {/* 7‑Day Moving Averages */}
      <Charts
        data={calorieAvg7}
        xKey="date"
        yKey="value"
        name="7‑Day Avg Calories"
        type="line"
      />
      <Charts
        data={volumeAvg7}
        xKey="date"
        yKey="value"
        name="7‑Day Avg Volume"
        type="line"
      />
    </PageContainer>
  );
};

export default AnalyticsPage;
