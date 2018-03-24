import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import From from '../../component/form/form'


@connect(
	state=>state.user,
	{login}
)


@From
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register() {
		this.props.history.push('/register')
	}
	handleLogin() {
		this.props.login(this.props.state)
	}
	render() {
		return (
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<h2>登录</h2>
				<WingBlank>
					<List>
						{this.props.msg? <p>{this.props.msg}</p> : null}
						<InputItem
						onChange={v => this.props.handleChange('user', v)}
						>用户</InputItem>
						<WhiteSpace/>
						<InputItem
						type='password'
						onChange={v => this.props.handleChange('pwd', v)}
						>密码</InputItem>
					</List>
					<Button type='primary' onClick={this.handleLogin}>登录</Button>
					<WhiteSpace/>
					<Button type='primary' onClick={this.register}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register