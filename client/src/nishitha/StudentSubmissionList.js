import React from 'react';
import {Table,Button} from 'reactstrap';
class StudentSubmissionList extends React.Component {


    handleDownload=(filename)=>{
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
                            const filename=file.file.split('\\').pop();
                            return (
                                <tr key={index}>
                                    <td>
                                        <a href="#" onClick={(e)=>this.handleDownload(filename)}
                                        >{filename}</a>
                                    </td>
                                    <td>
                                        {file.submittedBy}
                                    </td>
                                    <td>
                                        {file.submittedDate}
                                    </td>
                                    <td>
                                        <Button color="danger" onClick={(e)=>this.props.handleDelete(this.props.fileList,file)}>Delete</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }

                    </tbody>
                </Table>
            </div>

        );
    }


}

export default StudentSubmissionList;
