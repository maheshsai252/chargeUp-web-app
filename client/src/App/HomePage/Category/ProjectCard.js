import { Col } from "react-bootstrap";
import Banner from "../../resources/banner_m.gif";

export const ProjectCard = ({ event }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={Banner} alt="" />
        <div className="proj-txtx">
          <h4>{event.name}</h4>
          <span>{event.summary}</span>
        </div>
      </div>
    </Col>
  )
}