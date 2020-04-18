import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import Notes from "./Notes";
import Details from "./Details";
function Navigation(props) {
  const [activeItem, setActiveItem] = useState<string>("job_details");

  const handleActive = (e, { name }) => {
    setActiveItem(name);
  };
  useEffect(() => {
    switch (activeItem) {
      case "job_details":
        props.setView(<Details job={props.job} jobId={props.jobId} />);
        break;
      case "notes":
        props.setView(<Notes job={props.job} jobId={props.jobId} />);
        break;

      default:
    }
  }, [activeItem]);
  return (
    <Menu style={{ marginTop: 0 }} className="detailsNav">
      <Menu.Item
        name="job_details"
        active={activeItem === "job_details"}
        onClick={handleActive}
      >
        Job Details
      </Menu.Item>
      <Menu.Item
        name="notes"
        active={activeItem === "notes"}
        onClick={handleActive}
      >
        Notes
      </Menu.Item>
    </Menu>
  );
}
export default Navigation;