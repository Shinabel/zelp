var mongoose = require("mongoose");
var responseSchema = require("./response.schema.server");
var responseModel = mongoose.model("ResponseModel", responseSchema);

function findResponseById(responseId) {
    return responseModel.findById(responseId);
}

function createResponse(response) {
    return responseModel.create(response);
}

function findAllResponses() {
    return responseModel.find();
}

function findResponsesByPostId(pid) {
    return responseModel.find({postId: pid});
}

function deleteResponse(responseId, userId) {
    // FIXME filter out responses first (might not need if findOneAndRemove works
    return responseModel.findOneAndRemove({_id: responseId, userId: userId});
}

function decrementVotes(responseId, amt) {
    return responseModel.update({
        _id: responseId
    }, {
        $inc: {voteCounts: -amt}
    });
}

function incrementVotes(responseId, amt) {
    return responseModel.update({
        _id: responseId
    }, {
        $inc: {voteCounts: +amt}
    });
}

function findUserVote(responseId, userId) {
    return responseModel.find({_id: responseId, "votes.userId": userId},{_id: responseId, votes: {$elemMatch: {userId: userId}}});
}

function addVote(rid, vote) {
    return responseModel.findOneAndUpdate({ _id: rid }, {$push: {votes: vote}});
}

function updateVote(rid, userId, vote) {
    return responseModel.update({_id: rid, "votes.userId": userId}, {$set: {"votes.voteType": vote.voteType}});
}

var api = {
    createResponse: createResponse,
    findAllResponses: findAllResponses,
    findResponseById: findResponseById,
    findResponsesByPostId: findResponsesByPostId,
    deleteResponse: deleteResponse,
    decrementVotes: decrementVotes,
    incrementVotes: incrementVotes,
    findUserVote: findUserVote,
    addVote: addVote,
    updateVote: updateVote
};

module.exports = api;
