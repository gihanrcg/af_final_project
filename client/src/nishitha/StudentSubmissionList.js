import React from 'react';
import {Table} from 'reactstrap';

class StudentSubmissionList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    handleDownload = (filename) => {
        this.props.handleDownload(filename)
    };


    render() {
        return (
            <div>
                <Table hover>
                    <thead>
                    <tr>
                        <th>File</th>
                        <th>Uploaded By</th>
                        <th>Submitted Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.fileList.map((file, index) => {
                            const filename = file.file.split('\\').pop();
                            return (
                                <tr key={index}>
                                    <td>
                                        <button type="button" className="btn btn-link"
                                                onClick={(e) => this.handleDownload(filename)}
                                        >{filename}</button>
                                    </td>
                                    <td>
                                        {file.submittedBy}
                                    </td>
                                    <td>
                                        {file.submittedDate}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger"
                                                onClick={(e) => this.props.handleDelete(this.props.fileList, file)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <button className="btn btn-primary" onClick={(e) => this.props.renderDefaultPage()}>Back</button>
            </div>

        );
    }


}

export default StudentSubmissionList;
