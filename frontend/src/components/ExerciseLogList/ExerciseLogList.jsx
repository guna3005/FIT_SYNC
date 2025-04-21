import React from 'react';
import { Table } from 'antd';
import { ListContainer } from './ExerciseLogList.styles';

const ExerciseLogList = ({ logs, exercises }) => {
  const dataSource = logs.map(log => {
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
    { title: 'Date',       dataIndex: 'date',     key: 'date' },
    { title: 'Exercise',   dataIndex: 'exercise', key: 'exercise' },
    { title: 'Set',        dataIndex: 'set',      key: 'set' },
    { title: 'Reps',       dataIndex: 'reps',     key: 'reps' },
    { title: 'Weight (kg)',dataIndex: 'weight',   key: 'weight' },
    { title: 'Volume',     dataIndex: 'volume',   key: 'volume' },
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

export default ExerciseLogList;
