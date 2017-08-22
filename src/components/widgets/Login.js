import React from 'react';
import styles from './Login.css';
import { Menu } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

class Login extends React.Component {


  handleSubmit = (e) => {
    const { dispatch } = this.props


    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'users/login', payload: values });
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { users } = this.props;
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {users.error !== undefined? 
        <div className={styles.globalError}>{users.error.errorMessage}</div>: null}
        <FormItem>
          {getFieldDecorator('login', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
            )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);


// export default WrappedNormalLoginForm;
const mapStateToProps = (state) => ({
  users: state.users,
  loading: state.loading.models.users
})

export default connect(mapStateToProps)(WrappedNormalLoginForm);