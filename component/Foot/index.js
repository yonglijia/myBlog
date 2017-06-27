/**
 * Created by jyl on 2017/6/27.
 */
/**
 * Created by jyl on 2017/6/26.
 */
// app/main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout} from 'antd';
const {Footer } = Layout;

class Foot extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Footer style={{ textAlign: 'center' }}>
                JYL Design ©2017 Created by JYL
            </Footer>
        )
    }
}
export default Foot;