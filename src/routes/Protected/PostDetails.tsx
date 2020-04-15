import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Image,
  Header,
  Icon,
  Form,
  Grid,
  TextArea,
  Rating,
  Label
} from "semantic-ui-react";
import api from "../../utils/api";
import { connect } from "react-redux";
import { deleteJob } from "../../redux/actions/index";
import Remove from "./Remove";
import DetailsNav from "../Modal/DetailsNav";
import Cal from "../../utils/Cal";

function PostDetails(props) {
  console.log(props);
  const [thisJob, setThisJob] = useState(
    props.jobs.find(obj => obj.id == props.jobId)
  );
  const [job, setJob] = useState({
    jobTitle: thisJob.jobTitle,
    url: thisJob.urlText,
    companyTitle: thisJob.companyTitle,
    companyUrl: !thisJob.companyUrl ? "ACME" : thisJob.companyUrl,
    details: "I'm a detail",
    rating: !thisJob.rating && 3,
    applicationDeadline: !thisJob.applicationDeadline
      ? Date.now()
      : thisJob.applicationDeadline
  });

  const handleChanges = e => {
    const value = e.target.value;
    setJob({
      ...job,
      [e.target.name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log(job);
  };

  const handleRating = (e, data) => {
    setJob({
      ...job,
      rating: data.rating
    });
  };

  return (
    <Modal
      style={{ height: "85vh" }}
      trigger={<Icon name="edit" size="large" />}
    >
      <Modal.Header>{job.companyTitle}</Modal.Header>
      <DetailsNav />
      <Modal.Content>
        <Modal.Description>
          <Grid>
            <Grid.Column width={10}>
              <Form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Form.Field>
                        <label>Company Title:</label>
                        <input
                          placeholder="Company Title"
                          name="companyTitle"
                          value={job.companyTitle}
                          onChange={handleChanges}
                        />
                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column>
                      <Form.Field>
                        <label>Company URL:</label>
                        <input
                          placeholder="Company URL"
                          name="companyUrl"
                          value={job.companyUrl}
                          onChange={handleChanges}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Form.Field>
                        <label>Job Post Title:</label>
                        <input
                          placeholder="Job Post Title"
                          name="jobTitle"
                          value={job.jobTitle}
                          onChange={handleChanges}
                        />
                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column>
                      <Form.Field>
                        <label>Job Post URL:</label>
                        <input
                          placeholder="Job Post URL"
                          name="url"
                          value={job.url}
                          onChange={handleChanges}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <h3>Job Details:</h3>
                <TextArea
                  rows={20}
                  placeholder="Job Description"
                  name="details"
                  value={job.details}
                  onChange={handleChanges}
                />
                <Button type="submit" floated="right">
                  Save
                </Button>
              </Form>
            </Grid.Column>

            <Grid.Column floated="right" width={5}>
              <div>
                <Image size="small" src={props.imgSrc} />
                <Header as="h3" content={job.jobTitle} />
              </div>
              <Rating
                style={{ margin: ".5em 0 2em" }}
                onRate={handleRating}
                rating={job.rating}
                maxRating={5}
                clearable
              />
              <Cal dueDate={job.applicationDeadline} />
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Remove removeJob={props.deleteJob} id={props.jobId} />
    </Modal>
  );
}
function mapStateToProps(state) {
  return {
    jobs: state.jobs
  };
}

const mapDispatchToProps = {
  deleteJob
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
