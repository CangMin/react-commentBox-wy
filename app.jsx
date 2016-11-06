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
		console.log(this.props.comments);
		var commentsNode = this.props.comments.map(function(comment,index){
			return <Comment key={'comment-'+index} author={comment.author} time={comment.time}>
						{comment.body}
				   </Comment>
		});
		return (
			<div className="comment-list">
				{commentsNode}
			</div>
		)
	}
}

var comments = [
	{author:"小李",body:"这是一条评论",time:"20161106"},
	{author:"小玲",body:"这是第二条评论",time:"20161105"},
	{author:"小张",body:"这是第三条评论",time:"20161104"}
];

class CommentBox extends React.Component{

	render(){
		return (
			<div className="comment-box">
				<h1>Comments</h1>	
				<CommentList comments={comments}/>
				<CommentForm/>
			</div>
			)
	}
}

ReactDOM.render(
        <CommentBox/>,
        document.getElementById('content')
      );


