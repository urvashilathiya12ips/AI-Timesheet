exports.responseData = ({ res, statusCode, success, message, data, error, pagination }) => {
    const resultObj = {
        success,
        message,
        result: data,
        pagination: pagination,
        error: error
    };
    return res.status(statusCode).send(resultObj);
};

exports.responseMessage = (response, type = '', module = 'Data') => {
    let return_message;
    switch (response) {
        case 'error':
            return_message = `Error in ${type} data`;
            break;
        case 'success':
            return_message = `${module} ${type} successfully`;
            break;
        case 'wrong':
            return_message = `Something went wrong.`;
            break;
        case 'not_found':
            return_message = `No such ${type} exist`;
            break;
        case 'banned':
            return_message = `You are banned By administrator Report Us`;
            break;
        case 'fundraiser_limit':
            return_message = 'Fundraiser limit exceeded';
            break;
        case 'verify_User':
            return_message = `Please verify your ${type}`;
            break;
        case 'body':
            return_message = 'Body is required';
            break;
        case 'empty_body':
            return_message = `Please enter ${type}`;
            break;
        case 'name_used':
            return_message = `This ${type} is already in use.`;
            break;
        case 'user_not_matched':
            return_message = 'Invalid username';
            break;
        case 'Invalid':
            return_message = `Invalid ${type}`;
            break;
        case 'empty_login_body':
            return_message = 'Please enter Username or Password!';
            break;
        case 'invalid_credentials':
            return_message = 'Invalid password or Email';
            break;
        case 'OTP_invalid':
            return_message = 'Invalid OTP';
            break;
        case 'user_logged':
            return_message = 'User logged successfully!';
            break;
        case 'reset_password':
            return_message = 'Error in reset password';
            break;
        case 'email_send':
            return_message = 'Email sent successfully';
            break;
        case 'Exist':
            return_message = `${type} already exists!`;
            break;
        case 'subscribe':
            return_message = `You have already Subscribed!`;
            break;
        case 'email_send_error':
            return_message = 'Error while sending email';
            break;
        case 'password_update':
            return_message = 'Password updated successfully';
            break;
        case 'data_update_email_fail':
            return_message = 'Data uploaded successfully but error in sending email';
            break;
        case 'missing_id':
            return_message = `Please provide ${type} id`;
            break;
        case 'register_Mail':
            return_message = 'Register successfully Check Your Mail';
            break;
        case 'session_expired':
            return_message = 'Your session has expired';
            break;

        case 'no_access':
            return_message = 'Access denied';
            break;

        case 'Add':
            return_message = `${type} added Successfully`;
            break;

        case 'Getting':
            return_message = `All ${type} getting Successfully`;
            break;

        case 'single':
            return_message = `${type} getting Successfully`;
            break;

        case 'update':
            return_message = `${type} updated Successfully`;
            break;

        case 'delete':
            return_message = `${type} deleted Successfully`;
            break;

        case 'approve':
            return_message = 'Your Request has been approved';
            break;

        case 'Denied':
            return_message = 'Your Request has been denied';
            break;

        case 'Missing':
            return_message = `${type} is missing in the request params.`;
            break;
        case 'export':
            return_message = `${type} Export Successfully.`;
            break;
        case 'BulkEmailSuccess':
            return_message = ` ${type} sent successfully.`;
            break;
        case 'NoEmailsToSend':
            return_message = `No emails to send.`;
            break;
        case 'Cancel':
            return_message = `your ${type} Cancel Successfully.`;
            break;
        case 'Subscribed':
            return_message = 'You have already Subscribed.';
            break;
        case 'bulk_mail_userId_error':
            return_message = 'You have not access.';
            break;
        case 'bulk_mail_access_error':
            return_message = 'You have reached the Usage limit.';
            break;
        case 'bulk_mail_email_template_error':
            return_message = 'Currently, Not available any Email Template.';
            break;

        default:
            return_message = 'No message';
            break;
    }
    return return_message;
};
