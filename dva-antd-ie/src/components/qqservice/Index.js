import React from 'react'
import styles from './index.less'
class QQService extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="qq-section">
        <dl>
          <dt></dt>
            <dd>
              <a  href="tencent://message/?uin=461342854&Site=运货柜&Menu=yes">
                 <img src='http://wpa.qq.com/pa?p=1:461342854:1' alt="点击这里给我发消息" />
               </a>
              </dd>
            <dd>
            <a  href="tencent://message/?uin=461342854&Site=运货柜&Menu=yes">
                 <img  src='http://wpa.qq.com/pa?p=1:461342854:1' alt="点击这里给我发消息" />
               </a>
            </dd>
          
        </dl>
      </div>
    )
  }
}
export default QQService
