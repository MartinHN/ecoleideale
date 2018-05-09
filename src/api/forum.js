import Req from "./requestBase"
const APIversion = [1, 0, 0]
const storage = require('localforage').createInstance({name: 'forum'})


function arrayEq(a1,a2){
  return   a1.length==a2.length && a1.every((v,i)=> v === a2[i])
}

class ForumAPI extends Req{
  constructor () {
    super('/api/forum');
    this.posts = {}
    this.postIds = []
    this.inited = false
  }


  init (cb,err) {
    if(this.inited){
      cb()
    }
    // else{
      const that = this
      const initList = () => {
        storage.setItem('APIversion', APIversion)
        that.getPostList(list => {
          for (const id of list) {
            storage.getItem(id).then(function (v) { that.posts[id] = v })
          }
          that.postIds = list
          this.inited = true
          console.log('inited')
          if(cb)cb()

        },
      err)
      }
      storage.getItem('APIversion')
      .then(v => { if (v[0] != APIversion[0]) { storage.clear(initList) }else{initList()} })
      .catch(initList)
    // }

  }

  close () {

  }

  getPostList (cb,err) {
    if (this.postIds.length) {
      cb(this.postIds)
    } 
    // else {
      this.get('/list', null, (postsOb) => {
        if (postsOb.list) {
          const hasChanged = !arrayEq(this.postIds,postsOb.list)
          if(hasChanged)console.log('posts updated',this.postIds,postsOb.list)
            this.postIds = postsOb.list
          if(hasChanged)cb(postsOb.list)
        // console.log('post lists', this.posts)
    } else {
      console.error('no posts parsed')
      cb(null)
    }
  },err)
    // }
  }

  getPostForId (id, cb) {
    storage.getItem('' + id)
    .then(cb)
    .catch(err => this.fetchPostForId(id, cb))
  }

  fetchPostForId (id, cb) {
    const lbrRe = new RegExp('\\\\n', 'g')
    this.get('/get', {id: id}, (o) => {
      if (o) {
        // if(self.postTitle != o.title){console.error("wrong content")}
        if (o.content) { o.content = o.content.replace(lbrRe, '<br/>') }
          const post = {
            postTitle: o.title,
            postAuthor: o.author,
            content: o.content}
            storage.setItem('' + id, post)
            .then(o => { console.log('fetched', post); cb(post) })
            .catch(err => {
              console.error('forum cant store', err)
              cb(null)
            })
          } else {
            cb(null)
          }
        })
  }

  sendPost(post,cb,err){
    const formData = {title:post.title,content:post.content}
    this.postForm('/add',formData,(resp)=>{
      if( resp && resp.success){
        const u = resp.user;
        cb()
      }
      else{
        err(resp)
      }

    },err)
  }
}

const forumAPI = new ForumAPI()

export default forumAPI
