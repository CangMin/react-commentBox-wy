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

//提交评论表单组件 
class CommentForm extends React.Component{

	//表单提交函数方法
	handleSubmit(e){
		e.preventDefault();//阻止浏览器原生刷新
		// console.log(this,e);
		//const定义常量es6语法
		const author = this.refs.author.value.trim();//获取表单中ref属性值为author的输入值
		const body = this.refs.body.value.trim();
		const form = this.refs.form;//获取表单中ref属性值为form的对象，用于重置表单
		// console.log(author,body);
		form.reset();
	}

	render(){
	//handleSubmit绑定表单提交函数
	//ref可获取真实的Dom对象
		return (
				<form className="comment-form" ref="form" onSubmit={ e =>{this.handleSubmit(e)}} >
				<input type="text" placeholder="你的姓名" ref="author" />
				<input type="text" placeholder="输入您的评论" ref="body" />
				<input type="submit" value="提交评论" />
				</form>
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
			success: comments => {//es6匿名的箭头函数写法能自动绑定react上文this对象,如果函数只有一个参数，可省略圆括号
				// console.log(this);
				console.log("服务端获取的数据"+comments);
				this.setState({comments:comments});
			},
			error: (xhr,status,err) => {//如果函数不止一个参数，不能省略圆括号
                        console.log('动态页有问题！\n\n' + xhr.responseText+err.toString());
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


