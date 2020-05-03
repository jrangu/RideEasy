import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Form, DatePicker, Select, Input, Button, Row, Col, Upload} from "antd";
//import { UploadOutlined } from '@ant-design/icons';
// const { Option } = Select;
import config from "../../src/config";
import axios from "axios";
import { Auth } from "aws-amplify";
import Navbar from "./Navbar";


const { RangePicker } = DatePicker;


export default class AddTripForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      validated: false,
      setValidated: false,
      fileSelected:''
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) {
        console.log('Error in add trip form ', err);
      } else {
        console.log('Ready to Post/Put user record:-', fieldsValue);
        const rangeValue = fieldsValue["startDateTime"];
        const values = {
          ...fieldsValue,
          startDateTime: rangeValue.format("YYYY-MM-DD hh:mm:ss"),

        };
        console.log('startDateTime:-', values.startDateTime);
        this.addTrip(values);
      }
    });

  };

  addTrip(values) {
    var newTrip = new FormData();
    newTrip.append("startLocation", values.startLocation);
    newTrip.append("endLocation", values.endLocation);
    newTrip.append("seatsOffered", values.seatsOffered);
    newTrip.append("price", values.price);
    newTrip.append("startDateTime", values.startDateTime);
    newTrip.append("file",this.state.fileSelected);
    console.log("user email"+localStorage.getItem("Email"));
    newTrip.append("email",localStorage.getItem("Email"));
    axios
      .post(config.BackendUrl + "addTrip", newTrip)
      .then(function (response) {
        console.log("response", response);
        return response;
      })
      .then(data => {
        console.log(data);
        alert(data.data);
      })
      .catch(function (error) {
        console.log("Error " + JSON.stringify(error));
      });

  };
  componentDidMount() {
    console.log("componentDidMount");
    //this.reloadForm();
  }

  fileUploaded=(e)=>{
    console.log("File uploaded" + e);
    var file = e.target.files[0];
    console.log("File upload image" + file);
    this.setState({
      fileSelected: file
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const rangeConfig = {
    //   rules: [{ type: "array", required: true, message: "Please select trip date time!" }]
    // };

    return (
      <div>
         <Navbar />
        <Row className="title-justify-center">
        </Row>
        <h1 align="center" >Add Trip Form</h1>

        <Row type="flex" justify="center" align="middle">

          <Form className="booking-form" onSubmit={this.handleSubmit}>

            <Form.Item label="Start Location">
              {getFieldDecorator('startLocation', {
                rules: [{ required: true, message: 'Please input your start location!', whitespace: true }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="End Location">
              {getFieldDecorator('endLocation', {
                rules: [{ required: true, message: 'Please input your end location!', whitespace: true }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Seats Offered">
              {getFieldDecorator('seatsOffered', {
                rules: [{ required: true, message: 'Please enter your seats offered', whitespace: true }],
              })
                (<Input />)}
            </Form.Item>
            <Form.Item label="Price" name="price" >
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please enter your price per trip', whitespace: true }],
              })

                (<Input label="Price" />)}
            </Form.Item>

            <Form.Item label="Trip Date and Time">
              {getFieldDecorator('startDateTime', {
                rules: [{ required: true, message: "Please select trip date time!" }]
              })

                (<DatePicker showTime />)}
              {/* { <DatePicker showTime 
          // onChange={onChange}
          //  onOk={onOk} 
           /> } */}

            </Form.Item>
            <Form.Item label="Upload your car photo" name="image" >
              {getFieldDecorator('file', {
                rules: [{ required: true, message: 'Please upload car photo', whitespace: true }],
              })

                (
                <input
                  type="file"
                  className="file-select"
                  accept="image/*"
                  onChange={this.fileUploaded}
                />
              )}
            </Form.Item>
            
             
            <Form.Item>
              <Button type="primary" htmlType="submit" >Submit </Button>
            </Form.Item>
          </Form>
        </Row>
        {" "}
      </div>
    );
  }
}


// export default Form.create()(AddTripForm)