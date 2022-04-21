import React, { Component } from 'react';
// 리액트라고 하는 라이브러리에서 component라고 하는 클래스를 로딩한 것이다. 

class TOC extends Component {
    
    render(){
        console.log('TOC render');
        var lists = [];
        var data  = this.props.data;
        var i = 0;
        while(i < data.length){
            lists.push(
            <li key={data[i].id}>
              <a 
                  href={"/contents/"+data[i].id}
                  data-id={data[i].id}
                  onClick={function(e){
                    e.preventDefault();
                    this.props.onChangePage(e.target.dataset.id);
                  }.bind(this)}
                  >{data[i].title}</a>
            </li>)
            i += 1;
        }
      return (
        <nav>
          <ul>
              {lists}
          </ul>
      </nav>
      );
    }
  }

  export default TOC;
