import {
  Col,
  ColTitle,
  Container,
  Content,
  Item,
  Row,
  RowTitle,
  Title,
} from './styles';

export const ReportsData = ({ data }) => {
  return (
    <Container>
      <RowTitle>
        <ColTitle>
          <Title>Data</Title>
        </ColTitle>
        <ColTitle>
          <Title>Dia</Title>
        </ColTitle>
        <ColTitle>
          <Title>Hora</Title>
        </ColTitle>
      </RowTitle>
      <Content
        data={data}
        keyExtractor={(item) => String(item.date)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Row>
            <Col>
              <Item>{item.date}</Item>
            </Col>
            <Col>
              <Item>{item.weekDay}</Item>
            </Col>
            <Col>
              <Item>{item.hour}</Item>
            </Col>
          </Row>
        )}
      />
    </Container>
  );
};
