import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
// 当需要用的router 属性的时候，将组件包一层withRouter，就可以拿到需要的路由信息
@withRouter


@connect(
	null,
	{loadData}
)

class AuthRoute extends React.Component {
	render() {
		return (
			<div></div>
		)
	}
	componentDidMount() {
		const publicList = ['/login', 'register']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname) > -1) {
			return 
		}

		axios.get('/user/info')
			.then(res => {
				if(res.status == 200) {
					if (res.data.code == 0) {
						// 有登录信息的
						this.props.loadData(res.data.data)
					} else {				
						this.props.history.push('/login')
					}
				}
			})

		
	}
}

export default AuthRoute