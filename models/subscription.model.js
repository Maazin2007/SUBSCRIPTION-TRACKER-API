import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true, 
        minLength: 2,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'music', 'entertainment'],
        required: [true, 'Subscription Category is required'], 
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment Method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    }, 
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Start Date must be in the past',
        }
    },
    RenewalDate: {
        type: Date,
        required: [true, 'Renewal Date is required'],
        validate: {
            validator:  function (value) {
                return value > this.startDate;
            },
            message: 'Renewal Date must be in the future',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true,
    }
}, {timestamps: true});

// automatically update the renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if (!this.RenewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.RenewalDate = new Date(this.startDate);
        this.RenewalDate.setDate(this.startDate.getDate() + renewalPeriod[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});



export default mongoose.model('Subscription', subscriptionSchema);