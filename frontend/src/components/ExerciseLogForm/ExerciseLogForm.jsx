import React from 'react';
import { Form, Select, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { FormContainer } from './ExerciseLogForm.styles';

const { Option } = Select;

const ExerciseLogForm = ({ exercises, onAdd }) => {
  const [form] = Form.useForm();

  const onFinish = ({ exerciseId, setNumber, reps, weight, logDate }) => {
    onAdd(exerciseId, logDate.format('YYYY-MM-DD'), setNumber, reps, weight);
    form.resetFields();
    form.setFieldsValue({ logDate: dayjs(), setNumber: 1, reps: 1, weight: 0 });
  };

  return (
    <FormContainer>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          logDate: dayjs(),
          setNumber: 1,
          reps: 1,
          weight: 0,
        }}
      >
        <Form.Item
          name="exerciseId"
          rules={[{ required: true, message: 'Select an exercise' }]}
        >
          <Select placeholder="Select exercise" style={{ width: 200 }}>
            {exercises.map(ex => (
              <Option key={ex.id} value={ex.id}>
                {ex.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="setNumber"
          rules={[{ required: true, message: 'Enter set number' }]}
        >
          <InputNumber min={1} placeholder="Set #" />
        </Form.Item>

        <Form.Item
          name="reps"
          rules={[{ required: true, message: 'Enter reps' }]}
        >
          <InputNumber min={1} placeholder="Reps" />
        </Form.Item>

        <Form.Item
          name="weight"
          rules={[{ required: true, message: 'Enter weight' }]}
        >
          <InputNumber min={0} step={0.5} placeholder="Weight (kg)" />
        </Form.Item>

        <Form.Item
          name="logDate"
          rules={[{ required: true, message: 'Select date' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default ExerciseLogForm;
