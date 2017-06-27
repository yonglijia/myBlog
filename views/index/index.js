/**
 * Created by jyl on 2017/6/26.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Foot from '../../component/Foot/index.js';
import Head from '../../component/Head/index.js';

import { Layout,Breadcrumb} from 'antd';
const { Content } = Layout;
ReactDOM.render(
    <div>
        <Layout>
            <Head/>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24,}}>Content</div>
            </Content>
            <Foot />
        </Layout>
    </div>,
    document.getElementById('root')
);