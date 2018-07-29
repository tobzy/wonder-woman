import React from 'react';
import {Form, Icon, Input, Button, Select, Radio, message} from 'antd';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'
import {axiosClient} from "../tools/axiosClient";
import {postIssue} from "../config/url";

const FormItem = Form.Item;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const Option = Select.Option;


class NewIssueForm extends React.Component {

    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values["datastoreId"] = 7503
                values["firstname"] = values["offenderName"]
                values["reporterAddress"] = uuidv4()

                this.props.showLoading();
                axiosClient.post(postIssue, values)
                    .then(response => {
                        this.props.endCall()
                        message.success("Issue successfully submitted", 2)
                        message.info(`We are always here to help\n. 
                              The issue would be resolved soon. \nPlease save this id- ${response.data.id}\n. 
                                       and use it to track the resolution process `, 6);
                        this.props.hideLoading()
                    })
                    .catch((error) => {
                        message.error("Error, Issue not submitted", 1)
                        this.props.hideLoading()
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem label="Description">
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please input the  description!'}],
                    })(
                        <TextArea prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder="Description" rows={3}/>
                    )}
                </FormItem>
                <FormItem label="Issue Types (comma separated)">
                    {getFieldDecorator('issueType', {
                        rules: [{required: true, message: 'Please enter some issue types separated by commas!'}],
                    })(
                        <Select
                            mode="tags"
                            style={{width: '100%'}}
                            // onChange={handleChange}
                            tokenSeparators={[',']}
                        >
                            {/*{children}*/}
                            <Option value="rape">Rape</Option>
                            <Option value="domestic violence">Domestic Violence</Option>
                            <Option value="verbal abuse">Verbal Abuse</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="Offender Name">
                    {getFieldDecorator('offenderName', {
                        rules: [{required: true, message: 'Please enter a name for the offender!'}],
                    })(
                        <Input placeholder="Offender's Name"/>
                    )}
                </FormItem>
                <FormItem label="Offender Number">
                    {getFieldDecorator('offenderMobileNumber', {
                        // rules: [{required: true, message: 'Please enter a number for the offender!'}],
                    })(
                        <Input placeholder="Offender's Number"/>
                    )}
                </FormItem>
                <FormItem label="Incident Location">
                    {getFieldDecorator('incidentLocation', {
                        rules: [{required: true, message: 'Please enter a location!'}],
                    })(
                        <Input placeholder="Location of Incident"/>
                    )}
                </FormItem>
                <FormItem label="Other Details">
                    {getFieldDecorator('otherDetails', {
                        // rules: [{required: true, message: 'Please enter a location!'}],
                    })(
                        <Input placeholder="Other Details"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('witnessTpe', {
                        rules: [{required: true, message: 'Please select one!'}],
                    })(
                        <RadioGroup>
                            <Radio value="Eye Witness">Eye Witness</Radio>
                            <Radio value="Me">Happened to me</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NewIssueForm)

const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => {
    return {
        showLoading: () => dispatch(showLoading()),
        hideLoading: () => dispatch(hideLoading()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
