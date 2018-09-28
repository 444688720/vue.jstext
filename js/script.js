Vue.component("note",{
	props:['todo'],
	template:`
	<div class="ui card">
 		 <div class="content">
    		<div class="header">{{titlelength || '新建笔记'}}</div>
   		 <div class="meta">
      		<span>{{aaa}}</span>
     		 <span>{{todo.title.length}}字</span>
   	 	</div>
    		<textarea rows="5" v-model="todo.title" @keyup="abc"></textarea>
    		<i class="trash alternate icon" title="删除笔记" @click="del"></i>
 		</div> 
		</div>`,
		computed:{
			titlelength:function(){
			return _.truncate(this.todo.title, {'length': 24,});
			},
			aaa:function(){
				return moment(this.todo.time).fromNow();
			},
			bbb:function(){
				return  Date.parse(new Date());
			}
			
		},
		methods:{
			del:function(){
				/*console.log(this._uid-1)*/
				app.notes.splice(this._uid-1,1)
				localStorage.setItem('notes',JSON.stringify(app.notes))
			},
			abc:function(){
				app.notes[this._uid-1].title = this.todo.title
				localStorage.setItem('notes',JSON.stringify(app.notes))
				this.todo.time = Date.parse(new Date())
			}
		}
})


var	app = new Vue({
	el:"#app",
	data:{
		notes:[
		{"title":"",
		"time":1537750268000
		},
		{"title":"弃我去者，昨日之日不可留；乱我心者，今日之日多烦忧。长风万里送秋雁，对此可以酣高楼。蓬莱文章建安骨，中间小谢又清发。俱怀逸兴壮思飞，欲上青天揽明月。抽刀断水水更流，举杯销愁愁更愁。人生在世不称意，明朝散发弄扁舟。",
		"time":1537750568000
		},
		{"title":"青山横北郭，白水绕东城。此地一为别，孤蓬万里征。浮云游子意，落日故人情。挥手自兹去，萧萧班马鸣。",
		"time":1537750468000
		},
		{"title":"故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。",
		"time":1537750268000
		}
		]
	},
	methods:{
		add:function(){
			this.notes.unshift({"title":"","time":Date.parse(new Date())},)
			localStorage.setItem('notes',JSON.stringify(this.notes))
			/*console.log(JSON.parse(localStorage.getItem('notes')))*/
			if(document.querySelector("textarea") !== null){
				document.querySelector("textarea").focus();
			}
		}
	},
	created:function(){
		if(localStorage.getItem('notes') !== null){
			this.notes = JSON.parse(localStorage.getItem('notes'))
		}
	}

})