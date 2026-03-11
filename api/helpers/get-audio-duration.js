const { getAudioDurationInSeconds } = require("get-audio-duration");

module.exports = {
    friendlyName: "Get audio duration",
    description: "",
    inputs: {
        audioUrl: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },

    fn: async function (inputs, exits) {
        const duration = (await getAudioDurationInSeconds(inputs.audioUrl)) | 0;

        const durationInSeconds = duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        function padTo2Digits(num) {
            return num.toString().padStart(2, "0");
        }
        const audioDuration = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
        return exits.success(audioDuration);
    },
};
