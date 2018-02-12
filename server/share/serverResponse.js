//response object to be sent to client contains info if application error (e.g. invalid input) occured

function ServerResponse(status, content) {
    this.status = status;
    this.content = content;
}

module.exports.ServerResponse = ServerResponse;

