/**
 * Created by jyl on 2017/6/26.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Foot from '../../component/Foot/index.js';
import Head from '../../component/Head/index.js';
import './index.less';
import { Layout,Card,Calendar,Avatar} from 'antd';
const { Content } = Layout;
ReactDOM.render(
    <Layout style={{ background: '#fff',height:'100%'}}>
        <Head/>
        <Content style={{marginTop: 68,padding: '0 100px',}}>
            <Card style={{ position:"fixed",right:"100px",width: "25%",marginBottom:'10px' }}>
                <Calendar fullscreen={false} />
            </Card>
            <Card title="Follow me" style={{ position:"fixed",right:"100px",width: "25%",marginTop:'370px',marginBottom:'10px' }}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <ul>
                    <li>微博</li>
                    <li>微信</li>
                    <li>GitHub</li>
                </ul>
            </Card>
            <Card title="JS模块思想" style={{ width: "70%",marginBottom:'10px' }}>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            
            <Card title="CSS模块思想" style={{ width: "70%",marginBottom:'10px' }}>
                <p>CSS模块思想</p>
                <p>Card content</p>
            </Card>
            <Card title="一个馒头引发的血案" style={{ width: "70%",marginBottom:'10px' }}>
                <p>Card content</p>
                <p>CSS模块思想</p>
            </Card>
            <Card title="工程打包思想" style={{ width: "70%",marginBottom:'10px' }}>
                <p>CSS模块思想</p>
                <p>Card content</p>
            </Card>
        </Content>
        <Foot />
    </Layout>,
    
    document.getElementById('root')
);