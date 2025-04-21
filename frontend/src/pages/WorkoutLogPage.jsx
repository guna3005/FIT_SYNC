import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Table, message } from 'antd';
import ExerciseLogForm from '../components/ExerciseLogForm/ExerciseLogForm';
import { getExercises } from '../api/exerciseApi';
import { getUserExerciseLogs, createUserExerciseLog } from '../api/userLogsApi';

const { Title } = Typography;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 24px auto;
`;

const WorkoutLogPage = () => {
  const [exercises, setExercises] = useState([]);
  const [logs, setLogs] = useState([]);

  const fetchData = async () => {
    try {
      const exs = await getExercises();
      setExercises(exs);
      const userLogs = await getUserExerciseLogs(1);
      setLogs(userLogs);
    } catch (err) {
      console.error(err);
      message.error('Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLog = async (exerciseId, logDate, setNumber, reps, weightKg) => {
    try {
      await createUserExerciseLog(1, exerciseId, logDate, setNumber, reps, weightKg);
      message.success('Log added');
      fetchData();
    } catch (err) {
      console.error(err);
      message.error('Failed to add log');
    }
  };

  const dataSource = [...logs]
  .sort((a, b) => new Date(b.log_date) - new Date(a.log_date)).map(log => {
    const ex = exercises.find(e => e.id === log.exercise_id) || {};
    const volume = log.reps * log.weight_kg;
    return {
      key: log.id,
      date: log.log_date,
      exercise: ex.name,
      set: log.set_number,
      reps: log.reps,
      weight: log.weight_kg,
      volume,
    };
  });

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Exercise', dataIndex: 'exercise', key: 'exercise' },
    { title: 'Set', dataIndex: 'set', key: 'set' },
    { title: 'Reps', dataIndex: 'reps', key: 'reps' },
    { title: 'Weight (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  ];

  return (
    <PageContainer>
      <Title level={2}>Workout Log</Title>
      <ExerciseLogForm exercises={exercises} onAdd={handleAddLog} />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </PageContainer>
  );
};

export default WorkoutLogPage;
