import React from 'react';
import { Form, Select, InputNumber, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { FormContainer } from './FoodLogForm.styles';

const { Option } = Select;

const FoodLogForm = ({ foodItems, onAdd }) => {
  const [form] = Form.useForm();

  const onFinish = ({ foodItemId, quantity, logDate }) => {
    onAdd(foodItemId, quantity, logDate.format('YYYY-MM-DD'));
    form.resetFields();
  };

  return (
    <FormContainer>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        initialValues={{ logDate: dayjs() }}
      >
        <Form.Item
          name="foodItemId"
          rules={[{ required: true, message: 'Select a food item' }]}
        >
          <Select placeholder="Select food" style={{ width: 200 }}>
            {foodItems.map(item => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="quantity"
          rules={[{ required: true, message: 'Enter quantity' }]}
        >
          <InputNumber
            min={0.1}
            step={0.1}
            placeholder="Qty (servings)"
          />
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

export default FoodLogForm;
