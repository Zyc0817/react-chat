import React from 'react'
export default function Form(Comp) {
	return class WrapperComp extends React.Component{
		constructor(props) {
			super(props)
			this.handleChange = this.handleChange.bind(this)
			this.state = {}
		}
		handleChange(key, val) {
			console.log(key,val)
			this.setState({
				[key]: val
			})
		}
		render() {
			return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
		}
	}
}