
const APIversion = [1, 0, 0]
const storage = require('localforage').createInstance({name: 'forum'})

function arrayEq(a1,a2){
  return   a1.length==a2.length && a1.every((v,i)=> v === a2[i])
}

class ForumAPI {
  constructor () {
    this.url = 'http://127.0.0.1:3000/api/forum'
    this.posts = {}
    this.postIds = []
    this.inited = false
  }

  emitCmd (path, args, data, cb, err) {
    var xhr = new XMLHttpRequest()
    var fullURL = this.url + path
    if (args) {
      var isStart = true
      for (var a in args) {
        if (isStart) { fullURL += '?'; isStart = false } else { fullURL += '&' }
        fullURL += a + '=' + args[a]
      }
    }
    xhr.open('GET', fullURL)
    xhr.onload = function () {
      var r = xhr.responseText
      var res = (r && r[0] === '{') ? JSON.parse(r) : r
      // console.log(obj)
      cb(res)
    }
    const errf = err || function (e) { console.error('forum api error', e) }
    xhr.onerror = (e) => { errf(e) }
    xhr.ontimeout = (e) => { errf(e) }
    xhr.send(data)
  }

  init (cb) {
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

        })
      }
      storage.getItem('APIversion')
      .then(v => { if (v[0] != APIversion[0]) { storage.clear(initList) }else{initList()} })
      .catch(initList)
    // }

  }

  close () {

  }

  getPostList (cb) {
    if (this.postIds.length) {
      cb(this.postIds)
    } 
    // else {
      this.emitCmd('/list', null, null, (postsOb) => {
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
  })
    // }
  }

  getPostForId (id, cb) {
    storage.getItem('' + id)
    .then(cb)
    .catch(err => this.fetchPostForId(id, cb))
  }

  fetchPostForId (id, cb) {
    const lbrRe = new RegExp('\\\\n', 'g')
    this.emitCmd('/get', {id: id}, null, (o) => {
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
}

const forumAPI = new ForumAPI()

export default forumAPI
