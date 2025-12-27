import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
const { serve } = createRequire('@arcjet/workflow/express');

export const sendReminders = serve( async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(contextsubscriptionId);

    if (!subscription || subscription.status !== 'active') {
        return;
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });     
}