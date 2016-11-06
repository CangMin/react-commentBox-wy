class Comment extends React.Component{
	render(){
		return (
			<div>
				<div className="comment-body">
					{this.props.children}
				</div>
				<div className="comment-author">
					作者：{this.props.author}时间：{this.props.time}
				</div>
			</div>
			)
	}
}

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
			<div className="comment-list">
				<Comment author="小李" time="2016-11-06">
					沙发
				</Comment>
				<Comment author="小张" time="2016-11-05">
					这是第2条评论
				</Comment>
				<Comment author="小林" time="2016-11-04">
					这是第3条评论
				</Comment>
			</div>
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


