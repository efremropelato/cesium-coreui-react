import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap';

import logo_suisse from '../../../assets/img/supsi/logo_suisse.png'
import logo_ticino from '../../../assets/img/supsi/logo_ticino.png'

class Dashboard extends Component {
  render() {
    return (
      <Row>
        <Col sm="6">
        <Card body>
          <CardTitle><h1>Ufficio federale di statistica</h1></CardTitle>
          <CardText>
            <a target="_blank" href="https://www.bfs.admin.ch/bfs/it/home/statistiche/popolazione.assetdetail.9566497.html">
              <Button>
                  Go
              </Button>
            </a>
          </CardText>
          <CardImg top width="100px" height="100px"  src={logo_suisse} alt="Card image cap" />
        </Card>
      </Col>
      <Col sm="6">
        <Card body>
          <CardTitle><h1>Ufficio del catasto e dei riordini fondiari</h1></CardTitle>
          <CardText>
            <a target="_blank" href="https://www4.ti.ch/dfe/de/ucr/documentazione/download-file/">
              <Button>
                Go
              </Button>
            </a>
          </CardText>
          <CardImg top src={logo_ticino} alt="Card image cap" />
        </Card>
      </Col>
    </Row>
    )
  }
}

export default Dashboard;
