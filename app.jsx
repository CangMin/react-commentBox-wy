class CommentForm extends React.Component{
	render(){
		return (
				<div className="comment-form">CommentForm</div>
			)
	}
}

class CommentList extends React.Component{
	render(){
		return (
			<div className="comment-list">CommentList</div>
		)
	}
}

class CommentBox extends React.Component{

	render(){
		return (
			<div className="comment-box">
				<h1>Comments</h1>	
				<CommentList/>
				<CommentForm/>
			</div>
			)
	}
}

ReactDOM.render(
        <CommentBox/>,
        document.getElementById('content')
      );


