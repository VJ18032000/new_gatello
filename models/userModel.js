const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        required: false,
        default:null
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: false,
        default:null
    },
    designation: {
        type: String,
        required: false,
        default:null
    },
    city: {
        type: String,
        required: false,
        default:null
    },
    company: {
        type: String,
        required: false,
        default:null
    },
    job: {
        type: String,
        required: false,
        default:null
    },
    college: {
        type: String,
        required: false,
        default:null
    },
    high_school: {
        type: String,
        required: false,
        default:null
    },
    interest: {
        type: String,
        required: false,
        default:null
    },
    relationship_status: {
        type: String,
        required: false,
        default:null
    },
    about: {
        type: String,
        required: false,
        default:null
    },
    member: {
        type: String,
        required: true
    },
    email: {
        type: String,
         required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    is_Logged_in: {
        type: Boolean,
        required: false,
        default:1
    },
    my_feeds: {
        type: Array,
        required: false
    },
    following_count: {
        type: Number,
        required: false,
        default:0
    },
    followers_count: {
        type: Number,
        required: false,
        default:0
    },
    posts_count: {
        type: Number,
        required: false,
        default:0
    },
    space_used: {
        type: Number,
        required: false,
        default:0
    },
    root_folder_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto:true
    },
    notification_token:{
        type: String,
        required: false,
        default:" "
    },
    gender: {
        type: String,
        required: false,
        default:null
    },
    language_known: {
        type: Array,
        required: false
    },
    website: {
        type: String,
        required: false,
        default:null
    },
    work_experience: [{
        companyName: {
            type: String,
            required: false,
            default:null
        },
        startDate: {
            type: String,
            required: false,
            default:null
        },
        endDate: {
            type: String,
            required: false,
            default:null
        }
    }],
    skills: {
        type: Array,
        required: false,
    },

})

module.exports = mongoose.model('user', userSchema)