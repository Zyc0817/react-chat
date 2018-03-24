import React from 'react';
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { withRouter } from 'react-router-dom'
import './chat.css'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'
@withRouter

@connect(
	state=>state,
	{getMsgList, sendMsg, recvMsg}
)

class Chat extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			msg: []
		}

	}
	render() {
		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if (!users[userid]) {
			return null
		}
		const chatid = getChatId(userid, this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)

		return (
			<div id="chat-list">  
				<NavBar mode='dark' onLeftClick={() => {
					this.props.history.goBack()
				}} icon={<Icon type="left" />}>
					{users[userid].name}
				</NavBar>
				<QueueAnim delay={100}>
					{chatmsgs.map((v, i) => {
						return v.from == userid?(
							<List key={v._id}>
								<Item
								>{v.content}</Item>
							</List>
							):(
							<List key={i}>
								<Item
									extra={'avatar'}
									className="chat-me"
								>{v.content}</Item>
							</List>
							)
					})}
				</QueueAnim>
				<div className="stick-footer" style={{'position': 'fixed','width':'100%',bottom:0}}>
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v => {
								this.setState({
									text: v
								})
							}}
							extra={<span
									onClick={() => {this.handleSubmit()}}
								>发送</span>}
						>信息</InputItem>
					</List>
				</div>	
			</div>
		)
	}
	componentDidMount() {
		// socket.on('recvmsg', (data) => {
		// 	this.setState({
		// 		msg: [...this.state.msg, data.text]
		// 	})
		// })
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
		

	}
	handleSubmit() {
		// socket.emit('sendmsg', {text: this.state.text})
		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from, to, msg})
		this.setState({
			text: ''
		})		
	}
}


export default Chat