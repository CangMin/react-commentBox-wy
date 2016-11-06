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

		//封装表单输入值为一个对象赋给Commentform组件的onSubmit属性props传递到CommentBox组件
		this.props.onSubmit({author:author,body:body});
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

	handleNewComment(comment){
		// console.log("CommentBox组件获取CommentForm组件传递来的表单值对象"+comment);//comment值就是CommentForm组件中表单获取用户输入的author,body对象值

		//表单提交的数据在未提交至服务器前先完成数据添加渲染显示
		const comments = this.state.comments;//表单未提交前的评论，既旧评论
		const newComments = comments.concat([comment]);//将表单提交后的新评论数据以数组的形式拼接添加到旧评论数据中，返回一个包括表单提交前和提交后的完整数据
		this.setState({comments:newComments});//将评论完整数据更新到CommentBox组件comments状态，既让CommentBox组件显示表单提交后的完整评论

		//模拟网络拥堵提交数据失败过程
		setTimeout(()=>{
			$.ajax({
			url:this.props.url,//CommentBox组件url属性获取的地址，既数据提交的服务器地址
			dataType:"json",
			type:"POST",
			data:comment,
			success:comments => {
				this.setState({comments:comments});//向服务器提交表单数据成功后，将服务器返回的数据更新至CommentBox组件状态
			},
			error:(xhr,status,err) => {
				console.log(err.toString());
				this.setState({comments:comments});//表单提交评论数据至服务器失败，状态返回未新增评论前的旧数据
			}
		});
		},2000);
		
	}
	render(){
		return (
			<div className="comment-box">
				<h1>Comments</h1>	
				<CommentList comments={this.state.comments}/>
				<CommentForm onSubmit={comment => this.handleNewComment(comment)}/>
			</div>
			)
	}
}

ReactDOM.render(
        <CommentBox url="comments.json"/>,
        document.getElementById('content')
      );


