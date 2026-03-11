module.exports = {
    friendlyName: "Add Music",
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            var createObj = {};

            //music file and music profile image upload
            var fileUploadResponse = await sails.helpers.file.multipleFileUploadMusic(
                this.req
            );

            var fileUploadResponseMusicProfile = fileUploadResponse;
            let musicProfile = null;
            if (
                fileUploadResponseMusicProfile.status === true &&
                fileUploadResponseMusicProfile.uploadedFiles &&
                fileUploadResponseMusicProfile.uploadedFiles.musicProfile &&
                fileUploadResponseMusicProfile.uploadedFiles.musicProfile.length > 0
            ) {
                musicProfile =
                    fileUploadResponseMusicProfile.uploadedFiles.musicProfile[0]
                        .uploadFileName;
            }
            createObj.profileImage = musicProfile;

            let musicFile = null;
            let musicOriginalName = null;
            var fileUploadResponseMusicFile = fileUploadResponse;
            if (
                fileUploadResponseMusicFile.status === true &&
                fileUploadResponseMusicFile.uploadedFiles.musicFile &&
                fileUploadResponseMusicFile.uploadedFiles.musicFile.length > 0
            ) {
                musicFile =
                    fileUploadResponseMusicFile.uploadedFiles.musicFile[0].uploadFileName;
                musicOriginalName =
                    fileUploadResponseMusicFile.uploadedFiles.musicFile[0].filename;
            }
            createObj.musicFileName = musicFile;
            createObj.musicFileDisplayName = musicOriginalName;

            let musicProfileVideo = null;
            var fileUploadResponseMusicProfileVideo = fileUploadResponse;
            if (
                fileUploadResponseMusicProfileVideo.status === true &&
                fileUploadResponseMusicProfileVideo.uploadedFiles &&
                fileUploadResponseMusicProfileVideo.uploadedFiles.musicProfileVideo &&
                fileUploadResponseMusicProfileVideo.uploadedFiles.musicProfileVideo.length > 0
            ) {
                musicProfileVideo =
                    fileUploadResponseMusicProfileVideo.uploadedFiles.musicProfileVideo[0]
                        .uploadFileName;
            }
            createObj.musicProfileVideo = musicProfileVideo;


            const musicStoragePath =
                sails.config.globals.imagePath.MUSIC_FILE_STORE_PATH;

            const urlToGetDuration =
                musicStoragePath + "/" + createObj?.musicFileName;
            const getDuration = await sails.helpers.getAudioDuration(
                urlToGetDuration
            );
            createObj.duration = getDuration;

            // const createMusic = await Music.create({
            //     ...createObj,
            //     userId: loginUserData?.id,
            // }).fetch();

            const updateMusic = await Music.update({ id: inputs?.musicId }).set({ createObj }).fetch();
            return exits.success({
                status: true,
                message: "Music added successfully",
                data: updateMusic[0],
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
