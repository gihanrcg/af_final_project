import React from 'react';
import {Table,Button} from 'reactstrap';
class List extends React.Component {


    render() {
        return (
            <div>
                <Table hover>
                    <thead>
                    <tr>
                        <th>File</th>
                        <th>Uploaded By</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.fileList.map((file, index) => {

                            return (
                                <tr key={index}>
                                    <td>

                                        <a href={"../../../uploads/users/fileUploads/" }
                                           download>{file.file.split('\\').pop()}</a>
                                    </td>
                                    <td>
                                        {file.submittedBy}
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

export default List;
