export interface CRMWebhookPayload {
    event: string;
    data: any;
}


export const processCRMWebhook = async (
    payload: CRMWebhookPayload
) => {

    console.log("CRM Webhook Received:");
    console.log(payload);


    switch(payload.event){

        case "property.created":

            console.log(
                "New property created from CRM",
                payload.data
            );

            // Here you can sync with WordPress/API/database
            break;


        case "property.updated":

            console.log(
                "Property updated from CRM",
                payload.data
            );

            break;


        case "property.deleted":

            console.log(
                "Property deleted from CRM",
                payload.data
            );

            break;


        default:

            console.log(
                "Unknown CRM event:",
                payload.event
            );
    }


    return {
        success:true,
        message:"CRM webhook processed successfully"
    };
};