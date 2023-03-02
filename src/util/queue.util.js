class Queue {
    //初始化队列（使用数组实现）
   constructor(maxlen)
   {
    this.items = [];
    this.maxlen=maxlen;
   }
    
  
    //入队
    InQueue(ele) {
      this.items.push(ele);
      if(this.size()>this.maxlen)
      {
        this.OutQueue()
      }
    };
  
    //出队
    OutQueue() {
      return this.items.shift();
    };
  
    //返回首元素
    front() {
      return this.items[0];
    };
  
    //队列是否为空
    isEmpty () {
      return this.items.length == 0;
    };
  
    //清空队列
    clear () {
      this.items = [];
    };
  
    //返回队列长度
    size () {
      return this.items.length;
    };

    //查看列队
    show (){
      return this.items;
    };
}

module.exports=Queue