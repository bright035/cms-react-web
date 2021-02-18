import { HeartFilled, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';
import Link from 'next/link'
import {userRole} from '../constant'

const StyledRow = styled(Row)`
  position: relative;
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    background: #f0f0f0;
    width: 100%;
    height: 1px;
  }
`;


export const CourseCard = (props) => {
    return (
        <Card cover={<img src={props.cover} />} >
          <Row gutter={[6,16]}>
            <h3>{props.name}</h3>
          </Row>
    
          <StyledRow gutter={[6,16]} justify="space-between" align="middle">
            <Col>{props.startTime}</Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <HeartFilled style={{ marginRight: 5, fontSize: 16, color: 'red' }} />
              <b>{props.star}</b>
            </Col>
          </StyledRow>
    
          <StyledRow gutter={[6,16]} justify="space-between">
            <Col>Duration:</Col>
            <Col>
               <b>{`${props.duration} ${props.duration>1? 'Years':'Year'}`}</b> 
            </Col>
          </StyledRow>
    
          <StyledRow gutter={[6,16]} justify="space-between">
            <Col>Teacher:</Col>
            <Col style={{ fontWeight: 'bold' }}>
              {props?.teacherName && <Link href={`/dashboard/${userRole.manager}/#`}>{props.teacherName}</Link>}
            </Col>
          </StyledRow>
    
          <Row gutter={[6,16]} justify="space-between">
            <Col>
              <UserOutlined style={{ marginRight: 5, fontSize: 16, color: '#1890ff' }} />
              <span>Student Limit:</span>
            </Col>
            <Col>
              <b>{props.maxStudents}</b>
            </Col>
          </Row>
    
          {props.children}
        </Card>
    )
}