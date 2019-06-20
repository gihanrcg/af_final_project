import React from 'react';
import List from "./List";

class FileUploader extends React.Component {


    handleUpload = (e) => {
        const event = Object.assign({}, e);
        this.props.handleUpload(event);
        e.target.value = null;
    };


    render() {
        return (
            <div>
                <label>Upload a file</label>
                <input type="file" name="file" onChange={(e) => this.handleUpload(e)} />
                <List
                    fileList={this.props.fileList}
                    handleDownload={this.props.handleDownload}
                    handleDelete={this.props.handleDelete}
                />
            </div>

        );
    }


}

export default FileUploader;
