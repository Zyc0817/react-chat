import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getMsgList } from '../../redux/chat.redux'

@connect(
	state=>state,
	{getMsgList}
)

class Geniusinfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	render() {
		console.log(this.props.user._id)
		return (
			<div>
				<ul>
	    			{this.state.data.map((item, index) => {
	    				if (item._id == this.props.user._id) {

	    				} else {
	    					return <li
		    					key={index}
		    					onClick={() => this.handleClick(item)}
		    				>{item.user}</li>
	    				}
 	    				
	    			})}
	    		</ul>
	    		<h1>未读消息：{this.props.chat.unread}</h1>
			</div>
		)
	}
	componentDidMount(){
		axios.get('/user/list', {})
			.then(res => {
				this.setState({
					data: res.data
				})
				console.log(this.state.data)
			})
	}
	handleClick(v) {
		this.props.history.push(`/chat/${v._id}`)
	}
}

export default Geniusinfo