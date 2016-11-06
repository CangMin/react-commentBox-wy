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

// var comments = [
// 	{author:"小李",body:"这是一条评论",time:"20161106"},
// 	{author:"小玲",body:"这是第二条评论",time:"20161105"},
// 	{author:"小张",body:"这是第三条评论",time:"20161104"}
// ];

class CommentBox extends React.Component{

	constructor(props){
		super();
		this.state = {
			comments:props.comments || [],//通过props将值传递给state,实现响应式编程。每当state值发生改变时，都会调用render()重新渲染Dom有变化的区域。
		};
	}

	loadDataFromServer(){
		console.log("开始加载数据");
		$.ajax({
			url:this.props.url,
			dataType:"json",
			success:function(comments){
				// console.log(this);
				console.log("服务端获取的数据"+comments);
				this.setState({comments:comments});
			}.bind(this),//让success回调函数中的this指向react对象
			error: function (xhr) {
                        console.log('动态页有问题！\n\n' + xhr.responseText);
                    }
		});
			console.log("数据加载完成");
	}

	componentDidMount(){
		console.log("组件渲染完成，下一步加载数据");
		this.loadDataFromServer();
		console.log("渲染完成");

	}

	render(){
		return (
			<div className="comment-box">
				<h1>Comments</h1>	
				<CommentList comments={this.state.comments}/>
				<CommentForm/>
			</div>
			)
	}
}

ReactDOM.render(
        <CommentBox url="comments.json"/>,
        document.getElementById('content')
      );


