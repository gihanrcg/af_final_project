import React from 'react';
import List from "./StudentSubmissionList";

class FileUploader extends React.Component {


    handleUpload = (e) => {
        const event = Object.assign({}, e);
        this.props.handleUpload(event);
        e.target.value = null;
    };


    render() {
        return (
            <div>
                <input type="file" name="file" onChange={(e) => this.handleUpload(e)} disabled={this.props.disabled}/>
            </div>

        );
    }


}

export default FileUploader;
