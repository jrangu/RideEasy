import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Form, DatePicker, Select, Input, Button, Row, Col, } from "antd";
// const { Option } = Select;
import config from "../../src/config";
import axios from "axios";
import { Auth } from "aws-amplify";


const { RangePicker } = DatePicker;


 export default class AddTripForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            validated: false,
            setValidated: false
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
          if (err) {
            console.log('Error in add trip form ', err);
          }else {
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
    
addTrip(values){
  const postPayload = {
    startLocation: values.startLocation,
    endLocation: values.endLocation,
    seatsOffered: values.seatsOffered,
    price: values.price,
    startDateTime: values.startDateTime,
  

    // userName: localStorage.getItem("userName")
  };
 
axios
  .post(config.BackendUrl + "/addTrip", postPayload)
  .then(function(response) {
    console.log("response", response);
    return response;
  })
  .then(data => {
    console.log(data);
    alert(data.data);
  })
  .catch(function(error) {
    console.log("Error " + JSON.stringify(error));
  });

};
componentDidMount() {
  console.log("componentDidMount");
  //this.reloadForm();
}

  render(){
    const { getFieldDecorator } = this.props.form;
      // const rangeConfig = {
      //   rules: [{ type: "array", required: true, message: "Please select trip date time!" }]
      // };
  
    return(
      <div>
      <Row className="title-justify-center">
      </Row>
      <h1 align = "center" >Add Trip Form</h1>  
 
      <Row type="flex" justify="center" align="middle">
          
        <Form className="booking-form" onSubmit={this.handleSubmit}>

        <Form.Item  label="Start Location">
	    	  {getFieldDecorator('startLocation', {
                    rules: [{ required: true, message: 'Please input your start location!', whitespace: true }],
                    })(<Input />)}
	    	</Form.Item>
      
         <Form.Item label="End Location">
          {getFieldDecorator('endLocation', {
                    rules: [{ required: true, message: 'Please input your end location!', whitespace: true }],
                    })(<Input  />)}
          </Form.Item>

        <Form.Item label="Seats Offered"> 
        {getFieldDecorator('seatsOffered', {
                    rules: [{required:true, message: 'Please enter your seats offered', whitespace: true }],
        })
          (<Input  />)}
        </Form.Item>
        <Form.Item label="Price" name="price" >
          {getFieldDecorator('price', {
                    rules: [{required:true, message: 'Please enter your price per trip', whitespace: true }],
        })
        
          (<Input label="Price" />)}
        </Form.Item>
    
        <Form.Item label="Trip Date and Time">
          {getFieldDecorator('startDateTime', {
                  rules: [{ required: true, message: "Please select trip date time!" }]
          })
              
          (<DatePicker showTime/>)} 
          {/* { <DatePicker showTime 
          // onChange={onChange}
          //  onOk={onOk} 
           /> } */}
       
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