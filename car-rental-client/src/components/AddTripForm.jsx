import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Form, DatePicker, Select, Input, Button, Row, Col, } from "antd";
// const { Option } = Select;


const { RangePicker } = DatePicker;


export default class AddTripForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            validated: false,
            setValidated: false
        };
      }
    
    render(){
        // const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{ type: "array", required: true, message: "Please select time!" }]
          };
        return(
             <div>

<Row className="title-justify-center">
  </Row>
  <h1 align = "center" >Add Trip Form</h1>  
 
<Row type="flex" justify="center" align="middle">
          {" "}
  <Form className="booking-form" onSubmit={this.handleSubmit}>
    <Form.Item label="Start Location" required>
      {
    //       getFieldDecorator("startLocation", {
    //     rules: [
    //       {
    //         required: true,
    //         message: "Please input your Start Location!"
    //       }
    //     ]
    //   })
    (<Input />)}
    </Form.Item>
      
    <Form.Item label="End Location" required>
      {
    //       getFieldDecorator("endLocation", {
    //     rules: [
    //       {
    //         required: true,
    //         message: "Please input your End Location!"
    //       }
    //     ]
    //   })
      (<Input />)}
    </Form.Item>
    <Form.Item label="Seats Offered" required>
      {
    //       getFieldDecorator("seatsOffered", {
    //     rules: [
    //       {
    //         required: true,
    //         message: "Please input your license number!"
    //       }
    //     ]
    //   })
      (<Input />)}
    </Form.Item>
    <Form.Item label="Price" required>
      {
    //       getFieldDecorator("price", {
    //     rules: [
    //       {
    //         required: true
    //       }
    //     ]
    //   })
      (<Input />)}
    </Form.Item>
    <Form.Item label="Trip Date and Time" required>
      {
        //   getFieldDecorator("range-picker", rangeConfig)
          (<RangePicker showTime />)}
          </Form.Item>
    
    <Form.Item className="rent-car-submit">
        {" "}
      <Button variant="primary" htmlType="submit">
             Submit   {" "}
      </Button>
    </Form.Item>
  </Form>
</Row>
      {" "}
</div>
);
    }
}
